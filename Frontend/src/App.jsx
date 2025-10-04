import { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import SubmitExpense from './pages/SubmitExpense.jsx'
import Approvals from './pages/Approvals.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import RoleRoute from './components/RoleRoute.jsx'
import NavBar from './components/NavBar.jsx'
import Admin from './pages/Admin.jsx'
import ExpensesMine from './pages/ExpensesMine.jsx'
// import TeamExpenses from './pages/TeamExpenses.jsx'
import ExpensesAllAdmin from './pages/ExpensesAllAdmin.jsx'
import AdminHistory from './pages/AdminHistory.jsx'
import ReceiptUpload from './pages/ReceiptUpload.jsx'
import Landing from './pages/Landing.jsx'

function App() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  })

  const navigate = useNavigate()


  function handleAuth({ token, user }) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    setUser(user)
    navigate('/home')
  }

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  return (
    <div className="min-h-screen">
      {user ? (
        <NavBar user={user} onLogout={handleLogout} />
      ) : (
        <nav className="border-b bg-white">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
            <Link to="/" className="font-semibold">Expense Manager</Link>
            <div className="space-x-4">
              <Link to="/login" className="text-sm">Login</Link>
              <Link to="/signup" className="text-sm">Signup</Link>
            </div>
          </div>
        </nav>
      )}

      <main className="mx-auto max-w-6xl p-4">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Landing user={user} />} />
          <Route path="/login" element={<Login onSuccess={handleAuth} />} />
          <Route path="/signup" element={<Signup onSuccess={handleAuth} />} />

          {/* Authenticated routes */}
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/submit" element={<SubmitExpense />} />
            <Route path="/expenses" element={<ExpensesMine />} />
            <Route path="/approvals" element={<Approvals />} />
            <Route path="/ocr" element={<ReceiptUpload />} />

            <Route element={<RoleRoute user={user} allow={['MANAGER','ADMIN']} />}>
              {/* <Route path="/team" element={<TeamExpenses />} /> */}
            </Route>

            <Route element={<RoleRoute user={user} allow={['ADMIN']} />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/expenses" element={<ExpensesAllAdmin />} />
              <Route path="/admin/history" element={<AdminHistory />} />
            </Route>
          </Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
