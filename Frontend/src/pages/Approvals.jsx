// import api from '../lib/api'
// import { useEffect, useState } from 'react'

// export default function Approvals() {
//   const [items, setItems] = useState([])

//   const user = JSON.parse(localStorage.getItem('user') || '{}')
//   const [viewAll, setViewAll] = useState(user?.role === 'ADMIN')

//   useEffect(() => {
//     async function load() {
//       try {
//         const q = viewAll ? '?all=1' : ''
//         const res = await api.get(`/approvals/pending${q}`)
//         setItems(res.data)
//       } catch (e) {
//         console.error(e)
//       }
//     }
//     load()
//   }, [viewAll])

//   const [commentMap, setCommentMap] = useState({})

//   function setComment(id, val) {
//     setCommentMap(prev => ({ ...prev, [id]: val }))
//   }

//   async function act(id, action) {
//     try {
//       const comment = commentMap[id] || ''
//       if (action === 'approve') await api.post(`/approvals/${id}/approve`, { comment })
//       else await api.post(`/approvals/${id}/reject`, { comment })
//       setItems(prev => prev.filter(x => x._id !== id))
//     } catch (e) {
//       console.error(e)
//     }
//   }

//   async function override(expenseId, status) {
//     try {
//       await api.post(`/admin/expenses/${expenseId}/override`, { status, comment: 'Admin override' })
//       setItems(prev => prev.filter(x => x.expense?._id !== expenseId))
//     } catch (e) {
//       console.error(e)
//     }
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-semibold mb-4">Approvals</h1>
//       {JSON.parse(localStorage.getItem('user') || '{}')?.role === 'ADMIN' && (
//         <label className="text-sm flex items-center gap-2">
//           <input type="checkbox" checked={viewAll} onChange={e=>setViewAll(e.target.checked)} /> View all company pending
//         </label>
//       )}
//       {items.length === 0 && (
//         <p className="text-sm text-gray-600">No pending approvals.</p>
//       )}
//       <ul className="mt-4 space-y-2">
//         {items.map((it) => (
//           <li key={it._id} className="border p-3 rounded bg-white flex items-center justify-between">
//             <div>
//               <div className="font-medium">{it.expense?.category} • {it.expense?.amountOriginal} {it.expense?.currencyOriginal} → {it.expense?.amountCompany} {it.expense?.currencyCompany}</div>
//               <div className="text-xs text-gray-600">By {it.expense?.employee?.email} on {new Date(it.expense?.date).toLocaleDateString()}</div>
//               {it.expense?.receipts?.length > 0 && (
//                 <div className="mt-2 grid grid-cols-2 gap-2">
//                   {it.expense.receipts.map((r, i) => (
//                     <img key={i} src={r.url} alt={`receipt-${i}`} className="w-full h-auto border rounded" />
//                   ))}
//                 </div>
//               )}
//             </div>
//             <div className="flex items-center gap-2">
//               {user?.role === 'ADMIN' && it.approver?.email && (
//                 <span className="text-xs text-gray-600 mr-2">Assigned to: {it.approver.email}</span>
//               )}
//               <input
//                 placeholder="Comment (optional)"
//                 className="text-sm border px-2 py-1 rounded"
//                 value={commentMap[it._id] || ''}
//                 onChange={e => setComment(it._id, e.target.value)}
//               />
//               <button onClick={() => act(it._id, 'reject')} className="px-3 py-1 rounded border text-red-600 border-red-300">Reject</button>
//               <button onClick={() => act(it._id, 'approve')} className="px-3 py-1 rounded bg-green-600 text-white">Approve</button>
//               {user?.role === 'ADMIN' && (
//                 <>
//                   <button onClick={() => override(it.expense._id, 'REJECTED')} className="px-3 py-1 rounded border text-red-600 border-red-300">Force Reject</button>
//                   <button onClick={() => override(it.expense._id, 'APPROVED')} className="px-3 py-1 rounded bg-purple-600 text-white">Force Approve</button>
//                 </>
//               )}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }


import { useEffect, useState } from 'react'
import api from '../lib/api' // Restoring original import as requested

// Utility Component for Toggle Switch
const ToggleSwitch = ({ checked, onChange, label }) => (
    <label className="flex items-center space-x-2 cursor-pointer select-none">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <div className="relative">
            <input 
                type="checkbox" 
                checked={checked} 
                onChange={onChange} 
                className="sr-only" 
            />
            <div className="block bg-gray-300 w-12 h-6 rounded-full transition duration-300 ease-in-out"></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition duration-300 ease-in-out ${checked ? 'transform translate-x-6 bg-blue-600' : ''}`}></div>
        </div>
    </label>
);

export default function Approvals() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)

    // Using original data source: localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}') // Restored original localStorage retrieval
    const [viewAll, setViewAll] = useState(user?.role === 'ADMIN')

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const q = viewAll ? '?all=1' : ''
                const res = await api.get(`/approvals/pending${q}`)
                setItems(res.data)
            } catch (e) {
                console.error("Error loading pending approvals:", e)
            } finally {
                setLoading(false);
            }
        }
        load()
    }, [viewAll])

    const [commentMap, setCommentMap] = useState({})

    function setComment(id, val) {
        setCommentMap(prev => ({ ...prev, [id]: val }))
    }

    async function act(id, action) {
        try {
            const comment = commentMap[id] || ''
            if (action === 'approve') await api.post(`/approvals/${id}/approve`, { comment })
            else await api.post(`/approvals/${id}/reject`, { comment })
            
            // Remove the item immediately on success
            setItems(prev => prev.filter(x => x._id !== id))
            setCommentMap(prev => { 
                const newMap = { ...prev }; 
                delete newMap[id];
                return newMap;
            });
        } catch (e) {
            console.error("Error performing approval action:", e)
        }
    }

    async function override(expenseId, status) {
        try {
            await api.post(`/admin/expenses/${expenseId}/override`, { status, comment: 'Admin override' })
            
            // Remove all approval items associated with this expense ID
            setItems(prev => prev.filter(x => x.expense?._id !== expenseId))
        } catch (e) {
            console.error("Error performing admin override:", e)
        }
    }

    // Base classes
    const inputStyle = "w-full md:w-56 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm";
    const buttonStyle = "py-2 px-4 rounded-lg font-medium text-sm transition duration-150 transform hover:scale-[1.01] shadow-md";

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 border-b pb-4">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2 sm:mb-0">
                        Pending Approvals
                    </h1>
                    {user.role === 'ADMIN' && (
                        <ToggleSwitch 
                            checked={viewAll} 
                            onChange={e => setViewAll(e.target.checked)} 
                            label="View All Company Pending"
                        />
                    )}
                </div>

                {loading && <p className="text-center text-blue-600 py-4">Loading pending items...</p>}

                {items.length === 0 && !loading && (
                    <div className="p-8 bg-white rounded-xl shadow-md border-t-4 border-gray-300">
                        <p className="text-lg text-gray-600 text-center">🎉 No pending approvals for you {user.role === 'ADMIN' ? 'or the company' : ''}.</p>
                    </div>
                )}
                
                <div className="space-y-6">
                    {items.map((it) => (
                        <div key={it._id} className="bg-white p-5 rounded-xl shadow-lg border-l-4 border-yellow-500 hover:shadow-xl transition duration-200">
                            
                            {/* Header: Category & Submitter */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-3 border-b border-gray-100 mb-3">
                                <div className="flex-1 min-w-0">
                                    <div className="text-xl font-bold text-gray-900 truncate mb-1">
                                        {it.expense?.category || 'Expense Report'}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Submitted by <span className="font-semibold text-gray-700">{it.expense?.employee?.email}</span> on {new Date(it.expense?.date).toLocaleDateString()}
                                    </div>
                                </div>
                                
                                {/* Approval Assignment (for Admins viewing all) */}
                                {user.role === 'ADMIN' && it.approver?.email && (
                                    <span className="text-xs text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full font-medium mt-2 md:mt-0">
                                        Assigned to: {it.approver.email}
                                    </span>
                                )}
                            </div>

                            {/* Body: Amounts and Receipts */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                {/* Amounts and Info */}
                                <div className="space-y-2">
                                    <div className="text-lg font-bold text-indigo-600">
                                        Original: {it.expense?.amountOriginal} {it.expense?.currencyOriginal}
                                    </div>
                                    <div className="text-base font-semibold text-green-600">
                                        Company: {it.expense?.amountCompany} {it.expense?.currencyCompany}
                                    </div>
                                    <div className="text-xs text-gray-500 pt-2">
                                        Approval ID: <span className="font-mono">{it._id}</span>
                                    </div>
                                </div>

                                {/* Receipts */}
                                {it.expense?.receipts?.length > 0 && (
                                    <div className="grid grid-cols-2 gap-3 p-2 bg-gray-50 rounded-lg">
                                        {it.expense.receipts.map((r, i) => (
                                            <a key={i} href={r.url} target="_blank" rel="noopener noreferrer">
                                                <img 
                                                    src={r.url} 
                                                    alt={`receipt-${i}`} 
                                                    className="w-full h-24 object-cover rounded-md border border-gray-200 shadow-sm hover:shadow-lg transition duration-200 transform hover:scale-[1.05] cursor-pointer" 
                                                    loading="lazy"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer: Actions */}
                            <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
                                
                                {/* Comment Input */}
                                <input
                                    placeholder="Add an optional comment for the employee..."
                                    className={inputStyle + " flex-grow"}
                                    value={commentMap[it._id] || ''}
                                    onChange={e => setComment(it._id, e.target.value)}
                                />

                                {/* Action Buttons */}
                                <div className="flex-shrink-0 flex gap-2 w-full lg:w-auto">
                                    <button onClick={() => act(it._id, 'reject')} className={`${buttonStyle} bg-red-100 text-red-700 hover:bg-red-200 flex-1`}>
                                        Reject
                                    </button>
                                    <button onClick={() => act(it._id, 'approve')} className={`${buttonStyle} bg-green-600 text-white hover:bg-green-700 flex-1`}>
                                        Approve
                                    </button>
                                </div>
                                
                                {/* Admin Overrides */}
                                {user.role === 'ADMIN' && (
                                    <div className="flex-shrink-0 flex gap-2 w-full lg:w-auto">
                                        <button onClick={() => override(it.expense._id, 'REJECTED')} className={`${buttonStyle} bg-red-500 text-white hover:bg-red-600 flex-1`}>
                                            Force Reject
                                        </button>
                                        <button onClick={() => override(it.expense._id, 'APPROVED')} className={`${buttonStyle} bg-purple-600 text-white hover:bg-purple-700 flex-1`}>
                                            Force Approve
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
