import type { FloodArea, Manhole } from '@/features/map/models/MapTypes';
import type { SortConfig, SortKey } from '@/features/map/utils/occurrenceUtils';
import { NIVEL_LABELS, NIVEL_COLORS } from '@/features/map/models/MapTypes';
import './MapItemsTable.css';

interface MapItemsTableProps {
  floodAreas: FloodArea[];
  manholes: Manhole[];
  onFocus: (lat: number, lng: number, id: string) => void;
  sortConfig?: SortConfig;
  onSort?: (key: SortKey) => void;
  selectedId?: string | null;
  resultCount?: number;
}

type MapItem =
  | { type: 'floodArea'; data: FloodArea }
  | { type: 'manhole'; data: Manhole };

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function MapItemsTable({
  floodAreas,
  manholes,
  onFocus,
  sortConfig,
  onSort,
  selectedId,
  resultCount,
}: MapItemsTableProps) {
  const items: MapItem[] = [
    ...floodAreas.map((floodArea) => ({ type: 'floodArea' as const, data: floodArea })),
    ...manholes.map((manhole) => ({ type: 'manhole' as const, data: manhole })),
  ];

  if (!sortConfig) {
    items.sort((left, right) => new Date(right.data.dataHora).getTime() - new Date(left.data.dataHora).getTime());
  }

  function renderSortIcon(key: SortKey) {
    if (!sortConfig || sortConfig.key !== key) return <span className="sort-icon">↕</span>;
    return <span className="sort-icon active">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>;
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="map-items-table-container">
      <div className="map-items-table-heading">
        <h2 className="map-items-table-title">Tabela de Ocorrencias</h2>
        <span className="map-items-table-summary">{resultCount ?? items.length} resultados filtrados</span>
      </div>

      <div className="map-items-table-wrapper">
        <table className="map-items-table">
          <thead>
            <tr>
              <th onClick={() => onSort?.('type')} className="sortable-header">
                Tipo {renderSortIcon('type')}
              </th>
              <th onClick={() => onSort?.('nivel')} className="sortable-header">
                Nivel {renderSortIcon('nivel')}
              </th>
              <th onClick={() => onSort?.('id')} className="sortable-header">
                ID {renderSortIcon('id')}
              </th>
              <th onClick={() => onSort?.('dataHora')} className="sortable-header">
                Data de criacao {renderSortIcon('dataHora')}
              </th>
              <th onClick={() => onSort?.('endereco')} className="sortable-header">
                Endereco {renderSortIcon('endereco')}
              </th>
              <th onClick={() => onSort?.('descricao')} className="sortable-header">
                Descricao {renderSortIcon('descricao')}
              </th>
              <th>Detalhes / Coordenadas</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              if (item.type === 'floodArea') {
                const floodArea = item.data;
                const colors = NIVEL_COLORS[floodArea.nivel];

                return (
                  <tr
                    key={`fa-${floodArea.id}`}
                    className={`map-items-row--clickable ${selectedId === floodArea.id ? 'map-items-row--selected' : ''}`}
                    onClick={() => onFocus(floodArea.coordinates[0].latitude, floodArea.coordinates[0].longitude, floodArea.id)}
                  >
                    <td>
                      <div className="map-items-type-column">
                        <span className="map-items-table-type">Area de Alagamento</span>
                        <span className="map-items-table-badge" style={{ backgroundColor: colors.badge }}>
                          {NIVEL_LABELS[floodArea.nivel]}
                        </span>
                      </div>
                    </td>
                    <td>{NIVEL_LABELS[floodArea.nivel]}</td>
                    <td>{floodArea.id}</td>
                    <td>{formatDate(floodArea.dataHora)}</td>
                    <td>{floodArea.endereco || '—'}</td>
                    <td>{floodArea.descricao || '—'}</td>
                    <td>
                      <div className="map-items-table-coords-container">
                        {floodArea.coordinates.map((coordinate, index) => (
                          <div key={index} className="map-items-table-coord-item">
                            P{index + 1}: {coordinate.latitude.toFixed(4)}, {coordinate.longitude.toFixed(4)}
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              }

              const manhole = item.data;

              return (
                <tr
                  key={`mh-${manhole.id}`}
                  className={`map-items-row--clickable ${selectedId === manhole.id ? 'map-items-row--selected' : ''}`}
                  onClick={() => onFocus(manhole.latitude, manhole.longitude, manhole.id)}
                >
                  <td>
                    <div className="map-items-type-column">
                      <span className="map-items-table-type">Bueiro Danificado</span>
                      <div className="map-items-table-icon">
                        <div className="map-items-table-icon-core" />
                      </div>
                    </div>
                  </td>
                  <td>—</td>
                  <td>{manhole.id}</td>
                  <td>{formatDate(manhole.dataHora)}</td>
                  <td>{manhole.endereco || '—'}</td>
                  <td>{manhole.descricao || '—'}</td>
                  <td>
                    <div className="map-items-table-coords-container">
                      <div className="map-items-table-coord-item">
                        Lat: {manhole.latitude.toFixed(6)}
                      </div>
                      <div className="map-items-table-coord-item">
                        Lng: {manhole.longitude.toFixed(6)}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
