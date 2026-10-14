import { create } from 'zustand'

const useTodoStore = create((set, get) => ({
  todos: [],
  filter: 'all',      // 'all' | 'active' | 'completed'
  sort: 'newest',     // 'newest' | 'oldest' | 'priority'

  addTodo: (text, priority = 'medium') =>
    set((state) => ({
      todos: [
        {
          id: crypto.randomUUID(),
          text: text.trim(),
          completed: false,
          priority,           // 'high' | 'medium' | 'low'
          createdAt: Date.now(),
          completedAt: null,
        },
        ...state.todos,
      ],
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed, completedAt: !t.completed ? Date.now() : null }
          : t
      ),
    })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),

  editTodo: (id, newText) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, text: newText.trim() } : t
      ),
    })),

  changePriority: (id, priority) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id ? { ...t, priority } : t
      ),
    })),

  clearCompleted: () =>
    set((state) => ({
      todos: state.todos.filter((t) => !t.completed),
    })),

  setFilter: (filter) => set({ filter }),
  setSort: (sort) => set({ sort }),

  getFiltered: () => {
    const { todos, filter, sort } = get()
    let result = todos.filter((t) => {
      if (filter === 'active') return !t.completed
      if (filter === 'completed') return t.completed
      return true
    })

    const priorityOrder = { high: 0, medium: 1, low: 2 }
    if (sort === 'newest') result = [...result].sort((a, b) => b.createdAt - a.createdAt)
    if (sort === 'oldest') result = [...result].sort((a, b) => a.createdAt - b.createdAt)
    if (sort === 'priority') result = [...result].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

    return result
  },

  getStats: () => {
    const { todos } = get()
    const total = todos.length
    const completed = todos.filter((t) => t.completed).length
    const high = todos.filter((t) => t.priority === 'high' && !t.completed).length
    return { total, completed, active: total - completed, high }
  },
}))

export default useTodoStore
