// import { useState } from 'react'
// import api from '../lib/api'

// export default function Login({ onSuccess }) {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState('')

//   async function submit(e) {
//     e.preventDefault()
//     setError('')
//     try {
//       const res = await api.post('/auth/login', { email, password })
//       onSuccess(res.data)
//     } catch (e) {
//       setError(e.response?.data?.error || 'Login failed')
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
//       <h1 className="text-xl font-semibold mb-4">Login</h1>
//       {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
//       <form onSubmit={submit} className="space-y-3">
//         <input className="w-full border px-3 py-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
//         <input className="w-full border px-3 py-2 rounded" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
//         <button className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
//       </form>
//     </div>
//   )
// }

import { useState } from 'react'
import api from '../lib/api'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/auth/login', { email, password })
      onSuccess(res.data)
    } catch (e) {
      setError(e.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            💰
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">Expense Manager</h1>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-100 text-red-700 text-sm p-3 rounded-lg mb-4">
            <ExclamationTriangleIcon className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={submit} className="space-y-5">
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder=" "
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <label
              htmlFor="email"
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Email
            </label>
          </div>

          <div className="relative">
            <input
              id="password"
              type="password"
              placeholder=" "
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <label
              htmlFor="password"
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Password
            </label>
          </div>

          <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-lg font-semibold transition hover:opacity-90">
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-600 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
}

