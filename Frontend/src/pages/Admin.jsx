// // import { useEffect, useMemo, useState } from 'react'
// import api from '../lib/api'

// // export default function Admin() {
// //   const [users, setUsers] = useState([])
// //   const [email, setEmail] = useState('')
// //   const [password, setPassword] = useState('')
// //   const [role, setRole] = useState('EMPLOYEE')

// //   const [employeeId, setEmployeeId] = useState('')
// //   const [managerId, setManagerId] = useState('')

// //   const [flowName, setFlowName] = useState('Hybrid Flow')
// //   const [managerFirst, setManagerFirst] = useState(true)
// //   const [specificApproverId, setSpecificApproverId] = useState('')
// //   const [threshold, setThreshold] = useState(60)

// //   const employees = useMemo(() => users.filter(u => u.role === 'EMPLOYEE'), [users])
// //   const managers = useMemo(() => users.filter(u => u.role === 'MANAGER' || u.role === 'ADMIN'), [users])

// //   useEffect(() => {
// //     async function load() {
// //       try {
// //         const res = await api.get('/users')
// //         setUsers(res.data)
// //       } catch (e) {
// //         console.error(e)
// //       }
// //     }
// //     load()
// //   }, [])

// //   async function createUser(e) {
// //     e.preventDefault()
// //     try {
// //       await api.post('/users', { email, password, role })
// //       setEmail(''); setPassword(''); setRole('EMPLOYEE')
// //       const res = await api.get('/users')
// //       setUsers(res.data)
// //     } catch (e) {
// //       alert(e.response?.data?.error || 'Create user failed')
// //     }
// //   }

// //   async function setManager(e) {
// //     e.preventDefault()
// //     try {
// //       await api.post('/users/manager-relations', { employeeId, managerId })
// //       alert('Manager set!')
// //     } catch (e) {
// //       alert(e.response?.data?.error || 'Set manager failed')
// //     }
// //   }

// //   async function createFlow(e) {
// //     e.preventDefault()
// //     try {
// //       const steps = []
// //       if (managerFirst) steps.push({ order: 1, approvers: ['MANAGER'], isManagerFirst: true })
// //       if (specificApproverId) {
// //         steps.push({ order: steps.length + 1, approvers: [`USER:${specificApproverId}`], isManagerFirst: false })
// //       }
// //       if (steps.length === 0) steps.push({ order: 1, approvers: ['MANAGER'], isManagerFirst: true })

// //       const rules = []
// //       if (threshold) rules.push({ type: 'PERCENTAGE', threshold: Number(threshold), logic: 'OR' })
// //       if (specificApproverId) rules.push({ type: 'SPECIFIC_APPROVER', specificApproverId, logic: 'OR' })

// //       const res = await api.post('/admin/approval-flows', { name: flowName, steps, rules })
// //       const id = res.data._id
// //       await api.post(`/admin/approval-flows/${id}/activate`)
// //       alert('Flow created and activated')
// //     } catch (e) {
// //       alert(e.response?.data?.error || 'Create flow failed')
// //     }
// //   }

// //   return (
// //     <div className="space-y-10">
// //       <section>
// //         <h2 className="text-xl font-semibold mb-3">Users</h2>
// //         <form onSubmit={createUser} className="flex flex-wrap gap-2 items-end">
// //           <input className="border px-3 py-2 rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
// //           <input className="border px-3 py-2 rounded" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
// //           <select className="border px-3 py-2 rounded" value={role} onChange={e=>setRole(e.target.value)}>
// //             <option value="EMPLOYEE">EMPLOYEE</option>
// //             <option value="MANAGER">MANAGER</option>
// //           </select>
// //           <button className="bg-blue-600 text-white px-4 py-2 rounded">Create User</button>
// //         </form>

// //         <div className="mt-4">
// //           <h3 className="font-medium mb-2">All Users</h3>
// //           <ul className="divide-y bg-white rounded border">
// //             {users.map(u => (
// //               <li key={u._id} className="p-2 grid grid-cols-3 gap-2 items-center">
// //                 <span>{u.email}</span>
// //                 <span className="text-xs text-gray-600">{u.role}</span>
// //                 <span className="text-xs text-gray-600">Mgr: {u.profile?.manager?.email || '—'}</span>
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       </section>

// //       <section>
// //         <h2 className="text-xl font-semibold mb-3">Set Manager</h2>
// //         <form onSubmit={setManager} className="flex flex-wrap gap-2 items-end">
// //           <select className="border px-3 py-2 rounded" value={employeeId} onChange={e=>setEmployeeId(e.target.value)}>
// //             <option value="">Select employee</option>
// //             {employees.map(u => <option key={u._id} value={u._id}>{u.email}</option>)}
// //           </select>
// //           <select className="border px-3 py-2 rounded" value={managerId} onChange={e=>setManagerId(e.target.value)}>
// //             <option value="">Select manager</option>
// //             {managers.map(u => <option key={u._id} value={u._id}>{u.email} ({u.role})</option>)}
// //           </select>
// //           <button className="bg-blue-600 text-white px-4 py-2 rounded">Assign</button>
// //           {employeeId && (
// //             <span className="text-xs text-gray-600 ml-2">Current: {users.find(u => u._id === employeeId)?.profile?.manager?.email || '—'}</span>
// //           )}
// //         </form>
// //       </section>

// //       <section>
// //         <h2 className="text-xl font-semibold mb-3">Approval Flow</h2>
// //         <form onSubmit={createFlow} className="space-y-3">
// //           <input className="border px-3 py-2 rounded w-full max-w-md" placeholder="Flow name" value={flowName} onChange={e=>setFlowName(e.target.value)} />
// //           <label className="flex items-center gap-2">
// //             <input type="checkbox" checked={managerFirst} onChange={e=>setManagerFirst(e.target.checked)} /> Manager is first approver
// //           </label>
// //           <div className="flex flex-wrap gap-2 items-end">
// //             <select className="border px-3 py-2 rounded" value={specificApproverId} onChange={e=>setSpecificApproverId(e.target.value)}>
// //               <option value="">Optional: Specific approver (e.g., CFO)</option>
// //               {users.map(u => <option key={u._id} value={u._id}>{u.email}</option>)}
// //             </select>
// //             <input className="border px-3 py-2 rounded w-28" type="number" min="1" max="100" value={threshold} onChange={e=>setThreshold(e.target.value)} />
// //             <span className="text-sm text-gray-600">% approvals needed in a step</span>
// //           </div>
// //           <button className="bg-green-600 text-white px-4 py-2 rounded">Create & Activate Flow</button>
// //         </form>
// //       </section>
// //     </div>
// //   )
// // }


// import { useEffect, useMemo, useState } from 'react'
// // import api from '../lib/api' // Original import removed due to unresolved dependency issue

// // Mock API implementation to allow the component to compile and run in isolation.
// // This preserves the structure of your original API calls.
// const api = {
//     get: async (url) => {
//         console.log(`MOCK API GET: ${url}`);
//         // Mock data for /users endpoint
//         if (url === '/users') {
//             return {
//                 data: [
//                     { _id: 'u1', email: 'alice@corp.com', role: 'ADMIN', profile: { manager: null } },
//                     { _id: 'u2', email: 'bob@corp.com', role: 'MANAGER', profile: { manager: { email: 'alice@corp.com' } } },
//                     { _id: 'u3', email: 'charlie@corp.com', role: 'EMPLOYEE', profile: { manager: { email: 'bob@corp.com' } } },
//                     { _id: 'u4', email: 'diana@corp.com', role: 'EMPLOYEE', profile: { manager: { email: 'bob@corp.com' } } },
//                 ]
//             };
//         }
//         return { data: {} };
//     },
//     post: async (url, data) => {
//         console.log(`MOCK API POST: ${url}`, data);
//         // Mock data for /admin/approval-flows
//         if (url === '/admin/approval-flows') {
//             return { data: { _id: 'f1' } };
//         }
//         return { data: {} };
//     }
// };


// // Custom function to replace alert() with UI feedback
// const useNotification = () => {
//     const [message, setMessage] = useState({ text: '', type: '' });
//     const show = (text, type = 'success') => {
//         setMessage({ text, type });
//         setTimeout(() => setMessage({ text: '', type: '' }), 4000);
//     };
//     return [message, show];
// };

// export default function Admin() {
//     const [users, setUsers] = useState([])
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [role, setRole] = useState('EMPLOYEE')

//     const [employeeId, setEmployeeId] = useState('')
//     const [managerId, setManagerId] = useState('')

//     const [flowName, setFlowName] = useState('Hybrid Flow')
//     const [managerFirst, setManagerFirst] = useState(true)
//     const [specificApproverId, setSpecificApproverId] = useState('')
//     const [threshold, setThreshold] = useState(60)

//     // UI Notifications State (replacing alert())
//     const [userMessage, showUserMessage] = useNotification();
//     const [managerMessage, showManagerMessage] = useNotification();
//     const [flowMessage, showFlowMessage] = useNotification();


//     const employees = useMemo(() => users.filter(u => u.role === 'EMPLOYEE'), [users])
//     const managers = useMemo(() => users.filter(u => u.role === 'MANAGER' || u.role === 'ADMIN'), [users])
//     const specificApprovers = useMemo(() => users.filter(u => u.role === 'MANAGER' || u.role === 'ADMIN'), [users]);
    
//     // Find the currently selected employee's manager for the info badge
//     const currentEmployeeManager = useMemo(() => {
//         const user = users.find(u => u._id === employeeId);
//         return user?.profile?.manager?.email || '—';
//     }, [users, employeeId]);


//     async function loadUsers() {
//         try {
//             const res = await api.get('/users')
//             setUsers(res.data)
//         } catch (e) {
//             console.error('Failed to load users:', e)
//         }
//     }

//     useEffect(() => {
//         loadUsers()
//     }, [])

//     async function createUser(e) {
//         e.preventDefault()
//         try {
//             await api.post('/users', { email, password, role })
//             setEmail(''); setPassword(''); setRole('EMPLOYEE')
//             await loadUsers()
//             showUserMessage('User created successfully!', 'success');
//         } catch (e) {
//             console.error(e);
//             showUserMessage(e.response?.data?.error || 'Create user failed', 'error');
//         }
//     }

//     async function setManager(e) {
//         e.preventDefault()
//         try {
//             await api.post('/users/manager-relations', { employeeId, managerId })
//             await loadUsers(); // Refresh user list to show new manager
//             showManagerMessage('Manager assigned successfully!', 'success');
//         } catch (e) {
//             console.error(e);
//             showManagerMessage(e.response?.data?.error || 'Set manager failed', 'error');
//         }
//     }

//     async function createFlow(e) {
//         e.preventDefault()
//         try {
//             const steps = []
//             if (managerFirst) steps.push({ order: 1, approvers: ['MANAGER'], isManagerFirst: true })
//             if (specificApproverId) {
//                 steps.push({ order: steps.length + 1, approvers: [`USER:${specificApproverId}`], isManagerFirst: false })
//             }
//             if (steps.length === 0) steps.push({ order: 1, approvers: ['MANAGER'], isManagerFirst: true })

//             const rules = []
//             if (threshold) rules.push({ type: 'PERCENTAGE', threshold: Number(threshold), logic: 'OR' })
//             if (specificApproverId) rules.push({ type: 'SPECIFIC_APPROVER', specificApproverId, logic: 'OR' })

//             const res = await api.post('/admin/approval-flows', { name: flowName, steps, rules })
//             const id = res.data._id
//             await api.post(`/admin/approval-flows/${id}/activate`)
//             showFlowMessage('Flow created and activated!', 'success');
//         } catch (e) {
//             console.error(e);
//             showFlowMessage(e.response?.data?.error || 'Create flow failed', 'error');
//         }
//     }

//     const Notification = ({ message }) => {
//         if (!message.text) return null;
//         const baseClasses = "p-3 rounded-lg text-sm font-medium transition duration-300 mb-4 flex items-center";
//         const successClasses = "bg-green-100 text-green-800 border border-green-300";
//         const errorClasses = "bg-red-100 text-red-800 border border-red-300";
//         const icon = message.type === 'success' ? (
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
//         ) : (
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
//         );

//         return (
//             <div className={`${baseClasses} ${message.type === 'success' ? successClasses : errorClasses}`}>
//                 {icon}
//                 {message.text}
//             </div>
//         );
//     };

//     const inputBaseClasses = "w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-900 transition duration-150 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50";
//     const buttonBaseClasses = "py-3 px-6 rounded-lg font-bold shadow-md transition duration-300 transform hover:scale-[1.01] flex items-center justify-center gap-2";

//     return (
//         <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
//             <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">
//                 Admin Dashboard
//             </h1>

//             <div className="space-y-10">

//                 {/* --- USERS Section --- */}
//                 <section className="bg-white p-6 rounded-xl shadow-xl">
//                     <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3 border-b pb-4">
//                         <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m12-2a6 6 0 00-12 0m12 0h-2M7 20v-2a3 3 0 015-2.236A3 3 0 0110 18v2m-2-12h11m-11 0a2 2 0 012-2h7a2 2 0 012 2v2M9 7h6"></path></svg>
//                         User Management
//                     </h2>
                    
//                     <Notification message={userMessage} />

//                     <form onSubmit={createUser} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-8">
//                         <input className={inputBaseClasses} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
//                         <input className={inputBaseClasses} type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
//                         <select className={inputBaseClasses + " appearance-none"} value={role} onChange={e=>setRole(e.target.value)}>
//                             <option value="EMPLOYEE">EMPLOYEE</option>
//                             <option value="MANAGER">MANAGER</option>
//                         </select>
//                         <button className={`${buttonBaseClasses} bg-blue-600 text-white hover:bg-blue-700`}>
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
//                             Create User
//                         </button>
//                     </form>

//                     <h3 className="font-medium text-lg mb-3 text-gray-700">All Users ({users.length})</h3>
//                     <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
//                         <table className="min-w-full divide-y divide-gray-200">
//                             <thead className="bg-gray-100">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
//                                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
//                                     <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Manager</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {users.map((u, index) => (
//                                     <tr key={u._id} className={index % 2 === 0 ? 'bg-white hover:bg-gray-50 transition duration-150' : 'bg-gray-50 hover:bg-gray-100 transition duration-150'}>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.email}</td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : u.role === 'MANAGER' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
//                                                 {u.role}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.profile?.manager?.email || '—'}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </section>

//                 {/* --- SET MANAGER Section --- */}
//                 <section className="bg-white p-6 rounded-xl shadow-xl">
//                     <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3 border-b pb-4">
//                         <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m12-2a6 6 0 00-12 0m12 0h-2M7 20v-2a3 3 0 015-2.236A3 3 0 0110 18v2m-2-7h11m-11 0a2 2 0 012-2h7a2 2 0 012 2v2M9 7h6"></path></svg>
//                         Manager Assignments
//                     </h2>

//                     <Notification message={managerMessage} />

//                     <form onSubmit={setManager} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
//                         <select className={inputBaseClasses + " appearance-none"} value={employeeId} onChange={e=>setEmployeeId(e.target.value)} required>
//                             <option value="">Select Employee</option>
//                             {employees.map(u => <option key={u._id} value={u._id}>{u.email}</option>)}
//                         </select>
//                         <select className={inputBaseClasses + " appearance-none"} value={managerId} onChange={e=>setManagerId(e.target.value)} required>
//                             <option value="">Select Manager</option>
//                             {managers.map(u => <option key={u._id} value={u._id}>{u.email} ({u.role})</option>)}
//                         </select>
//                         <button className={`${buttonBaseClasses} bg-indigo-600 text-white hover:bg-indigo-700`}>
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
//                             Assign Manager
//                         </button>
//                     </form>
                    
//                     {/* Info Badge */}
//                     {employeeId && (
//                         <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 text-indigo-800 text-sm rounded-lg inline-block">
//                             Current Manager for selected employee: <span className="font-semibold">{currentEmployeeManager}</span>
//                         </div>
//                     )}
//                 </section>

//                 {/* --- APPROVAL FLOW Section --- */}
//                 <section className="bg-white p-6 rounded-xl shadow-xl">
//                     <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3 border-b pb-4">
//                         <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
//                         Approval Flow Configuration
//                     </h2>

//                     <Notification message={flowMessage} />

//                     <form onSubmit={createFlow} className="space-y-6 p-6 border border-gray-100 rounded-lg bg-gray-50">
                        
//                         {/* Flow Name */}
//                         <div className="relative">
//                             <label className="block text-sm font-medium text-gray-700 mb-2">Flow Name</label>
//                             <input className={inputBaseClasses} placeholder="e.g., Standard Approval Flow" value={flowName} onChange={e=>setFlowName(e.target.value)} required />
//                         </div>

//                         {/* Manager Step */}
//                         <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
//                             <input type="checkbox" id="managerFirst" checked={managerFirst} onChange={e=>setManagerFirst(e.target.checked)} className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
//                             <label htmlFor="managerFirst" className="text-base font-medium text-gray-700">Manager is first approver</label>
//                         </div>

//                         {/* Optional Steps */}
//                         <div className="space-y-4">
//                             <h3 className="font-semibold text-gray-700">Additional Rules & Steps:</h3>

//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 {/* Specific Approver */}
//                                 <div className="relative">
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">Optional Specific Approver</label>
//                                     <select className={inputBaseClasses + " appearance-none"} value={specificApproverId} onChange={e=>setSpecificApproverId(e.target.value)}>
//                                         <option value="">(None) e.g., CFO / Specific Admin</option>
//                                         {specificApprovers.map(u => <option key={u._id} value={u._id}>{u.email}</option>)}
//                                     </select>
//                                 </div>

//                                 {/* Threshold */}
//                                 <div className="relative">
//                                     <label className="block text-sm font-medium text-gray-700 mb-2">Approval Threshold</label>
//                                     <div className='flex items-center gap-2'>
//                                         <input 
//                                             className={inputBaseClasses + " w-24"} 
//                                             type="number" 
//                                             min="1" max="100" 
//                                             value={threshold} 
//                                             onChange={e=>setThreshold(e.target.value)} 
//                                         />
//                                         <span className="text-lg font-bold text-gray-600">%</span>
//                                         <span className="text-sm text-gray-500">approval percentage needed in a step</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Action Button */}
//                         <button className={`${buttonBaseClasses} bg-green-600 text-white hover:bg-green-700 w-full`}>
//                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
//                             Create & Activate Flow
//                         </button>
//                     </form>
//                 </section>
//             </div>
//         </div>
//     )
// }


import { useEffect, useMemo, useState } from 'react'
import api from '../lib/api' // Original import commented out due to environment resolution error

// Temporary, self-contained API definition to allow compilation and preview
// Replace this block with 'import api from "../lib/api"' when deploying to your full environment.

// End of temporary API definition


// Custom function to replace alert() with UI feedback
const useNotification = () => {
    const [message, setMessage] = useState({ text: '', type: '' });
    const show = (text, type = 'success') => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), 4000);
    };
    return [message, show];
};

export default function Admin() {
    const [users, setUsers] = useState([])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('EMPLOYEE')

    const [employeeId, setEmployeeId] = useState('')
    const [managerId, setManagerId] = useState('')

    const [flowName, setFlowName] = useState('Hybrid Flow')
    const [managerFirst, setManagerFirst] = useState(true)
    const [specificApproverId, setSpecificApproverId] = useState('')
    const [threshold, setThreshold] = useState(60)

    // UI Notifications State (replacing alert())
    const [userMessage, showUserMessage] = useNotification();
    const [managerMessage, showManagerMessage] = useNotification();
    const [flowMessage, showFlowMessage] = useNotification();


    const employees = useMemo(() => users.filter(u => u.role === 'EMPLOYEE'), [users])
    const managers = useMemo(() => users.filter(u => u.role === 'MANAGER' || u.role === 'ADMIN'), [users])
    const specificApprovers = useMemo(() => users.filter(u => u.role === 'MANAGER' || u.role === 'ADMIN'), [users]);
    
    // Find the currently selected employee's manager for the info badge
    const currentEmployeeManager = useMemo(() => {
        const user = users.find(u => u._id === employeeId);
        return user?.profile?.manager?.email || '—';
    }, [users, employeeId]);


    async function loadUsers() {
        try {
            const res = await api.get('/users')
            setUsers(res.data)
        } catch (e) {
            console.error('Failed to load users:', e)
        }
    }

    useEffect(() => {
        loadUsers()
    }, [])

    async function createUser(e) {
        e.preventDefault()
        try {
            await api.post('/users', { email, password, role })
            setEmail(''); setPassword(''); setRole('EMPLOYEE')
            await loadUsers()
            showUserMessage('User created successfully!', 'success');
        } catch (e) {
            console.error(e);
            showUserMessage(e.response?.data?.error || 'Create user failed', 'error');
        }
    }

    async function setManager(e) {
        e.preventDefault()
        try {
            await api.post('/users/manager-relations', { employeeId, managerId })
            await loadUsers(); // Refresh user list to show new manager
            showManagerMessage('Manager assigned successfully!', 'success');
        } catch (e) {
            console.error(e);
            showManagerMessage(e.response?.data?.error || 'Set manager failed', 'error');
        }
    }

    async function createFlow(e) {
        e.preventDefault()
        try {
            const steps = []
            if (managerFirst) steps.push({ order: 1, approvers: ['MANAGER'], isManagerFirst: true })
            if (specificApproverId) {
                steps.push({ order: steps.length + 1, approvers: [`USER:${specificApproverId}`], isManagerFirst: false })
            }
            if (steps.length === 0) steps.push({ order: 1, approvers: ['MANAGER'], isManagerFirst: true })

            const rules = []
            if (threshold) rules.push({ type: 'PERCENTAGE', threshold: Number(threshold), logic: 'OR' })
            if (specificApproverId) rules.push({ type: 'SPECIFIC_APPROVER', specificApproverId, logic: 'OR' })

            const res = await api.post('/admin/approval-flows', { name: flowName, steps, rules })
            const id = res.data._id
            await api.post(`/admin/approval-flows/${id}/activate`)
            showFlowMessage('Flow created and activated!', 'success');
        } catch (e) {
            console.error(e);
            showFlowMessage(e.response?.data?.error || 'Create flow failed', 'error');
        }
    }

    const Notification = ({ message }) => {
        if (!message.text) return null;
        const baseClasses = "p-3 rounded-lg text-sm font-medium transition duration-300 mb-4 flex items-center";
        const successClasses = "bg-green-100 text-green-800 border border-green-300";
        const errorClasses = "bg-red-100 text-red-800 border border-red-300";
        const icon = message.type === 'success' ? (
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        ) : (
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        );

        return (
            <div className={`${baseClasses} ${message.type === 'success' ? successClasses : errorClasses}`}>
                {icon}
                {message.text}
            </div>
        );
    };

    const inputBaseClasses = "w-full border border-gray-300 px-4 py-3 rounded-lg text-gray-900 transition duration-150 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50";
    const buttonBaseClasses = "py-3 px-6 rounded-lg font-bold shadow-md transition duration-300 transform hover:scale-[1.01] flex items-center justify-center gap-2";

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-4">
               Create Credential
            </h1>

            <div className="space-y-10">

                {/* --- USERS Section --- */}
                <section className="bg-white p-6 rounded-xl shadow-xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3 border-b pb-4">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m12-2a6 6 0 00-12 0m12 0h-2M7 20v-2a3 3 0 015-2.236A3 3 0 0110 18v2m-2-12h11m-11 0a2 2 0 012-2h7a2 2 0 012 2v2M9 7h6"></path></svg>
                        User Management
                    </h2>
                    
                    <Notification message={userMessage} />

                    <form onSubmit={createUser} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-8">
                        <input className={inputBaseClasses} placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
                        <input className={inputBaseClasses} type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
                        <select className={inputBaseClasses + " appearance-none"} value={role} onChange={e=>setRole(e.target.value)}>
                            <option value="EMPLOYEE">EMPLOYEE</option>
                            <option value="MANAGER">MANAGER</option>
                        </select>
                        <button className={`${buttonBaseClasses} bg-blue-600 text-white hover:bg-blue-700`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            Create User
                        </button>
                    </form>

                    <h3 className="font-medium text-lg mb-3 text-gray-700">All Users ({users.length})</h3>
                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Manager</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((u, index) => (
                                    <tr key={u._id} className={index % 2 === 0 ? 'bg-white hover:bg-gray-50 transition duration-150' : 'bg-gray-50 hover:bg-gray-100 transition duration-150'}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' : u.role === 'MANAGER' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.profile?.manager?.email || '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* --- SET MANAGER Section --- */}
                <section className="bg-white p-6 rounded-xl shadow-xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3 border-b pb-4">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m12-2a6 6 0 00-12 0m12 0h-2M7 20v-2a3 3 0 015-2.236A3 3 0 0110 18v2m-2-7h11m-11 0a2 2 0 012-2h7a2 2 0 012 2v2M9 7h6"></path></svg>
                        Manager Assignments
                    </h2>

                    <Notification message={managerMessage} />

                    <form onSubmit={setManager} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                        <select className={inputBaseClasses + " appearance-none"} value={employeeId} onChange={e=>setEmployeeId(e.target.value)} required>
                            <option value="">Select Employee</option>
                            {employees.map(u => <option key={u._id} value={u._id}>{u.email}</option>)}
                        </select>
                        <select className={inputBaseClasses + " appearance-none"} value={managerId} onChange={e=>setManagerId(e.target.value)} required>
                            <option value="">Select Manager</option>
                            {managers.map(u => <option key={u._id} value={u._id}>{u.email} ({u.role})</option>)}
                        </select>
                        <button className={`${buttonBaseClasses} bg-indigo-600 text-white hover:bg-indigo-700`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                            Assign Manager
                        </button>
                    </form>
                    
                    {/* Info Badge */}
                    {employeeId && (
                        <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 text-indigo-800 text-sm rounded-lg inline-block">
                            Current Manager for selected employee: <span className="font-semibold">{currentEmployeeManager}</span>
                        </div>
                    )}
                </section>

                {/* --- APPROVAL FLOW Section --- */}
                <section className="bg-white p-6 rounded-xl shadow-xl">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3 border-b pb-4">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        Approval Flow Configuration
                    </h2>

                    <Notification message={flowMessage} />

                    <form onSubmit={createFlow} className="space-y-6 p-6 border border-gray-100 rounded-lg bg-gray-50">
                        
                        {/* Flow Name */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Flow Name</label>
                            <input className={inputBaseClasses} placeholder="e.g., Standard Approval Flow" value={flowName} onChange={e=>setFlowName(e.target.value)} required />
                        </div>

                        {/* Manager Step */}
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                            <input type="checkbox" id="managerFirst" checked={managerFirst} onChange={e=>setManagerFirst(e.target.checked)} className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                            <label htmlFor="managerFirst" className="text-base font-medium text-gray-700">Manager is first approver</label>
                        </div>

                        {/* Optional Steps */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-700">Additional Rules & Steps:</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Specific Approver */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Optional Specific Approver</label>
                                    <select className={inputBaseClasses + " appearance-none"} value={specificApproverId} onChange={e=>setSpecificApproverId(e.target.value)}>
                                        <option value="">(None) e.g., CFO / Specific Admin</option>
                                        {specificApprovers.map(u => <option key={u._id} value={u._id}>{u.email}</option>)}
                                    </select>
                                </div>

                                {/* Threshold */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Approval Threshold</label>
                                    <div className='flex items-center gap-2'>
                                        <input 
                                            className={inputBaseClasses + " w-24"} 
                                            type="number" 
                                            min="1" max="100" 
                                            value={threshold} 
                                            onChange={e=>setThreshold(e.target.value)} 
                                        />
                                        <span className="text-lg font-bold text-gray-600">%</span>
                                        <span className="text-sm text-gray-500">approval percentage needed in a step</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <button className={`${buttonBaseClasses} bg-green-600 text-white hover:bg-green-700 w-full`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            Create & Activate Flow
                        </button>
                    </form>
                </section>
            </div>
        </div>
    )
}
