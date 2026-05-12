'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Layers3, LogIn, LogOut, MapPinned, TableProperties } from 'lucide-react';
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
import { useAuth } from '@/core/contexts/auth-context';
import { fetchPublic } from '@/core/utils/api';

const MapView = dynamic(() => import('@/core/components/organisms/MapView'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">Carregando mapa...</div>
  ),
});

const mapCenter = MOCK_CENTER;
const mapZoom = MOCK_ZOOM;

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
  const router = useRouter();
  const { user, signOut } = useAuth();
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
      setAllFloodAreas(MOCK_FLOOD_AREAS);
      setAllManholes(MOCK_MANHOLES);
      setIsLoading(false);
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

        const [areasRaw, manholesRaw] = await Promise.all([respAreas.json(), respManholes.json()]);

        const areasMapped: FloodArea[] = areasRaw.map((area: any) => ({
          id: `area-${area.id}`,
          coordinates: Array.isArray(area.coordinates) ? area.coordinates : [],
          nivel: area.nivel || 'medio',
          descricao: area.descricao || area.name,
          endereco: area.endereco,
          dataHora: area.createdAt,
        }));

        const manholesMapped: Manhole[] = manholesRaw.map((manhole: any) => ({
          id: `mh-${manhole.id}`,
          latitude: manhole.latitude,
          longitude: manhole.longitude,
          descricao: manhole.descricao || manhole.name,
          endereco: manhole.endereco,
          dataHora: manhole.createdAt,
        }));

        setAllFloodAreas(areasMapped);
        setAllManholes(manholesMapped);
      } catch (error) {
        console.error('Erro ao carregar dados do mapa:', error);
        setLoadError('Falha ao carregar ocorrencias publicas. Revise rede ou backend.');
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const allOccurrences = useMemo(() => normalizeOccurrences(allFloodAreas, allManholes), [allFloodAreas, allManholes]);

  useEffect(() => {
    if (allOccurrences.length === 0) return;
    setFilters((current) => {
      if (current.year !== new Date().getUTCFullYear()) return current;
      return { ...current, year: getInitialYear(allOccurrences) };
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

  useEffect(() => setCurrentPage(1), [filters, searchQuery, selectedNeighborhood, pageSize]);
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!selectedOccurrenceId) return;
    const exists = filteredOccurrences.some((item) => item.id === selectedOccurrenceId);
    if (!exists) setSelectedOccurrenceId(null);
  }, [filteredOccurrences, selectedOccurrenceId]);

  const handleSort = (key: SortKey) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const focusOccurrence = (occurrence: Occurrence) => {
    setSelectedOccurrenceId(occurrence.id);
    setMapFocus({ latitude: occurrence.latitude, longitude: occurrence.longitude, timestamp: Date.now() });
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

  const handleSessionAction = () => {
    if (user) {
      void signOut();
      router.push('/');
      return;
    }
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-7rem)] items-center justify-center text-sm text-slate-500">
        Sincronizando dados do painel...
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-7rem)] w-[min(1240px,calc(100%-2rem))] flex-col gap-4 py-8 max-sm:w-[min(1240px,calc(100%-1rem))] max-sm:pt-5">
      <section className="flex flex-wrap items-end justify-between gap-6 rounded-[1.8rem] bg-[linear-gradient(135deg,#1c4f84_0%,#3898d5_54%,#83d7ff_100%)] p-7 text-slate-50 shadow-[0_24px_54px_rgba(45,95,158,0.22)]">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-white/90">Frontend Web</p>
          <h1 className="m-0 text-[clamp(1.8rem,3.2vw,3rem)] tracking-[-0.04em]">Central de leitura de ocorrencias</h1>
          <p className="mt-3 max-w-3xl leading-7 text-white/90">
            Explore alagamentos e bueiros por periodo, severidade, bairro e texto. Tudo sincronizado entre dashboard, mapa e tabela.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/12 px-4 py-3 text-sm">{user ? `Cidadao conectado: ${user.name}` : 'Acesso publico liberado'}</span>
          <span className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/12 px-4 py-3 text-sm">Atualizacao mais recente: {latestUpdateLabel}</span>
          <span className="inline-flex w-fit items-center rounded-full border border-white/15 bg-white/12 px-4 py-3 text-sm">Base ativa: {filteredOccurrences.length} registros</span>
          <button
            type="button"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-[#17365f]/35 px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-px"
            onClick={handleSessionAction}
          >
            {user ? <LogOut size={16} /> : <LogIn size={16} />}
            {user ? 'Sair da sessao' : 'Entrar como cidadao'}
          </button>
        </div>
      </section>

      {loadError && <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-semibold text-red-800">{loadError}</div>}

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

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.5rem] border border-slate-200/70 bg-white/95 p-5 shadow-[0_20px_40px_rgba(45,95,158,0.1)]">
        <div>
          <h2 className="m-0 text-2xl tracking-[-0.03em] text-slate-900">Mapa operacional</h2>
          <p className="mt-1 text-slate-500">
            Recorte ativo aplicado em tempo real. Clique em linha, card ou grafico e o foco vai para mapa.
          </p>
        </div>
        <ExportBar
          floodAreas={visibleMapData.floodAreas}
          manholes={visibleMapData.manholes}
          selectedYear={filters.year}
          selectedMonth={filters.month}
        />
      </div>

      <div className="relative h-[64vh] min-h-[28rem] overflow-hidden rounded-[1.6rem] border border-slate-200/70 shadow-[0_24px_54px_rgba(45,95,158,0.14)] max-sm:min-h-[22rem] max-sm:h-[54vh]">
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

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.2rem] border border-slate-200/70 bg-white/85 px-5 py-4 text-slate-900">
        <div>
          <strong>Selecao atual:</strong>{' '}
          {selectedOccurrence ? `${selectedOccurrence.title} · ${selectedOccurrence.address}` : 'nenhuma'}
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-teal-700" /> Alagamentos</span>
          <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-sky-400" /> Bueiros</span>
          <span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#29548d]" /> Grave</span>
        </div>
      </div>

      <div className="flex gap-2 max-sm:flex-col">
        <button
          className={[
            'inline-flex min-h-[42px] items-center justify-center rounded-full border px-4 font-bold transition',
            viewMode === 'cards'
              ? 'border-[#29548d] bg-[#29548d] text-slate-50'
              : 'border-slate-300 bg-white/95 text-slate-700',
          ].join(' ')}
          onClick={() => setViewMode('cards')}
          title="Visualizacao em cards"
        >
          <Layers3 size={16} className="mr-2" />
          Cards
        </button>
        <button
          className={[
            'inline-flex min-h-[42px] items-center justify-center rounded-full border px-4 font-bold transition',
            viewMode === 'table'
              ? 'border-[#29548d] bg-[#29548d] text-slate-50'
              : 'border-slate-300 bg-white/95 text-slate-700',
          ].join(' ')}
          onClick={() => setViewMode('table')}
          title="Visualizacao em tabela"
        >
          <TableProperties size={16} className="mr-2" />
          Tabela
        </button>
      </div>

      <div className="flex flex-col gap-4 pb-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="m-0 text-2xl tracking-[-0.03em] text-slate-900">{viewMode === 'table' ? 'Tabela detalhada' : 'Lista navegavel'}</h2>
            <p className="mt-1 text-slate-500">{filteredOccurrences.length} resultados no recorte atual.</p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-slate-600">
            <label htmlFor="pageSizeSelect" className="font-medium">Itens por pagina</label>
            <select
              id="pageSizeSelect"
              value={pageSize}
              onChange={(event) => setPageSize(Number(event.target.value))}
              className="rounded-xl border border-slate-300/70 bg-white px-3 py-2 outline-none transition focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(88,184,244,0.18)]"
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
          <div className="rounded-2xl border border-slate-200/70 bg-white/95 px-5 py-4 text-slate-600">
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
              setMapFocus({ latitude, longitude, timestamp: Date.now() });
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
      </div>

      {filteredOccurrences.length > 0 && (
        <div className="flex items-center justify-center gap-8 pb-12 max-sm:gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Anterior
          </button>

          <div className="text-sm text-slate-600">
            Pagina <strong>{currentPage}</strong> de {totalPages}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Proxima
          </button>
        </div>
      )}
    </div>
  );
}
