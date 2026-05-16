'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { ArrowLeft, Layers3, TableProperties } from 'lucide-react';
import DashboardCharts from '@/features/map/components/analytics/DashboardCharts';
import DashboardFilters from '@/features/map/components/analytics/DashboardFilters';
import DashboardStats from '@/features/map/components/analytics/DashboardStats';
import ExportBar from '@/features/map/components/analytics/ExportBar';
import FloodAreaInfoCard from '@/features/map/components/cards/FloodAreaInfoCard';
import ManholeInfoCard from '@/features/map/components/cards/ManholeInfoCard';
import MapItemsTable from '@/features/map/components/tables/MapItemsTable';
import { MOCK_FLOOD_AREAS, MOCK_MANHOLES, MOCK_CENTER, MOCK_ZOOM } from '@/features/map/__mocks__/mockFloodAreas';
import type { FloodArea, Manhole, NivelAlagamento } from '@/features/map/models/MapTypes';
import type { Occurrence } from '@/features/map/models/Occurrence';
import { normalizeOccurrences } from '@/features/map/models/Occurrence';
import {
  buildLevelChartData,
  buildMonthlyChartData,
  buildNeighborhoodChartData,
  buildTypeChartData,
  filterOccurrences,
  getLatestUpdateLabel,
  paginateOccurrences,
  sortOccurrences,
  type DashboardFilters as FilterState,
  type SortConfig,
  type SortKey,
} from '@/features/map/utils/occurrenceUtils';
import { siteContentFrameClass } from '@/core/layouts/siteContentFrame';
import { focusRingBrandClass } from '@/core/styles/focusRing';
import { fetchPublic } from '@/core/utils/api';

const MapView = dynamic(() => import('@/core/components/organisms/MapView'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-brand-muted">Carregando mapa...</div>
  ),
});

const mapCenter = MOCK_CENTER;
const mapZoom = MOCK_ZOOM;

type FloodAreaApiRecord = {
  id: string | number;
  coordinates?: unknown;
  nivel?: string;
  descricao?: string;
  name?: string;
  endereco?: string;
  createdAt?: string;
};

type ManholeApiRecord = {
  id: string | number;
  latitude: number;
  longitude: number;
  descricao?: string;
  name?: string;
  endereco?: string;
  createdAt?: string;
};

function mapFloodAreaFromApi(area: FloodAreaApiRecord): FloodArea {
  const coords = Array.isArray(area.coordinates) ? area.coordinates : [];
  return {
    id: `area-${area.id}`,
    coordinates: coords as FloodArea['coordinates'],
    nivel: (area.nivel as FloodArea['nivel']) || 'medio',
    descricao: area.descricao || area.name,
    endereco: area.endereco,
    dataHora: area.createdAt ?? '',
  };
}

function mapManholeFromApi(manhole: ManholeApiRecord): Manhole {
  return {
    id: `mh-${manhole.id}`,
    latitude: manhole.latitude,
    longitude: manhole.longitude,
    descricao: manhole.descricao || manhole.name,
    endereco: manhole.endereco,
    dataHora: manhole.createdAt ?? '',
  };
}

function getInitialYear(occurrences: Occurrence[]) {
  if (occurrences.length === 0) return new Date().getUTCFullYear();
  return occurrences[0].year;
}

function toMapData(items: Occurrence[]) {
  return {
    floodAreas: items.flatMap((item) => (item.floodArea ? [item.floodArea] : [])),
    manholes: items.flatMap((item) => (item.manhole ? [item.manhole] : [])),
  };
}

export default function MapScreen() {
  const mapFocusSeq = useRef(0);
  const [allFloodAreas, setAllFloodAreas] = useState<FloodArea[]>([]);
  const [allManholes, setAllManholes] = useState<Manhole[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedOccurrenceId, setSelectedOccurrenceId] = useState<string | null>(null);
  const [mapFocus, setMapFocus] = useState<{ latitude: number; longitude: number; timestamp: number } | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<'all' | string>('all');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'dataHora', direction: 'desc' });
  const [filters, setFilters] = useState<FilterState>({
    year: new Date().getUTCFullYear(),
    month: 0,
    query: '',
    type: 'all',
    level: 'all',
  });

  useEffect(() => {
    const isMock = process.env.NEXT_PUBLIC_MOCK_ENABLED === 'true';
    if (isMock) {
      queueMicrotask(() => {
        setAllFloodAreas(MOCK_FLOOD_AREAS);
        setAllManholes(MOCK_MANHOLES);
        setIsLoading(false);
      });
      return;
    }

    async function loadData() {
      setLoadError(null);
      try {
        const [respAreas, respManholes] = await Promise.all([
          fetchPublic('/api/public/v1/flood-areas'),
          fetchPublic('/api/public/v1/manholes'),
        ]);

        if (!respAreas.ok || !respManholes.ok) {
          const areasError = await respAreas.text().catch(() => '');
          const manholesError = await respManholes.text().catch(() => '');
          throw new Error(
            `Nao foi possivel sincronizar dados do painel. areas=${respAreas.status} manholes=${respManholes.status} ${areasError} ${manholesError}`.trim(),
          );
        }

        const [areasJson, manholesJson] = await Promise.all([respAreas.json(), respManholes.json()]);
        const areasRaw = Array.isArray(areasJson) ? (areasJson as FloodAreaApiRecord[]) : [];
        const manholesRaw = Array.isArray(manholesJson) ? (manholesJson as ManholeApiRecord[]) : [];

        const areasMapped = areasRaw.map(mapFloodAreaFromApi);
        const manholesMapped = manholesRaw.map(mapManholeFromApi);

        setAllFloodAreas(areasMapped);
        setAllManholes(manholesMapped);
      } catch (error) {
        console.error('Erro ao carregar dados do mapa:', error);
        setLoadError('Falha ao carregar ocorrencias publicas. Revise rede ou backend.');
      } finally {
        setIsLoading(false);
      }
    }

    void loadData();
  }, []);

  const allOccurrences = useMemo(() => normalizeOccurrences(allFloodAreas, allManholes), [allFloodAreas, allManholes]);

  useEffect(() => {
    if (allOccurrences.length === 0) return;
    queueMicrotask(() => {
      setFilters((current) => {
        if (current.year !== new Date().getUTCFullYear()) return current;
        return { ...current, year: getInitialYear(allOccurrences) };
      });
    });
  }, [allOccurrences]);

  const availableYears = useMemo(() => {
    const years = Array.from(new Set(allOccurrences.map((item) => item.year))).sort((left, right) => right - left);
    return years.length > 0 ? years : [new Date().getUTCFullYear()];
  }, [allOccurrences]);

  const availableMonths = useMemo(
    () => Array.from(new Set(allOccurrences.filter((item) => item.year === filters.year).map((item) => item.month))).sort((l, r) => l - r),
    [allOccurrences, filters.year],
  );

  const availableNeighborhoods = useMemo(
    () =>
      Array.from(new Set(allOccurrences.map((item) => item.neighborhood)))
        .filter((item) => item && item !== 'Nao informado')
        .sort((left, right) => left.localeCompare(right, 'pt-BR')),
    [allOccurrences],
  );

  const filteredOccurrences = useMemo(() => {
    const baseItems = filterOccurrences(allOccurrences, { ...filters, query: searchQuery });
    if (selectedNeighborhood === 'all') return baseItems;
    return baseItems.filter((item) => item.neighborhood === selectedNeighborhood);
  }, [allOccurrences, filters, searchQuery, selectedNeighborhood]);

  const sortedOccurrences = useMemo(() => sortOccurrences(filteredOccurrences, sortConfig), [filteredOccurrences, sortConfig]);
  const totalPages = Math.max(1, Math.ceil(sortedOccurrences.length / pageSize));
  const paginatedOccurrences = useMemo(
    () => paginateOccurrences(sortedOccurrences, currentPage, pageSize),
    [sortedOccurrences, currentPage, pageSize],
  );

  const visibleMapData = useMemo(() => toMapData(filteredOccurrences), [filteredOccurrences]);
  const currentPageData = useMemo(() => toMapData(paginatedOccurrences), [paginatedOccurrences]);

  useEffect(() => {
    queueMicrotask(() => setCurrentPage(1));
  }, [filters, searchQuery, selectedNeighborhood, pageSize]);
  useEffect(() => {
    queueMicrotask(() => {
      if (currentPage > totalPages) setCurrentPage(totalPages);
    });
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!selectedOccurrenceId) return;
    const exists = filteredOccurrences.some((item) => item.id === selectedOccurrenceId);
    if (!exists) queueMicrotask(() => setSelectedOccurrenceId(null));
  }, [filteredOccurrences, selectedOccurrenceId]);

  const handleSort = (key: SortKey) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const focusOccurrence = (occurrence: Occurrence) => {
    setSelectedOccurrenceId(occurrence.id);
    mapFocusSeq.current += 1;
    setMapFocus({
      latitude: occurrence.latitude,
      longitude: occurrence.longitude,
      timestamp: mapFocusSeq.current,
    });
    if (window.innerWidth < 768) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedOccurrence = useMemo(
    () => filteredOccurrences.find((item) => item.id === selectedOccurrenceId) ?? null,
    [filteredOccurrences, selectedOccurrenceId],
  );

  const statsCards = useMemo(() => {
    const floodCount = filteredOccurrences.filter((item) => item.type === 'floodArea').length;
    const manholeCount = filteredOccurrences.filter((item) => item.type === 'manhole').length;
    const graveCount = filteredOccurrences.filter((item) => item.level === 'grave').length;

    return [
      { id: 'total', label: 'Total filtrado', value: String(filteredOccurrences.length), hint: 'Base ativa para mapa, cards e tabela.', tone: 'teal' as const, active: filters.type === 'all' && filters.level === 'all' },
      { id: 'floods', label: 'Alagamentos', value: String(floodCount), hint: 'Ocorrencias em area ou ponto de agua.', tone: 'slate' as const, active: filters.type === 'floodArea' },
      { id: 'manholes', label: 'Bueiros', value: String(manholeCount), hint: 'Bueiros danificados dentro do recorte.', tone: 'orange' as const, active: filters.type === 'manhole' },
      { id: 'grave', label: 'Nivel grave', value: String(graveCount), hint: 'Casos mais criticos no recorte atual.', tone: 'red' as const, active: filters.level === 'grave' },
    ];
  }, [filteredOccurrences, filters.level, filters.type]);

  const latestUpdateLabel = useMemo(() => getLatestUpdateLabel(allOccurrences), [allOccurrences]);
  const monthlyChartData = useMemo(() => buildMonthlyChartData(filteredOccurrences), [filteredOccurrences]);
  const typeChartData = useMemo(() => buildTypeChartData(filteredOccurrences), [filteredOccurrences]);
  const levelChartData = useMemo(() => buildLevelChartData(filteredOccurrences), [filteredOccurrences]);
  const neighborhoodChartData = useMemo(() => buildNeighborhoodChartData(filteredOccurrences), [filteredOccurrences]);

  const handleStatSelect = (cardId: string) => {
    if (cardId === 'total') return setFilters((current) => ({ ...current, type: 'all', level: 'all' }));
    if (cardId === 'floods') return setFilters((current) => ({ ...current, type: current.type === 'floodArea' ? 'all' : 'floodArea' }));
    if (cardId === 'manholes') return setFilters((current) => ({ ...current, type: current.type === 'manhole' ? 'all' : 'manhole' }));
    if (cardId === 'grave') setFilters((current) => ({ ...current, level: current.level === 'grave' ? 'all' : 'grave' }));
  };

  const clearFilters = () => {
    setFilters({ year: availableYears[0] ?? new Date().getUTCFullYear(), month: 0, query: '', type: 'all', level: 'all' });
    setSearchQuery('');
    setSelectedNeighborhood('all');
    setSelectedOccurrenceId(null);
  };

  if (isLoading) {
    return (
      <div
        role="status"
        aria-live="polite"
        aria-busy="true"
        className={`${siteContentFrameClass} flex min-h-[calc(100vh-7rem)] items-center justify-center px-1 py-12 text-sm text-brand-muted`}
      >
        Sincronizando dados do painel...
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 overflow-x-hidden pb-12">
      <section
        className="relative w-full border-b border-[var(--ui-header-divider)] py-10 text-slate-50 sm:py-12"
        aria-labelledby="titulo-dashboard-hero"
      >
        <div className="pointer-events-none absolute inset-0 [background-image:var(--gradient-band-dashboard-hero)]" aria-hidden />
        <div className={`relative ${siteContentFrameClass}`}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-12">
            <div className="max-w-3xl border-l-[3px] border-white/90 pl-5 sm:pl-6">
              <p className="m-0 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white/90">Frontend Web</p>
              <h1 id="titulo-dashboard-hero" className="mt-4 m-0 text-[clamp(1.7rem,3vw,2.75rem)] font-bold tracking-[-0.035em] text-white">
                Central de leitura de ocorrencias
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
                Explore alagamentos e bueiros por periodo, severidade, bairro e texto. Tudo sincronizado entre dashboard,
                mapa e tabela.
              </p>
            </div>

            <div className="flex flex-col gap-6 lg:items-end lg:text-right">
              <dl className="m-0 space-y-3 text-sm leading-relaxed text-white/90">
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2 lg:flex-col lg:items-end">
                  <dt className="shrink-0 font-semibold text-white">Leitura</dt>
                  <dd className="m-0">Dados públicos em leitura aberta</dd>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2 lg:flex-col lg:items-end">
                  <dt className="shrink-0 font-semibold text-white">Atualizacao</dt>
                  <dd className="m-0">{latestUpdateLabel}</dd>
                </div>
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2 lg:flex-col lg:items-end">
                  <dt className="shrink-0 font-semibold text-white">Recorte</dt>
                  <dd className="m-0">{filteredOccurrences.length} registros na base ativa</dd>
                </div>
              </dl>
              <Link
                href="/"
                className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/40 bg-[color-mix(in_srgb,var(--brand-navy-900)_38%,transparent)] px-4 py-2.5 text-sm font-semibold text-white shadow-sm backdrop-blur-[2px] transition hover:bg-[color-mix(in_srgb,var(--brand-navy-900)_55%,transparent)]"
              >
                <ArrowLeft size={16} />
                Voltar ao inicio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className={`${siteContentFrameClass} flex min-h-0 flex-col gap-8 pt-8 sm:gap-10 sm:pt-10`}>
      {loadError && (
        <div role="alert" className="border-l-4 border-red-600 bg-red-50/95 px-5 py-4 text-sm font-semibold text-red-900 ring-1 ring-red-200/50">
          {loadError}
        </div>
      )}

      <DashboardStats cards={statsCards} onSelect={handleStatSelect} />

      <DashboardFilters
        availableYears={availableYears}
        availableMonths={availableMonths}
        availableNeighborhoods={availableNeighborhoods}
        selectedYear={filters.year}
        selectedMonth={filters.month}
        selectedType={filters.type}
        selectedLevel={filters.level as 'all' | NivelAlagamento}
        selectedNeighborhood={selectedNeighborhood}
        searchQuery={searchQuery}
        onYearChange={(year) => setFilters((current) => ({ ...current, year, month: 0 }))}
        onMonthChange={(month) => setFilters((current) => ({ ...current, month }))}
        onTypeChange={(type) => setFilters((current) => ({ ...current, type }))}
        onLevelChange={(level) => setFilters((current) => ({ ...current, level }))}
        onNeighborhoodChange={(value) => setSelectedNeighborhood(value)}
        onSearchQueryChange={(value) => setSearchQuery(value)}
        onClear={clearFilters}
      />

      <DashboardCharts
        monthlyData={monthlyChartData}
        typeData={typeChartData}
        levelData={levelChartData}
        neighborhoodData={neighborhoodChartData}
        onTypeSelect={(type) => setFilters((current) => ({ ...current, type: current.type === type ? 'all' : type }))}
        onLevelSelect={(level) => setFilters((current) => ({ ...current, level: current.level === level ? 'all' : level }))}
        onNeighborhoodSelect={(value) => setSelectedNeighborhood((current) => (current === value ? 'all' : value))}
      />

      <section className="flex flex-col gap-4 border-b border-slate-200/60 pb-6 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between" aria-labelledby="titulo-mapa-operacional">
        <div className="min-w-0 flex-1">
          <h2 id="titulo-mapa-operacional" className="m-0 text-2xl font-bold tracking-[-0.03em] text-brand-heading">
            Mapa operacional
          </h2>
          <p className="mt-1 max-w-2xl text-brand-muted">
            Recorte ativo aplicado em tempo real. Clique em linha, card ou grafico e o foco vai para mapa.
          </p>
        </div>
        <ExportBar
          floodAreas={visibleMapData.floodAreas}
          manholes={visibleMapData.manholes}
          selectedYear={filters.year}
          selectedMonth={filters.month}
        />
      </section>

      <div className="relative h-[min(64vh,32rem)] min-h-[20rem] w-full overflow-hidden rounded-2xl border border-slate-200/60 shadow-[var(--ui-panel-shadow)] ring-1 ring-slate-200/30 sm:min-h-[24rem] md:min-h-[28rem] md:h-[64vh]">
        <MapView
          center={mapCenter}
          zoom={mapZoom}
          floodAreas={visibleMapData.floodAreas}
          manholes={visibleMapData.manholes}
          focusLocation={mapFocus}
          selectedOccurrenceId={selectedOccurrenceId}
          emptyState={filteredOccurrences.length === 0}
        />
      </div>

      <div className="flex flex-col gap-3 border-y border-slate-200/60 py-5 text-brand-heading sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <p className="m-0 text-sm sm:text-base">
          <span className="font-semibold text-brand-heading">Selecao atual:</span>{' '}
          <span className="text-brand-muted">
            {selectedOccurrence ? `${selectedOccurrence.title} · ${selectedOccurrence.address}` : 'nenhuma'}
          </span>
        </p>
        <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-1 p-0 text-sm text-brand-muted" aria-label="Legenda de cores no mapa">
          <li className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm bg-teal-700" aria-hidden /> Alagamentos
          </li>
          <li className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm bg-sky-400" aria-hidden /> Bueiros
          </li>
          <li className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 shrink-0 rounded-sm bg-brand-eyebrow" aria-hidden /> Grave
          </li>
        </ul>
      </div>

      <div
        className="inline-flex w-fit gap-1 rounded-xl border border-slate-200/70 bg-slate-50/90 p-1 ring-1 ring-slate-200/25 max-sm:w-full max-sm:flex-col"
        role="group"
        aria-label="Modo de visualizacao"
      >
        <button
          type="button"
          aria-pressed={viewMode === 'cards'}
          className={[
            'inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition',
            viewMode === 'cards' ? 'bg-white text-brand-eyebrow shadow-sm ring-1 ring-slate-200/40' : 'text-brand-muted hover:text-brand-heading',
          ].join(' ')}
          onClick={() => setViewMode('cards')}
          title="Visualizacao em cards"
        >
          <Layers3 size={16} />
          Cards
        </button>
        <button
          type="button"
          aria-pressed={viewMode === 'table'}
          className={[
            'inline-flex min-h-10 flex-1 items-center justify-center gap-2 rounded-lg px-4 text-sm font-semibold transition',
            viewMode === 'table' ? 'bg-white text-brand-eyebrow shadow-sm ring-1 ring-slate-200/40' : 'text-brand-muted hover:text-brand-heading',
          ].join(' ')}
          onClick={() => setViewMode('table')}
          title="Visualizacao em tabela"
        >
          <TableProperties size={16} />
          Tabela
        </button>
      </div>

      <section className="flex flex-col gap-4 pb-8" aria-labelledby="titulo-ocorrencias-vista">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <h2 id="titulo-ocorrencias-vista" className="m-0 text-2xl font-bold tracking-[-0.03em] text-brand-heading">
              {viewMode === 'table' ? 'Tabela detalhada' : 'Lista navegavel'}
            </h2>
            <p className="mt-1 text-brand-muted">{filteredOccurrences.length} resultados no recorte atual.</p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-brand-muted">
            <label htmlFor="pageSizeSelect" className="font-medium text-brand-heading">Itens por pagina</label>
            <select
              id="pageSizeSelect"
              value={pageSize}
              onChange={(event) => setPageSize(Number(event.target.value))}
              className={`rounded-xl border border-slate-200/80 bg-white px-3 py-2 text-brand-heading ${focusRingBrandClass}`}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {filteredOccurrences.length === 0 ? (
          <div
            role="status"
            className="rounded-2xl border border-slate-200/60 bg-slate-50/90 px-5 py-4 text-sm text-brand-muted ring-1 ring-slate-200/25"
          >
            Nenhuma ocorrencia encontrada com filtros atuais. Tente limpar filtros ou trocar periodo.
          </div>
        ) : viewMode === 'table' ? (
          <MapItemsTable
            floodAreas={currentPageData.floodAreas}
            manholes={currentPageData.manholes}
            onFocus={(latitude, longitude, id) => {
              const occurrence = filteredOccurrences.find((item) => item.id === id);
              if (occurrence) {
                focusOccurrence(occurrence);
                return;
              }
              mapFocusSeq.current += 1;
              setMapFocus({ latitude, longitude, timestamp: mapFocusSeq.current });
            }}
            sortConfig={sortConfig}
            onSort={handleSort}
            selectedId={selectedOccurrenceId}
            resultCount={filteredOccurrences.length}
          />
        ) : (
          <div className="grid gap-4 xl:grid-cols-2">
            {paginatedOccurrences.map((occurrence) =>
              occurrence.type === 'floodArea' && occurrence.floodArea ? (
                <FloodAreaInfoCard
                  key={occurrence.id}
                  floodArea={occurrence.floodArea}
                  selected={selectedOccurrenceId === occurrence.id}
                  onFocus={() => focusOccurrence(occurrence)}
                />
              ) : occurrence.manhole ? (
                <ManholeInfoCard
                  key={occurrence.id}
                  manhole={occurrence.manhole}
                  selected={selectedOccurrenceId === occurrence.id}
                  onFocus={() => focusOccurrence(occurrence)}
                />
              ) : null,
            )}
          </div>
        )}
      </section>

      {filteredOccurrences.length > 0 && (
        <div className="flex items-center justify-center gap-8 pb-12 max-sm:gap-4">
          <button
            type="button"
            disabled={currentPage === 1}
            aria-label="Ir para a página anterior de ocorrências"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="rounded-xl border border-slate-200/80 bg-white px-5 py-2 text-sm font-medium text-brand-heading shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Anterior
          </button>

          <div className="text-sm text-brand-muted">
            Pagina <strong>{currentPage}</strong> de {totalPages}
          </div>

          <button
            type="button"
            disabled={currentPage === totalPages}
            aria-label="Ir para a próxima página de ocorrências"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="rounded-xl border border-slate-200/80 bg-white px-5 py-2 text-sm font-medium text-brand-heading shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Proxima
          </button>
        </div>
      )}
      </div>
    </div>
  );
}
