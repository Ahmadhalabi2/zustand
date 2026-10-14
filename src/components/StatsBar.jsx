import useTodoStore from '../store/useTodoStore'

function StatsBar() {
  const getStats = useTodoStore((s) => s.getStats)
  const { total, completed, active, high } = getStats()

  if (total === 0) return null

  const pct = total > 0 ? Math.round((completed / total) * 100) : 0

  const stats = [
    { label: 'الكل',      value: total,     color: '#a78bfa' },
    { label: 'نشطة',     value: active,    color: '#4cc9f0' },
    { label: 'مكتملة',   value: completed, color: '#06d6a0' },
    { label: 'عالية',    value: high,      color: '#ff4d6d' },
  ]

  return (
    <div className="stats-section">
      <div className="stat-cards">
        {stats.map((s) => (
          <div key={s.label} className="stat-card" style={{ '--s-color': s.color }}>
            <span className="stat-val">{s.value}</span>
            <span className="stat-lbl">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="progress-wrap">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${pct}%` }} />
          <div className="progress-shine" style={{ width: `${pct}%` }} />
        </div>
        <span className="progress-pct">{pct}%</span>
      </div>
    </div>
  )
}

export default StatsBar
