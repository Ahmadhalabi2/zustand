import useTodoStore from '../store/useTodoStore'
import TodoItem from './TodoItem'

function TodoList() {
  const getFiltered = useTodoStore((s) => s.getFiltered)
  const todos       = useTodoStore((s) => s.todos)
  const filtered    = getFiltered()

  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">◈</div>
        <p className="empty-title">لا توجد مهام بعد</p>
        <p className="empty-sub">أضف مهمتك الأولى من الحقل أعلاه</p>
      </div>
    )
  }

  if (filtered.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">◇</div>
        <p className="empty-title">لا توجد نتائج</p>
        <p className="empty-sub">جرّب تصنيفاً مختلفاً</p>
      </div>
    )
  }

  return (
    <ul className="todo-list">
      {filtered.map((todo, i) => (
        <TodoItem key={todo.id} todo={todo} index={i} />
      ))}
    </ul>
  )
}

export default TodoList
