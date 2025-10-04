// import { useState } from 'react'
// import api from '../lib/api'

// export default function Signup({ onSuccess }) {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [companyName, setCompanyName] = useState('')
//   const [countryCode, setCountryCode] = useState('INR') // default to currency code for now
//   const [error, setError] = useState('')

//   async function submit(e) {
//     e.preventDefault()
//     setError('')
//     try {
//       const res = await api.post('/auth/signup', { email, password, companyName, countryCode })
//       onSuccess(res.data)
//     } catch (e) {
//       setError(e.response?.data?.error || 'Signup failed')
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
//       <h1 className="text-xl font-semibold mb-4">Signup</h1>
//       {error && <p className="text-sm text-red-600 mb-2">{error}</p>}
//       <form onSubmit={submit} className="space-y-3">
//         <input className="w-full border px-3 py-2 rounded" placeholder="Company Name" value={companyName} onChange={e=>setCompanyName(e.target.value)} />
//         <input className="w-full border px-3 py-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
//         <input className="w-full border px-3 py-2 rounded" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
//         <input className="w-full border px-3 py-2 rounded" placeholder="Country or Currency Code (e.g. INR, USD)" value={countryCode} onChange={e=>setCountryCode(e.target.value)} />
//         <button className="w-full bg-blue-600 text-white py-2 rounded">Create Company & Admin</button>
//       </form>
//     </div>
//   )
// }


import { useState } from 'react'
import api from '../lib/api'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'

export default function Signup({ onSuccess }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [countryCode, setCountryCode] = useState('INR')
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/auth/signup', {
        email,
        password,
        companyName,
        countryCode,
      })
      onSuccess(res.data)
    } catch (e) {
      setError(e.response?.data?.error || 'Signup failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 px-4 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl"></div>

      {/* Card */}
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
            💰
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">Expense Manager</h1>
          <p className="text-sm text-gray-500 mt-1">
            Create your company and first Admin account
          </p>
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
            <span className="absolute left-3 top-3">🏢</span>
            <input
              id="companyName"
              placeholder=" "
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              className="peer w-full border border-gray-300 rounded-lg pl-10 pr-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <label
              htmlFor="companyName"
              className="absolute left-10 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Company Name
            </label>
          </div>

          <div className="relative">
            <span className="absolute left-3 top-3">✉️</span>
            <input
              id="email"
              type="email"
              placeholder=" "
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="peer w-full border border-gray-300 rounded-lg pl-10 pr-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <label
              htmlFor="email"
              className="absolute left-10 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Email
            </label>
          </div>

          <div className="relative">
            <span className="absolute left-3 top-3">🔒</span>
            <input
              id="password"
              type="password"
              placeholder=" "
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="peer w-full border border-gray-300 rounded-lg pl-10 pr-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <label
              htmlFor="password"
              className="absolute left-10 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Password
            </label>
          </div>

          <div className="relative">
            <span className="absolute left-3 top-3">🌍</span>
            <input
              id="countryCode"
              placeholder=" "
              value={countryCode}
              onChange={e => setCountryCode(e.target.value)}
              className="peer w-full border border-gray-300 rounded-lg pl-10 pr-3 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <label
              htmlFor="countryCode"
              className="absolute left-10 top-2 text-gray-500 text-sm transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
            >
              Country / Currency Code
            </label>
          </div>

          <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2.5 rounded-lg font-semibold transition transform hover:scale-105">
            Create Company & Admin
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}
