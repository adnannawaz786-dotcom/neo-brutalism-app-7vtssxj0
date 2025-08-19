import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import TodoPage from './pages/TodoPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-yellow-300">
        <main>
          <Routes>
            <Route path="/" element={<TodoPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App