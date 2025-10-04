import api from '../lib/api'
import { useEffect, useState } from 'react'

export default function AdminHistory() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('ALL')

  async function load() {
    setLoading(true)
    try {
      const res = await api.get('/admin/history')
      setItems(res.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function openDetails(id) {
    const res = await api.get(`/expenses/${id}`)
    setSelected(res.data)
  }

  async function override(id, status) {
    await api.post(`/admin/expenses/${id}/override`, { status, comment: 'Admin override (history)' })
    setItems(prev => prev.map(e => e._id === id ? { ...e, status } : e))
    if (selected?.expense?._id === id) setSelected({ ...selected, expense: { ...selected.expense, status } })
  }

  const filtered = items.filter(e => filter === 'ALL' ? true : e.status === filter)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">History (All Submitted)</h1>
        <div className="flex items-center gap-2">
          <select className="border px-2 py-1 rounded" value={filter} onChange={e=>setFilter(e.target.value)}>
            <option value="ALL">All</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <button onClick={load} className="text-sm px-3 py-1 rounded border">Refresh</button>
        </div>
      </div>

      {loading && <p className="text-sm">Loading…</p>}

      <ul className="space-y-2">
        {filtered.map((e) => (
          <li key={e._id} className="border p-3 rounded bg-white flex items-center justify-between">
            <div>
              <div className="font-medium">{e.category} • {e.amountOriginal} {e.currencyOriginal} → {e.amountCompany} {e.currencyCompany}</div>
              <div className="text-xs text-gray-600">{new Date(e.date).toLocaleDateString()} • Status: {e.status} • {e.employee?.email}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => openDetails(e._id)} className="text-sm px-3 py-1 rounded border">Details</button>
              <button onClick={() => override(e._id, 'REJECTED')} className="text-sm px-3 py-1 rounded border text-red-600 border-red-300">Force Reject</button>
              <button onClick={() => override(e._id, 'APPROVED')} className="text-sm px-3 py-1 rounded bg-green-600 text-white">Force Approve</button>
            </div>
          </li>
        ))}
      </ul>

      {selected && (
        <div className="mt-6 border rounded bg-white p-3">
          <div className="flex justify-between items-center">
            <h2 className="font-medium">Expense Details</h2>
            <button onClick={() => setSelected(null)} className="text-sm">Close</button>
          </div>
          <div className="text-sm text-gray-700 mt-2">{selected.expense.category} • {selected.expense.amountOriginal} {selected.expense.currencyOriginal} → {selected.expense.amountCompany} {selected.expense.currencyCompany}</div>
          <div className="text-xs text-gray-600">By {selected.expense.employee.email} on {new Date(selected.expense.date).toLocaleDateString()} • Status: {selected.expense.status}</div>
          {selected.expense.receipts?.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {selected.expense.receipts.map((r, i) => (
                <img key={i} src={r.url} alt={`receipt-${i}`} className="w-full h-auto border rounded" />
              ))}
            </div>
          )}
          <div className="mt-3">
            <h3 className="font-medium">Approval History</h3>
            <ul className="text-sm mt-1 space-y-1">
              {selected.approvals.map(a => (
                <li key={a._id}>
                  {a.status} by {a.approver.email} {a.decidedAt ? `at ${new Date(a.decidedAt).toLocaleString()}` : ''} {a.comment ? `• "${a.comment}"` : ''}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}


// import { useEffect, useState } from 'react'

// import api from '../lib/api' // Original import commented out due to environment resolution error

// // Temporary, self-contained API definition to allow compilation and preview
// // REMOVE THIS BLOCK and UNCOMMENT the line above when deploying to your full environment.
// // const MOCK_HISTORY = [
// //     { _id: 'e1', category: 'Travel', amountOriginal: 150.00, currencyOriginal: 'USD', amountCompany: 150.00, currencyCompany: 'USD', date: new Date(Date.now() - 86400000 * 5).toISOString(), status: 'APPROVED', employee: { email: 'charlie@corp.com' } },
// //     { _id: 'e2', category: 'Software', amountOriginal: 49.99, currencyOriginal: 'EUR', amountCompany: 53.50, currencyCompany: 'USD', date: new Date(Date.now() - 86400000 * 2).toISOString(), status: 'PENDING', employee: { email: 'diana@corp.com' } },
// //     { _id: 'e3', category: 'Meals', amountOriginal: 35.75, currencyOriginal: 'USD', amountCompany: 35.75, currencyCompany: 'USD', date: new Date(Date.now() - 86400000 * 10).toISOString(), status: 'REJECTED', employee: { email: 'charlie@corp.com' } },
// //     { _id: 'e4', category: 'Hardware', amountOriginal: 1200.00, currencyOriginal: 'USD', amountCompany: 1200.00, currencyCompany: 'USD', date: new Date(Date.now() - 86400000 * 1).toISOString(), status: 'PENDING', employee: { email: 'bob@corp.com' } },
// // ];

// // const MOCK_DETAILS = {
// //     expense: { 
// //         _id: 'e1', 
// //         category: 'Travel', 
// //         description: 'Flight to NYC for Q3 planning meeting.',
// //         amountOriginal: 150.00, 
// //         currencyOriginal: 'USD', 
// //         amountCompany: 150.00, 
// //         currencyCompany: 'USD', 
// //         date: new Date(Date.now() - 86400000 * 5).toISOString(), 
// //         status: 'APPROVED', 
// //         employee: { email: 'charlie@corp.com' },
// //         receipts: [
// //             { url: 'https://placehold.co/300x200/3B82F6/ffffff?text=Flight+Receipt' },
// //             { url: 'https://placehold.co/300x200/10B981/ffffff?text=Hotel+Invoice' },
// //         ]
// //     },
// //     approvals: [
// //         { _id: 'a1', status: 'APPROVED', approver: { email: 'bob@corp.com' }, decidedAt: new Date(Date.now() - 86400000 * 4).toISOString(), comment: 'Looks good, in policy. - Bob' },
// //         { _id: 'a2', status: 'OVERRIDE', approver: { email: 'alice@corp.com' }, decidedAt: new Date(Date.now() - 86400000 * 3).toISOString(), comment: 'Final approval override. - Alice (Admin)' }
// //     ]
// // };

// // const api = {
// //     get: async (url) => {
// //         console.log(`MOCK API GET: ${url}`);
// //         if (url === '/admin/history') return { data: MOCK_HISTORY };
// //         if (url.startsWith('/expenses/')) return { data: MOCK_DETAILS };
// //         return { data: [] };
// //     },
// //     post: async (url, data) => {
// //         console.log(`MOCK API POST: ${url}`, data);
// //         return { data: { success: true } };
// //     }
// // };
// // End of temporary API definition


// // Utility Component for Status Badges
// const StatusBadge = ({ status }) => {
//     let colorClasses = 'bg-gray-100 text-gray-800';
//     if (status === 'APPROVED') colorClasses = 'bg-green-100 text-green-800';
//     else if (status === 'REJECTED') colorClasses = 'bg-red-100 text-red-800';
    
//     return (
//         <span className={`px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider ${colorClasses}`}>
//             {status}
//         </span>
//     );
// };

// export default function AdminHistory() {
//     const [items, setItems] = useState([])
//     const [selected, setSelected] = useState(null)
//     const [loading, setLoading] = useState(false)
//     const [filter, setFilter] = useState('ALL')

//     async function load() {
//         setLoading(true)
//         try {
//             const res = await api.get('/admin/history')
//             setItems(res.data)
//         } finally {
//             setLoading(false)
//         }
//     }

//     useEffect(() => { load() }, [])

//     async function openDetails(id) {
//         // Prevent unnecessary reloading if the item is already selected
//         if (selected?.expense?._id === id) return; 

//         // Set a partial selection state to show a skeleton/spinner in the detail view if needed
//         setSelected({ expense: { _id: id }, approvals: [] });

//         try {
//             const res = await api.get(`/expenses/${id}`)
//             setSelected(res.data)
//         } catch(e) {
//             console.error("Failed to load expense details:", e);
//             setSelected(null);
//         }
//     }

//     async function override(id, status) {
//         try {
//             await api.post(`/admin/expenses/${id}/override`, { status, comment: 'Admin override (history)' })
            
//             // Optimistically update the list
//             setItems(prev => prev.map(e => e._id === id ? { ...e, status } : e))
            
//             // Update the detail view if it's open
//             if (selected?.expense?._id === id) {
//                 // In a real app, you might refetch the details, but here we update optimistically
//                 setSelected(prev => ({ 
//                     ...prev, 
//                     expense: { ...prev.expense, status }, 
//                     approvals: [
//                         ...prev.approvals, 
//                         { _id: Date.now(), status: `FORCE ${status}`, approver: { email: 'Admin' }, decidedAt: new Date().toISOString(), comment: 'Admin override (history)' }
//                     ]
//                 }));
//             }
//         } catch (e) {
//             console.error("Failed to override expense:", e);
//         }
//     }

//     const filtered = items.filter(e => filter === 'ALL' ? true : e.status === filter)

//     // Base classes
//     const inputStyle = "border border-gray-300 rounded-lg px-4 py-2 bg-white text-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm";
//     const buttonStyle = "px-4 py-2 rounded-lg font-medium text-sm transition duration-150 transform hover:scale-[1.01] shadow-sm";

//     return (
//         <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
//             <div className="max-w-7xl mx-auto">
                
//                 {/* Header and Controls */}
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 border-b pb-4">
//                     <h1 className="text-3xl font-extrabold text-gray-900 mb-2 sm:mb-0">
//                         Expense History
//                     </h1>
//                     <div className="flex items-center space-x-3">
//                         {/* Filter Dropdown */}
//                         <select className={inputStyle + " appearance-none"} value={filter} onChange={e=>setFilter(e.target.value)}>
//                             <option value="ALL">All Statuses</option>
//                             <option value="PENDING">Pending</option>
//                             <option value="APPROVED">Approved</option>
//                             <option value="REJECTED">Rejected</option>
//                         </select>
//                         {/* Refresh Button */}
//                         <button onClick={load} className={`${buttonStyle} bg-gray-200 text-gray-700 hover:bg-gray-300 flex items-center gap-1`} disabled={loading}>
//                             <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m15.356-2H20v5m-8-2v-4m0 0h-4m4 0h4m-4 4v4m0 0h-4m4 0h4"></path></svg>
//                             {loading ? 'Refreshing...' : 'Refresh'}
//                         </button>
//                     </div>
//                 </div>

//                 {/* Main Content Area */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
//                     {/* History List (2/3 width on desktop) */}
//                     <div className={selected ? "lg:col-span-2" : "lg:col-span-3"}>
                        
//                         {loading && <p className="text-center text-sm text-gray-500 py-4">Loading expense reports...</p>}

//                         <div className="space-y-4">
//                             {filtered.length === 0 && !loading && (
//                                 <p className="text-center text-gray-500 p-8 bg-white rounded-xl shadow-md">No expenses match the current filter.</p>
//                             )}

//                             {filtered.map((e) => (
//                                 <div 
//                                     key={e._id} 
//                                     className={`p-4 rounded-xl bg-white shadow-md border-l-4 ${selected?._id === e._id ? 'border-blue-500' : 'border-transparent'} hover:shadow-lg transition duration-200 cursor-pointer`}
//                                     onClick={() => openDetails(e._id)}
//                                 >
//                                     <div className="flex items-start justify-between">
//                                         {/* Expense Summary */}
//                                         <div className="flex-1 min-w-0 pr-4">
//                                             <div className="flex items-center gap-3 mb-1">
//                                                 <div className="text-lg font-bold text-gray-900 truncate">
//                                                     {e.category}
//                                                 </div>
//                                                 <StatusBadge status={e.status} />
//                                             </div>
//                                             <div className="text-sm text-gray-600 space-x-1">
//                                                 <span className="font-semibold">{e.amountOriginal} {e.currencyOriginal}</span>
//                                                 <span className="text-gray-400">→</span>
//                                                 <span className="font-semibold text-green-600">{e.amountCompany} {e.currencyCompany}</span>
//                                             </div>
//                                             <div className="text-xs text-gray-500 mt-1">
//                                                 Submitted by: <span className="font-medium text-gray-700">{e.employee?.email}</span> on {new Date(e.date).toLocaleDateString()}
//                                             </div>
//                                         </div>

//                                         {/* Action Buttons */}
//                                         <div className="flex flex-col sm:flex-row items-center gap-2 flex-shrink-0">
//                                             <button 
//                                                 onClick={(event) => { event.stopPropagation(); openDetails(e._id); }} 
//                                                 className={`${buttonStyle} bg-blue-50 text-blue-600 border border-blue-300 hover:bg-blue-100`}
//                                             >
//                                                 Details
//                                             </button>
//                                             <div className="space-x-2 hidden md:flex">
//                                                 <button onClick={(event) => { event.stopPropagation(); override(e._id, 'REJECTED'); }} className={`${buttonStyle} text-red-600 border border-red-300 hover:bg-red-50`}>
//                                                     Reject
//                                                 </button>
//                                                 <button onClick={(event) => { event.stopPropagation(); override(e._id, 'APPROVED'); }} className={`${buttonStyle} bg-green-600 text-white hover:bg-green-700`}>
//                                                     Approve
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
                                    
//                                     {/* Mobile/Small Screen Action Buttons */}
//                                     <div className="flex justify-end gap-2 mt-3 md:hidden">
//                                         <button onClick={(event) => { event.stopPropagation(); override(e._id, 'REJECTED'); }} className={`${buttonStyle} text-red-600 border border-red-300 hover:bg-red-50 w-full`}>
//                                             Force Reject
//                                         </button>
//                                         <button onClick={(event) => { event.stopPropagation(); override(e._id, 'APPROVED'); }} className={`${buttonStyle} bg-green-600 text-white hover:bg-green-700 w-full`}>
//                                             Force Approve
//                                         </button>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Detail Panel (1/3 width on desktop) */}
//                     {selected && (
//                         <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-xl border-t-4 border-blue-500 lg:sticky lg:top-8 self-start">
//                             <div className="flex justify-between items-center pb-4 border-b">
//                                 <h2 className="text-xl font-bold text-gray-800">Expense ID: <span className="font-mono text-base text-gray-600">{selected.expense._id}</span></h2>
//                                 <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-800 transition duration-150">
//                                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
//                                 </button>
//                             </div>
                            
//                             {/* Loading State for Details */}
//                             {selected.approvals.length === 0 && selected.expense._id !== 'e1' && ( // Check for a fully loaded state
//                                 <p className="text-center text-blue-500 py-8">Loading details...</p>
//                             )}

//                             {/* Expense Summary */}
//                             {selected.expense.category && (
//                                 <div className="mt-4 space-y-3">
//                                     <div className="flex justify-between items-center">
//                                         <span className="text-sm font-medium text-gray-700">Category:</span>
//                                         <span className="font-semibold text-base text-gray-900">{selected.expense.category}</span>
//                                     </div>
//                                     <div className="flex justify-between items-center">
//                                         <span className="text-sm font-medium text-gray-700">Submitter:</span>
//                                         <span className="text-sm text-gray-600">{selected.expense.employee.email}</span>
//                                     </div>
//                                     <div className="flex justify-between items-center">
//                                         <span className="text-sm font-medium text-gray-700">Date:</span>
//                                         <span className="text-sm text-gray-600">{new Date(selected.expense.date).toLocaleDateString()}</span>
//                                     </div>
//                                     <div className="flex justify-between items-center">
//                                         <span className="text-sm font-medium text-gray-700">Current Status:</span>
//                                         <StatusBadge status={selected.expense.status} />
//                                     </div>
//                                     {selected.expense.description && (
//                                         <div className="pt-2 border-t border-gray-100">
//                                             <p className="text-xs font-medium text-gray-500 mb-1">Description:</p>
//                                             <p className="text-sm text-gray-700">{selected.expense.description}</p>
//                                         </div>
//                                     )}
//                                 </div>
//                             )}

//                             {/* Receipts */}
//                             {selected.expense.receipts?.length > 0 && (
//                                 <div className="mt-6 pt-4 border-t">
//                                     <h3 className="font-bold text-gray-700 mb-3">Receipts ({selected.expense.receipts.length})</h3>
//                                     <div className="grid grid-cols-2 gap-3">
//                                         {selected.expense.receipts.map((r, i) => (
//                                             <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="block">
//                                                 <img 
//                                                     src={r.url} 
//                                                     alt={`receipt-${i}`} 
//                                                     className="w-full h-auto object-cover rounded-lg shadow-sm hover:shadow-md transition duration-200 transform hover:scale-[1.03] cursor-pointer" 
//                                                     loading="lazy"
//                                                 />
//                                             </a>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Approval History */}
//                             {selected.approvals.length > 0 && (
//                                 <div className="mt-6 pt-4 border-t">
//                                     <h3 className="font-bold text-gray-700 mb-3">Approval History</h3>
//                                     <ul className="text-xs space-y-3">
//                                         {selected.approvals.map(a => (
//                                             <li key={a._id} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
//                                                 <div className="flex items-center justify-between font-medium">
//                                                     <StatusBadge status={a.status} />
//                                                     <span className="text-gray-600">
//                                                         {a.approver.email}
//                                                     </span>
//                                                 </div>
//                                                 <div className="text-gray-500 mt-1">
//                                                     {a.decidedAt ? new Date(a.decidedAt).toLocaleString() : 'Undecided'}
//                                                 </div>
//                                                 {a.comment && (
//                                                     <p className="text-gray-700 italic mt-1 border-t pt-1">
//                                                         "{a.comment}"
//                                                     </p>
//                                                 )}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }
