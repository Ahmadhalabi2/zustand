import { useState, useRef, useEffect } from 'react'
import useTodoStore from '../store/useTodoStore'

const priorityConfig = {
  high:   { color: '#ff4d6d', glow: 'rgba(255,77,109,0.35)', icon: '🔥', label: 'عالية' },
  medium: { color: '#f9c74f', glow: 'rgba(249,199,79,0.35)',  icon: '⚡', label: 'متوسطة' },
  low:    { color: '#4cc9f0', glow: 'rgba(76,201,240,0.35)',  icon: '🧊', label: 'منخفضة' },
}

function formatDate(ts) {
  return new Intl.DateTimeFormat('ar-SA', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(new Date(ts))
}

function TodoItem({ todo, index }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [deleting, setDeleting] = useState(false)
  const editRef = useRef(null)

  const toggleTodo     = useTodoStore((s) => s.toggleTodo)
  const deleteTodo     = useTodoStore((s) => s.deleteTodo)
  const editTodo       = useTodoStore((s) => s.editTodo)
  const changePriority = useTodoStore((s) => s.changePriority)

  const p = priorityConfig[todo.priority]

  useEffect(() => {
    if (isEditing) editRef.current?.focus()
  }, [isEditing])

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) editTodo(todo.id, editText)
    setIsEditing(false)
  }

  const handleDelete = () => {
    setDeleting(true)
    setTimeout(() => deleteTodo(todo.id), 320)
  }

  const cyclePriority = () => {
    if (todo.completed) return
    const order = ['high', 'medium', 'low']
    const next = order[(order.indexOf(todo.priority) + 1) % 3]
    changePriority(todo.id, next)
  }

  return (
    <li
      className={`todo-item ${todo.completed ? 'done' : ''} ${deleting ? 'deleting' : ''}`}
      style={{ '--p-color': p.color, '--p-glow': p.glow, animationDelay: `${index * 40}ms` }}
    >
      {/* Priority bar */}
      <div className="priority-bar" onClick={cyclePriority} title="انقر لتغيير الأولوية" />

      {/* Checkbox */}
      <button
        className={`check-btn ${todo.completed ? 'checked' : ''}`}
        onClick={() => toggleTodo(todo.id)}
        aria-label="تحديد كمكتملة"
      >
        {todo.completed && (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>

      {/* Content */}
      <div className="item-content">
        {isEditing ? (
          <input
            ref={editRef}
            className="inline-edit"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleEdit()
              if (e.key === 'Escape') { setEditText(todo.text); setIsEditing(false) }
            }}
          />
        ) : (
          <span className="item-text" onDoubleClick={() => !todo.completed && setIsEditing(true)}>
            {todo.text}
          </span>
        )}
        <div className="item-meta">
          <span className="priority-tag" style={{ color: p.color }}>
            {p.icon} {p.label}
          </span>
          <span className="item-date">{formatDate(todo.createdAt)}</span>
          {todo.completed && todo.completedAt && (
            <span className="completed-date">✓ {formatDate(todo.completedAt)}</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="item-actions">
        {!todo.completed && (
          <button className="action-btn edit" onClick={() => setIsEditing(true)} title="تعديل">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        )}
        <button className="action-btn delete" onClick={handleDelete} title="حذف">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      </div>
    </li>
  )
}

export default TodoItem
