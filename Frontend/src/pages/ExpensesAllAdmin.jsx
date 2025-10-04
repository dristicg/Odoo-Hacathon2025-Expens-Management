// import api from '../lib/api'
// import { useEffect, useState } from 'react'

// export default function ExpensesAllAdmin() {
//   const [items, setItems] = useState([])

//   useEffect(() => {
//     async function load() {
//       const res = await api.get('/expenses/all')
//       setItems(res.data)
//     }
//     load()
//   }, [])

//   async function override(id, status) {
//     try {
//       await api.post(`/admin/expenses/${id}/override`, { status, comment: '' })
//       setItems(prev => prev.map(e => e._id === id ? { ...e, status } : e))
//     } catch (e) {
//       alert(e.response?.data?.error || 'Override failed')
//     }
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-semibold mb-4">All Expenses (Admin)</h1>
//       <ul className="space-y-2">
//         {items.map((e) => (
//           <li key={e._id} className="border p-3 rounded bg-white flex items-center justify-between">
//             <div>
//               <div className="font-medium">{e.category} • {e.amountOriginal} {e.currencyOriginal} → {e.amountCompany} {e.currencyCompany}</div>
//               <div className="text-xs text-gray-600">{new Date(e.date).toLocaleDateString()} • Status: {e.status} • {e.employee?.email}</div>
//             </div>
//             <div className="space-x-2">
//               <button onClick={() => override(e._id, 'REJECTED')} className="px-3 py-1 rounded border text-red-600 border-red-300">Force Reject</button>
//               <button onClick={() => override(e._id, 'APPROVED')} className="px-3 py-1 rounded bg-green-600 text-white">Force Approve</button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }


import { useEffect, useState } from 'react'
// import api from '../lib/api' // RESTORE THIS LINE IN YOUR PROJECT

// --- TEMPORARY MOCKS START (Remove this block when integrating) ---
// Mock API: Used to resolve compilation error
const MOCK_EXPENSES = [
    { _id: 'e1', category: 'Software Licensing', amountOriginal: 499.99, currencyOriginal: 'USD', amountCompany: 499.99, currencyCompany: 'USD', status: 'PENDING', date: new Date(Date.now() - 86400000).toISOString(), employee: { email: 'alice.m@corp.com' } },
    { _id: 'e2', category: 'Client Dinner', amountOriginal: 125.00, currencyOriginal: 'EUR', amountCompany: 135.00, currencyCompany: 'USD', status: 'APPROVED', date: new Date(Date.now() - 86400000 * 2).toISOString(), employee: { email: 'bob.k@corp.com' } },
    { _id: 'e3', category: 'Travel - Flight', amountOriginal: 850.00, currencyOriginal: 'GBP', amountCompany: 1050.00, currencyCompany: 'USD', status: 'REJECTED', date: new Date(Date.now() - 86400000 * 5).toISOString(), employee: { email: 'charlie.s@corp.com' } },
    { _id: 'e4', category: 'Online Course', amountOriginal: 99.00, currencyOriginal: 'USD', amountCompany: 99.00, currencyCompany: 'USD', status: 'PENDING', date: new Date(Date.now() - 86400000 * 10).toISOString(), employee: { email: 'alice.m@corp.com' } },
];

const api = {
    get: async (url) => { 
        console.log(`MOCK API GET: ${url}`); 
        return { data: MOCK_EXPENSES }; 
    },
    post: async (url, data) => { 
        console.log(`MOCK API POST: ${url}`, data);
        if (url.includes('override')) {
             // Simulate success by resolving immediately
             return { data: { success: true } }; 
        }
        return { data: {} }; 
    }
};
// --- TEMPORARY MOCKS END ---


// Utility Component: Status Badge
const StatusBadge = ({ status }) => {
    let colorClasses = '';
    let text = status;

    switch (status) {
        case 'APPROVED':
            colorClasses = 'bg-green-100 text-green-700 ring-green-500/30';
            break;
        case 'PENDING':
            colorClasses = 'bg-yellow-100 text-yellow-700 ring-yellow-500/30';
            break;
        case 'REJECTED':
            colorClasses = 'bg-red-100 text-red-700 ring-red-500/30';
            break;
        default:
            colorClasses = 'bg-gray-100 text-gray-700 ring-gray-500/30';
    }

    return (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ring-1 ${colorClasses} shadow-sm`}>
            {text}
        </span>
    );
};

// Custom Modal Component for Alert/Confirmation (Replaces alert())
const CustomAlert = ({ message, onClose }) => {
    if (!message) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl p-6 shadow-2xl max-w-sm w-full transform transition-all">
                <h3 className="text-xl font-bold text-red-600 mb-3">Error</h3>
                <p className="text-gray-700 mb-5">{message}</p>
                <div className="text-right">
                    <button
                        onClick={onClose}
                        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-150"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};


export default function ExpensesAllAdmin() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null) // For the custom alert

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const res = await api.get('/expenses/all')
                setItems(res.data)
            } catch (e) {
                console.error("Error loading expenses:", e)
                setError(e.response?.data?.error || 'Failed to load all expenses.')
            } finally {
                setLoading(false);
            }
        }
        load()
    }, [])

    async function override(id, status) {
        try {
            // Note: The comment here is mandatory for the API based on the original code logic
            await api.post(`/admin/expenses/${id}/override`, { status, comment: 'Admin Override via All Expenses Page' }) 
            
            // Optimistically update the status locally
            setItems(prev => prev.map(e => e._id === id ? { ...e, status } : e))
            
            // Clear any lingering errors if successful
            setError(null); 
        } catch (e) {
            console.error("Override failed:", e)
            // Use the custom error state instead of alert()
            setError(e.response?.data?.error || 'Override failed due to a server error.')
        }
    }
    
    // Base style for action buttons
    const buttonStyle = "py-2 px-4 rounded-lg font-medium text-sm transition duration-150 transform hover:scale-[1.02] shadow-sm";

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <CustomAlert message={error} onClose={() => setError(null)} />
            
            <div className="max-w-7xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-2xl border-t-8 border-blue-600/70">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                    <span className="text-blue-600 mr-2">|</span> All  Expenses
                </h1>

                {loading && <p className="text-center text-blue-600 py-6">Loading all expenses...</p>}
                
                {!loading && items.length === 0 && (
                     <div className="p-8 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-lg text-gray-600 text-center">No expenses have been submitted yet.</p>
                    </div>
                )}

                <ul className="space-y-4">
                    {items.map((e) => (
                        <li key={e._id} className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-200">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                
                                {/* Expense Details (Left/Top) */}
                                <div className="flex-1 min-w-0 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-lg font-bold text-gray-800 truncate">
                                            {e.category}
                                        </h2>
                                        <StatusBadge status={e.status} />
                                    </div>

                                    {/* Amount Details */}
                                    <div className="text-sm font-semibold text-indigo-600">
                                        Original: {e.amountOriginal} {e.currencyOriginal}
                                        <span className="text-gray-500 font-normal ml-3">
                                            → Co. Payout: <span className="text-green-600 font-bold">{e.amountCompany} {e.currencyCompany}</span>
                                        </span>
                                    </div>
                                    
                                    {/* Metadata */}
                                    <div className="text-xs text-gray-600 pt-1 flex flex-col sm:flex-row sm:space-x-4">
                                        <span className="flex items-center">
                                            <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h.01M16 14h.01M21 7v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2z"></path></svg>
                                            {new Date(e.date).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center mt-1 sm:mt-0">
                                            <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                            {e.employee?.email}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Action Buttons (Right/Bottom) */}
                                <div className="flex-shrink-0 flex gap-2 w-full md:w-auto">
                                    <button 
                                        onClick={() => override(e._id, 'REJECTED')} 
                                        className={`${buttonStyle} bg-red-100 text-red-700 hover:bg-red-200 border border-red-300 w-1/2 md:w-auto`}
                                        disabled={e.status === 'REJECTED'}
                                    >
                                        Force Reject
                                    </button>
                                    <button 
                                        onClick={() => override(e._id, 'APPROVED')} 
                                        className={`${buttonStyle} bg-green-600 text-white hover:bg-green-700 w-1/2 md:w-auto`}
                                        disabled={e.status === 'APPROVED'}
                                    >
                                        Force Approve
                                    </button>
                                </div>

                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
