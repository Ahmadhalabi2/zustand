import { useState } from 'react'
import useTodoStore from '../store/useTodoStore'

const priorityConfig = {
  high:   { label: 'عالية',   color: '#ff4d6d', icon: '🔥' },
  medium: { label: 'متوسطة', color: '#f9c74f', icon: '⚡' },
  low:    { label: 'منخفضة', color: '#4cc9f0', icon: '🧊' },
}

function TodoInput() {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState('medium')
  const [focused, setFocused] = useState(false)
  const addTodo = useTodoStore((s) => s.addTodo)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      addTodo(text, priority)
      setText('')
      setPriority('medium')
    }
  }

  return (
    <form className="input-card" onSubmit={handleSubmit}>
      <div className={`input-wrapper ${focused ? 'focused' : ''}`}>
        <span className="input-icon">✦</span>
        <input
          className="main-input"
          type="text"
          placeholder="أضف مهمة جديدة..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>

      <div className="input-row">
        <div className="priority-selector">
          {Object.entries(priorityConfig).map(([key, cfg]) => (
            <button
              type="button"
              key={key}
              className={`priority-pill ${priority === key ? 'active' : ''}`}
              style={{ '--p-color': cfg.color }}
              onClick={() => setPriority(key)}
            >
              {cfg.icon} {cfg.label}
            </button>
          ))}
        </div>

        <button className="submit-btn" type="submit" disabled={!text.trim()}>
          <span>إضافة</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default TodoInput
