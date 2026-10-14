import useTodoStore from '../store/useTodoStore'

const filters = [
  { value: 'all',       label: 'الكل' },
  { value: 'active',    label: 'نشطة' },
  { value: 'completed', label: 'مكتملة' },
]

const sorts = [
  { value: 'newest',   label: '↓ الأحدث' },
  { value: 'oldest',   label: '↑ الأقدم' },
  { value: 'priority', label: '🔥 الأولوية' },
]

function TodoFilter() {
  const filter         = useTodoStore((s) => s.filter)
  const sort           = useTodoStore((s) => s.sort)
  const setFilter      = useTodoStore((s) => s.setFilter)
  const setSort        = useTodoStore((s) => s.setSort)
  const clearCompleted = useTodoStore((s) => s.clearCompleted)
  const getStats       = useTodoStore((s) => s.getStats)
  const stats          = getStats()

  return (
    <div className="footer-card">
      <div className="filter-row">
        <div className="filter-group">
          {filters.map((f) => (
            <button
              key={f.value}
              className={`tab-btn ${filter === f.value ? 'active' : ''}`}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
              {f.value === 'active' && stats.active > 0 && (
                <span className="badge">{stats.active}</span>
              )}
              {f.value === 'completed' && stats.completed > 0 && (
                <span className="badge done">{stats.completed}</span>
              )}
            </button>
          ))}
        </div>

        <select
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          {sorts.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
      </div>

      {stats.completed > 0 && (
        <button className="clear-all-btn" onClick={clearCompleted}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          </svg>
          حذف المكتملة ({stats.completed})
        </button>
      )}
    </div>
  )
}

export default TodoFilter
