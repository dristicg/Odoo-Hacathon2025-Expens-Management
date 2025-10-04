// import api from '../lib/api'
// import { useEffect, useState } from 'react'

// export default function ExpensesMine() {
//   const [items, setItems] = useState([])
//   const [selected, setSelected] = useState(null)

//   async function load() {
//     const res = await api.get('/expenses/mine')
//     setItems(res.data)
//   }

//   useEffect(() => { load() }, [])

//   async function openDetails(id) {
//     const res = await api.get(`/expenses/${id}`)
//     setSelected(res.data)
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-semibold mb-4">My Expenses</h1>
//       <ul className="space-y-2">
//         {items.map((e) => (
//           <li key={e._id} className="border p-3 rounded bg-white flex items-center justify-between">
//             <div>
//               <div className="font-medium">{e.category} • {e.amountOriginal} {e.currencyOriginal} → {e.amountCompany} {e.currencyCompany}</div>
//               <div className="text-xs text-gray-600">{new Date(e.date).toLocaleDateString()} • Status: {e.status}</div>
//             </div>
//             <button onClick={() => openDetails(e._id)} className="text-sm px-3 py-1 rounded border">Details</button>
//           </li>
//         ))}
//       </ul>

//       {selected && (
//         <div className="mt-6 border rounded bg-white p-3">
//           <div className="flex justify-between items-center">
//             <h2 className="font-medium">Expense Details</h2>
//             <button onClick={() => setSelected(null)} className="text-sm">Close</button>
//           </div>
//           <div className="text-sm text-gray-700 mt-2">{selected.expense.category} • {selected.expense.amountOriginal} {selected.expense.currencyOriginal} → {selected.expense.amountCompany} {selected.expense.currencyCompany}</div>
//           <div className="text-xs text-gray-600">{new Date(selected.expense.date).toLocaleDateString()} • Status: {selected.expense.status}</div>

//           {selected.expense.receipts?.length > 0 && (
//             <div className="mt-3 grid grid-cols-2 gap-2">
//               {selected.expense.receipts.map((r, i) => (
//                 <img key={i} src={r.url} alt={`receipt-${i}`} className="w-full h-auto border rounded" />
//               ))}
//             </div>
//           )}

//           <div className="mt-3">
//             <h3 className="font-medium">Approval History</h3>
//             <ul className="text-sm mt-1 space-y-1">
//               {selected.approvals.map(a => (
//                 <li key={a._id}>
//                   {a.status} by {a.approver.email} {a.decidedAt ? `at ${new Date(a.decidedAt).toLocaleString()}` : ''} {a.comment ? `• "${a.comment}"` : ''}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }


import { useEffect, useState } from 'react'
import api from '../lib/api' // RESTORE THIS LINE IN YOUR PROJECT

// --- TEMPORARY MOCKS START (Remove this block when integrating) ---
// const MOCK_EXPENSES_MINE = [
//     { _id: 'e1', category: 'Software Subscription', amountOriginal: 49.99, currencyOriginal: 'USD', amountCompany: 49.99, currencyCompany: 'USD', status: 'PENDING', date: new Date(Date.now() - 86400000).toISOString() },
//     { _id: 'e2', category: 'Client Lunch', amountOriginal: 75.00, currencyOriginal: 'EUR', amountCompany: 81.00, currencyCompany: 'USD', status: 'APPROVED', date: new Date(Date.now() - 86400000 * 2).toISOString() },
//     { _id: 'e3', category: 'Conference Ticket', amountOriginal: 850.00, currencyOriginal: 'USD', amountCompany: 850.00, currencyCompany: 'USD', status: 'REJECTED', date: new Date(Date.now() - 86400000 * 5).toISOString() },
// ];

// const MOCK_DETAIL = {
//     expense: {
//         _id: 'e1',
//         category: 'Software Subscription',
//         amountOriginal: 49.99,
//         currencyOriginal: 'USD',
//         amountCompany: 49.99,
//         currencyCompany: 'USD',
//         status: 'PENDING',
//         date: new Date(Date.now() - 86400000).toISOString(),
//         receipts: [
//             { url: "https://placehold.co/150x100/A0C4FF/000?text=Receipt+1" },
//             { url: "https://placehold.co/150x100/BDB2FF/000?text=Receipt+2" }
//         ],
//     },
//     approvals: [
//         { _id: 'a1', status: 'PENDING', approver: { email: 'manager@corp.com' }, decidedAt: null, comment: null },
//     ]
// };

// const api = {
//     get: async (url) => { 
//         console.log(`MOCK API GET: ${url}`);
//         if (url.includes('/expenses/mine')) {
//             return { data: MOCK_EXPENSES_MINE };
//         }
//         if (url.includes('/expenses/')) {
//             // Return a detail object
//             return { data: MOCK_DETAIL };
//         }
//         return { data: [] };
//     },
// };
// // --- TEMPORARY MOCKS END ---


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

// Utility Component: Receipt Thumbnail with Hover Zoom
const ReceiptThumbnail = ({ url, alt }) => (
    <div className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:scale-[1.03]">
        <a href={url} target="_blank" rel="noopener noreferrer">
            <img 
                src={url} 
                alt={alt} 
                className="w-full h-24 object-cover cursor-pointer transition duration-300" 
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x100/CCCCCC/666666?text=No+Image" }}
            />
        </a>
    </div>
);


export default function ExpensesMine() {
    const [items, setItems] = useState([])
    const [selected, setSelected] = useState(null)
    const [loading, setLoading] = useState(true)

    async function load() {
        setLoading(true);
        try {
            const res = await api.get('/expenses/mine')
            setItems(res.data)
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { load() }, [])

    async function openDetails(id) {
        try {
            const res = await api.get(`/expenses/${id}`)
            setSelected(res.data)
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-2xl border-t-8 border-blue-600/70 space-y-6">
                
                <h1 className="text-3xl font-extrabold text-gray-900 pb-3 border-b border-gray-200">
                    <span className="text-blue-600 mr-2">|</span> My Submitted Expenses
                </h1>
                
                {loading && <p className="text-center text-blue-600 py-6">Loading your expenses...</p>}
                
                {!loading && items.length === 0 && (
                    <div className="p-8 bg-gray-50 rounded-lg border border-gray-200">
                        <p className="text-lg text-gray-600 text-center">You have not submitted any expenses yet.</p>
                    </div>
                )}

                <ul className="space-y-4">
                    {items.map((e) => (
                        <li key={e._id} 
                            className="bg-white p-4 rounded-xl shadow-md border border-gray-100 flex items-center justify-between hover:shadow-lg transition duration-200"
                        >
                            <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-bold text-gray-800 truncate">
                                        {e.category}
                                    </h2>
                                    <StatusBadge status={e.status} />
                                </div>

                                {/* Amount Details */}
                                <div className="text-sm font-semibold text-gray-700">
                                    Original: {e.amountOriginal} {e.currencyOriginal}
                                    <span className="text-gray-500 font-normal ml-3">
                                        → Payout: <span className="text-green-600 font-bold">{e.amountCompany} {e.currencyCompany}</span>
                                    </span>
                                </div>
                                
                                {/* Metadata */}
                                <div className="text-xs text-gray-600 pt-1">
                                    <span className="flex items-center">
                                        <svg className="w-3 h-3 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h.01M16 14h.01M21 7v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2z"></path></svg>
                                        {new Date(e.date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Action Button */}
                            <button 
                                onClick={() => openDetails(e._id)} 
                                className="ml-4 flex-shrink-0 bg-blue-500 text-white text-sm py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition duration-150 shadow-md"
                            >
                                Details
                            </button>
                        </li>
                    ))}
                </ul>

                {selected && (
                    <div className="mt-6 bg-gray-50 rounded-xl p-6 border border-blue-200 shadow-inner">
                        <div className="flex justify-between items-start border-b pb-3 mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Expense Details</h2>
                            <button 
                                onClick={() => setSelected(null)} 
                                className="text-sm text-gray-500 hover:text-gray-700 transition"
                            >
                                Close
                            </button>
                        </div>

                        {/* Summary */}
                        <div className="space-y-1 mb-4">
                            <div className="text-base font-bold text-gray-700">{selected.expense.category}</div>
                            <div className="text-sm text-gray-700">
                                <span className="font-medium">Amount:</span> {selected.expense.amountOriginal} {selected.expense.currencyOriginal} → {selected.expense.amountCompany} {selected.expense.currencyCompany}
                            </div>
                            <div className="text-sm text-gray-700">
                                <span className="font-medium">Date:</span> {new Date(selected.expense.date).toLocaleDateString()}
                            </div>
                            <div className="text-sm flex items-center">
                                <span className="font-medium mr-2">Status:</span>
                                <StatusBadge status={selected.expense.status} />
                            </div>
                        </div>

                        {/* Receipts */}
                        {selected.expense.receipts?.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <h3 className="font-semibold text-md mb-2 text-gray-800">Receipts</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {selected.expense.receipts.map((r, i) => (
                                        <ReceiptThumbnail key={i} url={r.url} alt={`Receipt ${i+1}`} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Approval History */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <h3 className="font-semibold text-md mb-2 text-gray-800">Approval History</h3>
                            <ul className="text-sm mt-1 space-y-2">
                                {selected.approvals.map(a => (
                                    <li key={a._id} className="p-2 border rounded-md bg-white">
                                        <span className={`font-semibold ${a.status === 'APPROVED' ? 'text-green-600' : a.status === 'REJECTED' ? 'text-red-600' : 'text-yellow-600'}`}>
                                            {a.status}
                                        </span>
                                        <span className="text-gray-600"> by {a.approver.email}</span>
                                        {a.decidedAt && (
                                            <span className="text-xs text-gray-400 block sm:inline sm:ml-2">
                                                at {new Date(a.decidedAt).toLocaleString()}
                                            </span>
                                        )}
                                        {a.comment && (
                                            <p className="text-xs text-gray-500 mt-0.5 italic">
                                                Comment: "{a.comment}"
                                            </p>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
