import { Navigate, Outlet } from 'react-router-dom'

export default function RoleRoute({ user, allow }) {
  if (!user) return <Navigate to="/login" replace />
  if (!allow.includes(user.role)) return <Navigate to="/" replace />
  return <Outlet />
}
