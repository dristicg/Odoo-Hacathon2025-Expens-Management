// import { useEffect, useState } from 'react'
// import api from '../lib/api'
// import { Link } from 'react-router-dom'

// export default function Dashboard() {
//   const [me, setMe] = useState(null)
//   const [activity, setActivity] = useState({ myExpenses: [], myApprovals: [] })

//   useEffect(() => {
//     async function load() {
//       try {
//         const user = JSON.parse(localStorage.getItem('user') || 'null')
//         setMe(user)
//         const res = await api.get('/me/activity')
//         setActivity(res.data)
//       } catch (e) {
//         console.error(e)
//       }
//     }
//     load()
//   }, [])

//   const role = me?.role

//   return (
//     <div className="space-y-8">
//       <div>
//         <h1 className="text-2xl font-semibold mb-2">Dashboard</h1>
//         <p className="text-sm text-gray-600">Welcome {me?.email} ({role})</p>
//         {activity.managerEmail && (
//           <p className="text-xs text-gray-600 mt-1">Your manager: {activity.managerEmail}</p>
//         )}
//       </div>

//       {role === 'ADMIN' && (
//         <section className="space-y-2">
//           <div className="flex gap-3 text-sm">
//             <Link to="/admin" className="text-blue-600 underline">Admin Settings</Link>
//             <Link to="/admin/expenses" className="text-blue-600 underline">All Expenses</Link>
//           </div>
//           <div>
//             <h2 className="font-medium mb-2">Recent Company Activity</h2>
//             <p className="text-xs text-gray-600">Use All Expenses to view and override.</p>
//           </div>
//         </section>
//       )}

//       {role === 'MANAGER' && (
//         <section>
//           <h2 className="font-medium mb-2">Your Recent Approvals</h2>
//           <ul className="space-y-2">
//             {activity.myApprovals.slice(0,5).map((a) => (
//               <li key={a._id} className="text-sm">
//                 {a.status} • {a.expense?.category} • {new Date(a.decidedAt).toLocaleString()}
//               </li>
//             ))}
//           </ul>
//         </section>
//       )}

//       <section>
//         <h2 className="font-medium mb-2">Your Recent Expenses</h2>
//         <ul className="space-y-2">
//           {activity.myExpenses.slice(0,5).map((e) => (
//             <li key={e._id} className="text-sm">
//               {e.category} • {e.amountOriginal} {e.currencyOriginal} → {e.amountCompany} {e.currencyCompany} • {e.status}
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   )
// }


import { useEffect, useState } from 'react'
import api from '../lib/api' 
import { Link } from 'react-router-dom'

// // --- TEMPORARY MOCKS START (Remove these when integrating) ---
// // Mock API: Used to prevent compilation errors in this environment
// const MOCK_ME = { email: 'admin@corp.com', role: 'ADMIN' }; // Mock as Admin to show all sections
// const MOCK_ACTIVITY = {
//     managerEmail: 'alice@corp.com',
//     myExpenses: [
//         { _id: 'e1', category: 'Software Subscription', amountOriginal: 49.99, currencyOriginal: 'USD', amountCompany: 49.99, currencyCompany: 'USD', status: 'APPROVED', date: new Date().toISOString() },
//         { _id: 'e2', category: 'Client Lunch', amountOriginal: 125.00, currencyOriginal: 'EUR', amountCompany: 135.00, currencyCompany: 'USD', status: 'PENDING', date: new Date().toISOString() },
//         { _id: 'e3', category: 'Flight to Conference', amountOriginal: 850.00, currencyOriginal: 'USD', amountCompany: 850.00, currencyCompany: 'USD', status: 'REJECTED', date: new Date().toISOString() },
//         { _id: 'e4', category: 'Office Supplies', amountOriginal: 22.50, currencyOriginal: 'USD', amountCompany: 22.50, currencyCompany: 'USD', status: 'APPROVED', date: new Date().toISOString() },
//         { _id: 'e5', category: 'Transportation', amountOriginal: 15.00, currencyOriginal: 'USD', amountCompany: 15.00, currencyCompany: 'USD', status: 'PENDING', date: new Date().toISOString() },
//     ],
//     myApprovals: [
//         { _id: 'a1', status: 'APPROVED', expense: { category: 'Hardware Purchase' }, decidedAt: new Date(Date.now() - 86400000).toISOString() },
//         { _id: 'a2', status: 'REJECTED', expense: { category: 'Team Lunch' }, decidedAt: new Date(Date.now() - 86400000 * 2).toISOString() },
//     ]
// };
// const api = { get: async (url) => { console.log(`MOCK API GET: ${url}`); return { data: MOCK_ACTIVITY }; } };
// // Mock Link component for react-router-dom
// const Link = ({ to, children, className }) => <a href="#" onClick={(e) => e.preventDefault()} className={className}>{children}</a>;
// // --- TEMPORARY MOCKS END ---


// Utility Component: Status Badge
const StatusBadge = ({ status }) => {
    let colorClasses = '';
    let text = status;

    switch (status) {
        case 'APPROVED':
            colorClasses = 'bg-green-100 text-green-700';
            break;
        case 'PENDING':
            colorClasses = 'bg-yellow-100 text-yellow-700';
            break;
        case 'REJECTED':
            colorClasses = 'bg-red-100 text-red-700';
            break;
        default:
            colorClasses = 'bg-gray-100 text-gray-700';
    }

    return (
        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colorClasses}`}>
            {text}
        </span>
    );
};

// Utility Component: Card Wrapper
const SectionCard = ({ title, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500/50">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{title}</h2>
        {children}
    </div>
);

// Utility Component: Activity List Item
const ActivityItemCard = ({ children, to }) => (
    <Link to={to} className="block hover:shadow-md transition duration-200">
        <li className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-white cursor-pointer">
            {children}
        </li>
    </Link>
);


export default function Dashboard() {
    const [me, setMe] = useState(null)
    const [activity, setActivity] = useState({ myExpenses: [], myApprovals: [], managerEmail: null })
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                // Using MOCK_ME from above for initial state if localStorage is empty
                const user = JSON.parse(localStorage.getItem('user') || JSON.stringify(MOCK_ME)); 
                setMe(user)
                const res = await api.get('/me/activity')
                setActivity(res.data)
            } catch (e) {
                console.error(e)
            } finally {
                setLoading(false);
            }
        }
        load()
    }, [])

    const role = me?.role;

    // Component for the top welcome banner
    const WelcomeCard = () => (
        <div className="bg-white p-6 rounded-xl shadow-xl border-l-8 border-blue-600 mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
                Welcome back, {me?.email || 'User'}!
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 mt-2 space-y-1 sm:space-y-0 sm:space-x-4">
                <p className="font-semibold text-blue-600 px-3 py-1 bg-blue-50 rounded-full">
                    Role: {role || 'Employee'}
                </p>
                {activity.managerEmail && (
                    <p className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                        Manager: <span className="font-medium ml-1 text-gray-700">{activity.managerEmail}</span>
                    </p>
                )}
            </div>
        </div>
    );

    if (loading) {
        return <div className="p-8 text-center text-lg text-blue-600">Loading Dashboard...</div>
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <div className="max-w-7xl mx-auto">
                
                <WelcomeCard />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Admin Quick Links (Column 1) */}
               

                    {/* Manager Recent Approvals (Column 2 or Main if not Admin) */}
                    {role === 'MANAGER' && (
                        <div className={`lg:col-span-1 ${role === 'ADMIN' ? '' : 'lg:col-span-2'}`}>
                            <SectionCard title="Your Recent Approval Activity">
                                {activity.myApprovals.length === 0 ? (
                                    <p className="text-gray-500 text-sm">No recent approvals found.</p>
                                ) : (
                                    <ul className="space-y-3">
                                        {activity.myApprovals.slice(0, 5).map((a) => (
                                            <ActivityItemCard key={a._id} to={`/approvals/${a._id}`}>
                                                <div className="flex items-center justify-between">
                                                    <div className="font-medium text-gray-800">
                                                        {a.expense?.category || 'General Expense'}
                                                    </div>
                                                    <StatusBadge status={a.status} />
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    Decided: {new Date(a.decidedAt).toLocaleString()}
                                                </div>
                                            </ActivityItemCard>
                                        ))}
                                    </ul>
                                )}
                                <div className="mt-4 text-right">
                                    <Link to="/approvals" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                                        View All Pending Approvals &rarr;
                                    </Link>
                                </div>
                            </SectionCard>
                        </div>
                    )}

                    {/* Employee Recent Expenses (Column 3 or Main if not Admin/Manager) */}
                    <div className={`${role === 'ADMIN' ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                        <SectionCard title="Your Recent Expense Submissions">
                            {activity.myExpenses.length === 0 ? (
                                <p className="text-gray-500 text-sm">You have not submitted any expenses yet.</p>
                            ) : (
                                <ul className="space-y-3">
                                    {activity.myExpenses.slice(0, 5).map((e) => (
                                        <ActivityItemCard key={e._id} to={`/expenses/${e._id}`}>
                                            <div className="flex items-center justify-between">
                                                <div className="text-base font-semibold text-gray-900">
                                                    {e.category} 
                                                </div>
                                                <StatusBadge status={e.status} />
                                            </div>
                                            <div className="text-sm text-gray-700 mt-1">
                                                <span className="font-bold text-indigo-600 mr-2">
                                                    {e.amountOriginal} {e.currencyOriginal}
                                                </span>
                                                <span className="text-gray-500">
                                                    (Co. {e.amountCompany} {e.currencyCompany})
                                                </span>
                                            </div>
                                        </ActivityItemCard>
                                    ))}
                                </ul>
                            )}
                            <div className="mt-4 text-right">
                                <Link to="/expenses" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                                    Submit New Expense &rarr;
                                </Link>
                            </div>
                        </SectionCard>
                    </div>

                </div>
            </div>
        </div>
    )
}
