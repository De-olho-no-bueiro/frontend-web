'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import FloodAreaInfoCard from './FloodAreaInfoCard';
import ManholeInfoCard from './ManholeInfoCard';
import MapItemsTable from './MapItemsTable';
import ExportBar from './ExportBar';
import DashboardFilters from './DashboardFilters';
import DashboardStats from './DashboardStats';
import DashboardCharts from './DashboardCharts';
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
} from '@/features/map/utils/occurrenceUtils';
import { useAuth } from '@/core/contexts/auth-context';
import { fetchPublic } from '@/core/utils/api';
import './MapScreen.css';

const MapView = dynamic(() => import('@/core/components/organisms/MapView'), {
  ssr: false,
  loading: () => <div className="map-loading">Carregando mapa...</div>,
});

const mapCenter = MOCK_CENTER;
const mapZoom = MOCK_ZOOM;

function getInitialYear(occurrences: Occurrence[]) {
  if (occurrences.length === 0) {
    return new Date().getUTCFullYear();
  }

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
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'dataHora',
    direction: 'desc',
  });
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

        const [areasRaw, manholesRaw] = await Promise.all([
          respAreas.json(),
          respManholes.json(),
        ]);

        const areasMapped: FloodArea[] = areasRaw.map((area: any) => ({
          id: `area-${area.id}`,
          coordinates: area.latitude.map((lat: number, index: number) => ({
            latitude: lat,
            longitude: area.longitude[index],
          })),
          nivel: area.nivel || 'medio',
          descricao: area.posts?.[0]?.content || area.name,
          endereco: area.posts?.[0]?.endereco,
          dataHora: area.createdAt,
        }));

        const manholesMapped: Manhole[] = manholesRaw.map((manhole: any) => ({
          id: `mh-${manhole.id}`,
          latitude: manhole.latitude,
          longitude: manhole.longitude,
          descricao: manhole.posts?.[0]?.content || manhole.name,
          endereco: manhole.posts?.[0]?.endereco,
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

  const allOccurrences = useMemo(
    () => normalizeOccurrences(allFloodAreas, allManholes),
    [allFloodAreas, allManholes],
  );

  useEffect(() => {
    if (allOccurrences.length === 0) return;

    setFilters((current) => {
      if (current.year !== new Date().getUTCFullYear()) {
        return current;
      }

      return {
        ...current,
        year: getInitialYear(allOccurrences),
      };
    });
  }, [allOccurrences]);

  const availableYears = useMemo(() => {
    const years = Array.from(new Set(allOccurrences.map((item) => item.year))).sort((left, right) => right - left);
    return years.length > 0 ? years : [new Date().getUTCFullYear()];
  }, [allOccurrences]);

  const availableMonths = useMemo(() => {
    return Array.from(
      new Set(allOccurrences.filter((item) => item.year === filters.year).map((item) => item.month)),
    ).sort((left, right) => left - right);
  }, [allOccurrences, filters.year]);

  const availableNeighborhoods = useMemo(() => {
    return Array.from(new Set(allOccurrences.map((item) => item.neighborhood)))
      .filter((item) => item && item !== 'Nao informado')
      .sort((left, right) => left.localeCompare(right, 'pt-BR'));
  }, [allOccurrences]);

  const filteredOccurrences = useMemo(() => {
    const baseItems = filterOccurrences(allOccurrences, {
      ...filters,
      query: searchQuery,
    });

    if (selectedNeighborhood === 'all') {
      return baseItems;
    }

    return baseItems.filter((item) => item.neighborhood === selectedNeighborhood);
  }, [allOccurrences, filters, searchQuery, selectedNeighborhood]);

  const sortedOccurrences = useMemo(
    () => sortOccurrences(filteredOccurrences, sortConfig),
    [filteredOccurrences, sortConfig],
  );

  const totalPages = Math.max(1, Math.ceil(sortedOccurrences.length / pageSize));
  const paginatedOccurrences = useMemo(
    () => paginateOccurrences(sortedOccurrences, currentPage, pageSize),
    [sortedOccurrences, currentPage, pageSize],
  );

  const visibleMapData = useMemo(() => toMapData(filteredOccurrences), [filteredOccurrences]);
  const currentPageData = useMemo(() => toMapData(paginatedOccurrences), [paginatedOccurrences]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchQuery, selectedNeighborhood, pageSize]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (!selectedOccurrenceId) return;

    const exists = filteredOccurrences.some((item) => item.id === selectedOccurrenceId);
    if (!exists) {
      setSelectedOccurrenceId(null);
    }
  }, [filteredOccurrences, selectedOccurrenceId]);

  const handleSort = (key: string) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const focusOccurrence = (occurrence: Occurrence) => {
    setSelectedOccurrenceId(occurrence.id);
    setMapFocus({
      latitude: occurrence.latitude,
      longitude: occurrence.longitude,
      timestamp: Date.now(),
    });

    if (window.innerWidth < 768) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
      {
        id: 'total',
        label: 'Total filtrado',
        value: String(filteredOccurrences.length),
        hint: 'Base ativa para mapa, cards e tabela.',
        tone: 'teal' as const,
        active: filters.type === 'all' && filters.level === 'all',
      },
      {
        id: 'floods',
        label: 'Alagamentos',
        value: String(floodCount),
        hint: 'Ocorrencias em area ou ponto de agua.',
        tone: 'slate' as const,
        active: filters.type === 'floodArea',
      },
      {
        id: 'manholes',
        label: 'Bueiros',
        value: String(manholeCount),
        hint: 'Bueiros danificados dentro do recorte.',
        tone: 'orange' as const,
        active: filters.type === 'manhole',
      },
      {
        id: 'grave',
        label: 'Nivel grave',
        value: String(graveCount),
        hint: 'Casos mais criticos no recorte atual.',
        tone: 'red' as const,
        active: filters.level === 'grave',
      },
    ];
  }, [filteredOccurrences, filters.level, filters.type]);

  const latestUpdateLabel = useMemo(
    () => getLatestUpdateLabel(allOccurrences),
    [allOccurrences],
  );

  const monthlyChartData = useMemo(
    () => buildMonthlyChartData(filteredOccurrences),
    [filteredOccurrences],
  );
  const typeChartData = useMemo(
    () => buildTypeChartData(filteredOccurrences),
    [filteredOccurrences],
  );
  const levelChartData = useMemo(
    () => buildLevelChartData(filteredOccurrences),
    [filteredOccurrences],
  );
  const neighborhoodChartData = useMemo(
    () => buildNeighborhoodChartData(filteredOccurrences),
    [filteredOccurrences],
  );

  const handleStatSelect = (cardId: string) => {
    if (cardId === 'total') {
      setFilters((current) => ({ ...current, type: 'all', level: 'all' }));
      return;
    }

    if (cardId === 'floods') {
      setFilters((current) => ({ ...current, type: current.type === 'floodArea' ? 'all' : 'floodArea' }));
      return;
    }

    if (cardId === 'manholes') {
      setFilters((current) => ({ ...current, type: current.type === 'manhole' ? 'all' : 'manhole' }));
      return;
    }

    if (cardId === 'grave') {
      setFilters((current) => ({ ...current, level: current.level === 'grave' ? 'all' : 'grave' }));
    }
  };

  const clearFilters = () => {
    setFilters({
      year: availableYears[0] ?? new Date().getUTCFullYear(),
      month: 0,
      query: '',
      type: 'all',
      level: 'all',
    });
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
    return <div className="map-loading map-loading--page">Sincronizando dados do painel...</div>;
  }

  return (
    <div className="map-screen-page">
      <section className="map-screen-hero">
        <div>
          <p className="map-screen-hero__eyebrow">Frontend Web</p>
          <h1 className="map-screen-hero__title">Central de leitura de ocorrencias</h1>
          <p className="map-screen-hero__description">
            Explore alagamentos e bueiros por periodo, severidade, bairro e texto. Tudo sincronizado entre dashboard, mapa e tabela.
          </p>
        </div>

        <div className="map-screen-hero__meta">
          <span className="map-screen-hero__chip">
            {user ? `Cidadao conectado: ${user.name}` : 'Acesso publico liberado'}
          </span>
          <span className="map-screen-hero__chip">Atualizacao mais recente: {latestUpdateLabel}</span>
          <span className="map-screen-hero__chip">Base ativa: {filteredOccurrences.length} registros</span>
          <button type="button" className="map-screen-hero__logout" onClick={handleSessionAction}>
            {user ? 'Sair da sessao' : 'Entrar como cidadao'}
          </button>
        </div>
      </section>

      {loadError && (
        <div className="map-screen-feedback map-screen-feedback--error">
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

      <div className="map-screen-top-controls">
        <div className="map-screen-top-controls__copy">
          <h2>Mapa operacional</h2>
          <p>
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

      <div className="map-screen-container">
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

      <div className="map-screen-selection-bar">
        <div>
          <strong>Selecao atual:</strong>{' '}
          {selectedOccurrence
            ? `${selectedOccurrence.title} · ${selectedOccurrence.address}`
            : 'nenhuma'}
        </div>
        <div className="map-screen-selection-bar__legend">
          <span><i className="legend-dot legend-dot--teal" /> Alagamentos</span>
          <span><i className="legend-dot legend-dot--orange" /> Bueiros</span>
          <span><i className="legend-dot legend-dot--red" /> Grave</span>
        </div>
      </div>

      <div className="map-screen-view-toggle">
        <button
          className={`view-toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
          onClick={() => setViewMode('cards')}
          title="Visualizacao em cards"
        >
          Cards
        </button>
        <button
          className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
          onClick={() => setViewMode('table')}
          title="Visualizacao em tabela"
        >
          Tabela
        </button>
      </div>

      <div className="map-screen-info">
        <div className="map-screen-info__header">
          <div>
            <h2>{viewMode === 'table' ? 'Tabela detalhada' : 'Lista navegavel'}</h2>
            <p>{filteredOccurrences.length} resultados no recorte atual.</p>
          </div>

          <div className="page-size-selector">
            <label htmlFor="pageSizeSelect">Itens por pagina</label>
            <select
              id="pageSizeSelect"
              value={pageSize}
              onChange={(event) => setPageSize(Number(event.target.value))}
              className="page-size-select"
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
          <div className="map-screen-feedback map-screen-feedback--empty">
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
          <div className="map-screen-cards-grid">
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
        <div className="pagination-footer">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="pagination-btn"
          >
            Anterior
          </button>

          <div className="pagination-info">
            Pagina <strong>{currentPage}</strong> de {totalPages}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="pagination-btn"
          >
            Proxima
          </button>
        </div>
      )}
    </div>
  );
}
