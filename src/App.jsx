import TodoInput  from './components/TodoInput'
import TodoList   from './components/TodoList'
import TodoFilter from './components/TodoFilter'
import StatsBar   from './components/StatsBar'
import useTodoStore from './store/useTodoStore'
import './App.css'

function App() {
  const total = useTodoStore((s) => s.todos.length)

  return (
    <div className="app">
      {/* Ambient background blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="shell">
        {/* Header */}
        <header className="app-header">
          <div className="logo-mark">✦</div>
          <div>
            <h1 className="app-title">Task Board</h1>
            <p className="app-sub">نظّم يومك، أنجز أهدافك</p>
          </div>
        </header>

        <StatsBar />
        <TodoInput />
        <TodoList />
        {total > 0 && <TodoFilter />}
      </div>
    </div>
  )
}

export default App
