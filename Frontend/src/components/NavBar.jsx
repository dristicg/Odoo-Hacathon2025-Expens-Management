// import { Link, useLocation } from 'react-router-dom'

// function cls(active) {
//   return active
//     ? 'text-blue-600 font-medium'
//     : 'text-gray-700 hover:text-blue-600'
// }

// export default function NavBar({ user, onLogout }) {
//   const loc = useLocation()
//   const role = user?.role
//   const is = (path) => loc.pathname === path

//   const links = []

//   // Always dashboard
//   links.push({ to: '/', label: 'Dashboard', show: true })

//   // Submit expense is hidden for Admin as requested
//   links.push({ to: '/submit', label: 'Submit Expense', show: role !== 'ADMIN' })

//   // My expenses hidden for Admin per request
//   links.push({ to: '/expenses', label: 'My Expenses', show: role !== 'ADMIN' })

//   // Approvals visible to Manager/Admin
//   links.push({ to: '/approvals', label: 'Approvals', show: role === 'MANAGER' || role === 'ADMIN' })

//   // Team visible to Manager/Admin
//   links.push({ to: '/team', label: 'Team', show: role === 'MANAGER' || role === 'ADMIN' })

//   // Admin settings
//   links.push({ to: '/admin', label: 'Admin', show: role === 'ADMIN' })
//   // Admin history of all submitted requests
//   links.push({ to: '/admin/history', label: 'History', show: role === 'ADMIN' })

//   // OCR for Employees and Managers
//   links.push({ to: '/ocr', label: 'OCR', show: role !== 'ADMIN' })

//   return (
//     <nav className="border-b bg-white/80 backdrop-blur">
//       <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
//         <div className="flex items-center gap-6">
//           <div className="font-semibold">Expense Manager</div>
//           <ul className="hidden md:flex items-center gap-4 text-sm">
//             {links.filter(l => l.show).map((l) => (
//               <li key={l.to}>
//                 <Link to={l.to} className={cls(is(l.to))}>{l.label}</Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="flex items-center gap-3">
//           {role && (
//             <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
//               {role}
//             </span>
//           )}
//           <button onClick={onLogout} className="text-sm text-red-600">Logout</button>
//         </div>
//       </div>
//     </nav>
//   )
// }


import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react' // Import useState for mobile menu state
import { Menu, X } from 'lucide-react' // Import icons for hamburger/close

function cls(active) {
  // Updated class for link styling, incorporating transitions and active state
  return active
    ? 'text-blue-600 font-bold relative after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300'
    : 'text-gray-700 hover:text-blue-600 transition duration-150 ease-in-out'
}

export default function NavBar({ user, onLogout }) {
  const loc = useLocation()
  const role = user?.role
  const is = (path) => loc.pathname === path
  const [isOpen, setIsOpen] = useState(false) // State for mobile menu

  const links = []

  // Always dashboard
  links.push({ to: '/home', label: 'Dashboard', show: true })

  // Submit expense is hidden for Admin as requested
  links.push({ to: '/submit', label: 'Submit Expense', show: role !== 'ADMIN' })

  // My expenses hidden for Admin per request
  links.push({ to: '/expenses', label: 'My Expenses', show: role !== 'ADMIN' })

  // Approvals visible to Manager/Admin
  links.push({ to: '/approvals', label: 'Approvals', show: role === 'MANAGER' || role === 'ADMIN' })

  // Team visible to Manager/Admin
  // links.push({ to: '/team', label: 'Team', show: role === 'MANAGER' || role === 'ADMIN' })

  // Admin settings
  links.push({ to: '/admin', label: 'Admin', show: role === 'ADMIN' })
  // Admin history of all submitted requests
  links.push({ to: '/admin/expenses', label: 'History', show: role === 'ADMIN' })

  // OCR for Employees and Managers
  links.push({ to: '/ocr', label: 'OCR', show: role !== 'ADMIN' })

  // Helper to determine role badge colors
  const roleBadgeClasses = () => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'MANAGER':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'EMPLOYEE':
        return 'bg-green-100 text-green-800 border-green-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    // Updated Nav style: shadow, frosted glass background
    <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Updated brand name style */}
          <div className="text-xl font-extrabold text-gray-900 tracking-wide">
            Expense Manager
          </div>
          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-6 text-sm">
            {links.filter(l => l.show).map((l) => (
              <li key={l.to}>
                <Link to={l.to} className={cls(is(l.to))}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-4">
          {/* Role Badge - Updated styling */}
          {role && (
            <span className={`text-xs px-3 py-1 rounded-full font-medium border ${roleBadgeClasses()}`}>
              {role}
            </span>
          )}
          {/* Logout Button - Updated styling */}
          <button
            onClick={onLogout}
            className="text-sm font-medium text-red-600 border border-red-300 px-3 py-1.5 rounded-lg hover:bg-red-50 transition duration-150 ease-in-out"
          >
            Logout
          </button>
          
          {/* Hamburger Menu Button (Mobile) */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown (Slide-out/Dropdown effect) */}
      <div 
        className={`md:hidden absolute w-full bg-white/90 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-screen border-t border-gray-100' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col p-4 space-y-2 text-base">
          {links.filter(l => l.show).map((l) => (
            <li key={l.to}>
              <Link 
                to={l.to} 
                className={`block py-2 px-3 rounded-lg ${
                  is(l.to) 
                    ? 'bg-blue-50 text-blue-600 font-semibold' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)} // Close menu on link click
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}