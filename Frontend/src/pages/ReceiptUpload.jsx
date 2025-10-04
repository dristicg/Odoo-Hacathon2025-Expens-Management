// import { useEffect, useState } from 'react'
// import api from '../lib/api'

// export default function ReceiptUpload() {
//   const [file, setFile] = useState(null)
//   const [draft, setDraft] = useState(null)
//   const [msg, setMsg] = useState('')

//   async function upload() {
//     setMsg('')
//     try {
//       const form = new FormData()
//       form.append('file', file)
//       const res = await api.post('/ocr/receipts', form, { headers: { 'Content-Type': 'multipart/form-data' } })
//       // Add a data URL for preview
//       const reader = new FileReader()
//       reader.onload = () => setDraft({ ...res.data, dataUrl: reader.result })
//       reader.readAsDataURL(file)
//     } catch (e) {
//       setMsg(e.response?.data?.error || 'OCR failed (ensure OCR_ENABLED=true on server)')
//     }
//   }

//   async function createExpense() {
//     if (!draft) return
//     try {
//       const currency = 'USD' // pick default; user can edit below if needed
//       const amount = Number((draft.amount || '').replace(',', '.')) || 0
//       const date = (draft.date && !isNaN(Date.parse(draft.date))) ? new Date(draft.date).toISOString().slice(0,10) : new Date().toISOString().slice(0,10)
//       await api.post('/expenses', {
//         amount,
//         currency,
//         category: 'OTHER',
//         description: draft.description || draft.merchant || 'Receipt',
//         date,
//         lines: [],
//         receipts: draft.dataUrl ? [{ url: draft.dataUrl, ocrText: draft.text || '' }] : []
//       })
//       setMsg('Expense created from OCR')
//     } catch (e) {
//       setMsg(e.response?.data?.error || 'Create expense failed')
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto mt-8 bg-white p-4 rounded border">
//       <h1 className="text-xl font-semibold mb-3">Receipt OCR</h1>
//       {msg && <p className="text-sm mb-2">{msg}</p>}
//       <input type="file" onChange={e=>setFile(e.target.files?.[0] || null)} />
//       <button disabled={!file} onClick={upload} className="ml-2 bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50">Upload & Parse</button>

//       {draft && (
//         <div className="mt-4 text-sm">
//           {draft.dataUrl && (
//             <img src={draft.dataUrl} alt="receipt-preview" className="w-full h-auto border rounded mb-3" />
//           )}
//           <div><span className="font-medium">Merchant:</span> {draft.merchant}</div>
//           <div><span className="font-medium">Amount:</span> {draft.amount}</div>
//           <div><span className="font-medium">Date:</span> {draft.date}</div>
//           <button onClick={createExpense} className="mt-3 bg-green-600 text-white px-3 py-1 rounded">Create Expense</button>
//         </div>
//       )}
//     </div>
//   )
// }


import { useEffect, useState, useRef, useCallback } from 'react'
import api from '../lib/api' // RESTORE THIS LINE IN YOUR PROJECT

// --- TEMPORARY MOCKS START (Remove this block when integrating) ---
// // Mock API to prevent compilation failure due to external import '../lib/api'
// const MOCK_OCR_RESULT = {
//     merchant: 'Coffee Corner Inc.',
//     amount: '12.50',
//     date: '2025-10-04',
//     text: 'A lot of OCR data...'
// };

// const api = {
//     post: async (url, data, config) => {
//         console.log(`MOCK API POST: ${url}`);
//         if (url.includes('/ocr/receipts')) {
//             // Simulate delay and return OCR data
//             await new Promise(resolve => setTimeout(resolve, 800));
//             return { data: MOCK_OCR_RESULT };
//         }
//         if (url.includes('/expenses')) {
//             // Simulate expense creation success
//             await new Promise(resolve => setTimeout(resolve, 300));
//             return { data: { success: true } };
//         }
//         return { data: {} };
//     },
// };
// // --- TEMPORARY MOCKS END ---

// Utility Component: Alert Box
const AlertBox = ({ type, message, onClose }) => {
    let colorClasses = '';
    if (!message) return null;

    if (type === 'error') {
        colorClasses = 'bg-red-100 border-red-400 text-red-700';
    } else if (type === 'success') {
        colorClasses = 'bg-green-100 border-green-400 text-green-700';
    } else {
        colorClasses = 'bg-blue-100 border-blue-400 text-blue-700';
    }

    return (
        <div className={`p-3 border rounded-lg flex justify-between items-center ${colorClasses} shadow-sm mb-4`}>
            <p className="text-sm font-medium">{message}</p>
            {onClose && (
                <button onClick={onClose} className="text-sm font-bold opacity-75 hover:opacity-100 ml-4">
                    &times;
                </button>
            )}
        </div>
    );
};


export default function ReceiptUpload() {
    const [file, setFile] = useState(null)
    const [draft, setDraft] = useState(null)
    const [msg, setMsg] = useState('')
    const [msgType, setMsgType] = useState('info')
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef(null);

    const handleFileChange = (selectedFile) => {
        if (selectedFile) {
            setFile(selectedFile);
            setMsg(`File selected: ${selectedFile.name}`);
            setMsgType('info');
        } else {
            setFile(null);
            setMsg('');
        }
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
        }
        e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
    }, []);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.add('border-blue-500', 'bg-blue-50');
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
    }, []);


    async function upload() {
        if (!file) return;

        setLoading(true);
        setMsg('Uploading and parsing receipt...');
        setMsgType('info');
        setDraft(null);

        try {
            const form = new FormData();
            form.append('file', file);
            // NOTE: The mock API ignores the form data and returns MOCK_OCR_RESULT
            const res = await api.post('/ocr/receipts', form, { headers: { 'Content-Type': 'multipart/form-data' } });
            
            // Add a data URL for preview
            const reader = new FileReader();
            reader.onload = () => {
                setDraft({ ...res.data, dataUrl: reader.result });
                setMsg('OCR successful! Review details and create expense.');
                setMsgType('success');
                setLoading(false);
            };
            reader.readAsDataURL(file);

        } catch (e) {
            setMsg(e.response?.data?.error || 'OCR failed (Check server logs)');
            setMsgType('error');
            setLoading(false);
        }
    }

    async function createExpense() {
        if (!draft) return;
        setLoading(true);
        setMsg('Creating expense...');
        setMsgType('info');

        try {
            const currency = 'USD';
            const amount = Number((draft.amount || '').replace(/[^0-9.-]+/g,"")) || 0;
            const date = (draft.date && !isNaN(Date.parse(draft.date))) ? new Date(draft.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
            
            // Prepare receipts payload
            const receiptsPayload = draft.dataUrl ? [{ url: draft.dataUrl, ocrText: draft.text || '' }] : [];

          await api.post('/expenses', {
    amount,        // numeric
    currency,      // string
    category: 'OTHER',
    description: draft.merchant || 'Expense from Receipt OCR',
    date,
    lines: [],
    receipts: receiptsPayload
})


            setMsg('Expense created successfully from OCR!');
            setMsgType('success');
            setDraft(null);
            setFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Clear file input
            }

        } catch (e) {
            setMsg(e.response?.data?.error || 'Failed to create expense.');
            setMsgType('error');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-2xl space-y-6">
                
                <h1 className="text-3xl font-extrabold text-gray-900 pb-3 border-b border-blue-500/50">
                    Receipt <span className="text-blue-600">OCR</span> & Upload
                </h1>
                
                <AlertBox type={msgType} message={msg} onClose={() => setMsg('')} />

                {/* File Upload Zone */}
                <div 
                    className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center transition duration-200 cursor-pointer hover:border-blue-500 hover:bg-blue-50"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*,application/pdf"
                        onChange={e => handleFileChange(e.target.files?.[0] || null)} 
                        className="hidden"
                    />
                    <svg className="w-8 h-8 mx-auto mb-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 014 4v2m-5 4H9m0 0l-3-3m3 3l3-3"></path></svg>
                    <p className="text-sm text-gray-600">
                        {file ? <span className="font-semibold text-gray-800">{file.name}</span> : 'Drag & drop a receipt image or click to select file'}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">PNG, JPG, or PDF up to 5MB</p>
                </div>

                {/* Action Button */}
                <div className="flex justify-end">
                    <button 
                        disabled={!file || loading} 
                        onClick={upload} 
                        className={`bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition duration-200 shadow-md ${!file || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700 hover:shadow-lg'}`}
                    >
                        {loading && !draft ? 'Parsing...' : 'Upload & Parse'}
                    </button>
                </div>

                {/* OCR Draft Preview */}
                {draft && (
                    <div className="mt-6 p-5 bg-gray-50 border border-gray-200 rounded-xl shadow-inner space-y-4">
                        <h2 className="text-xl font-bold text-gray-800 border-b pb-2 mb-3">OCR Result Review</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Receipt Image Preview */}
                            {draft.dataUrl && (
                                <div className="md:col-span-1">
                                    <img 
                                        src={draft.dataUrl} 
                                        alt="receipt-preview" 
                                        className="w-full h-auto border border-gray-300 rounded-lg shadow-lg" 
                                        style={{ maxHeight: '300px', objectFit: 'contain' }}
                                    />
                                </div>
                            )}

                            {/* OCR Details */}
                            <div className="space-y-3 md:col-span-1">
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-200 text-blue-800">Merchant</span>
                                    <span className="font-semibold text-gray-700">{draft.merchant || 'N/A'}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-200 text-blue-800">Amount</span>
                                    <span className="font-bold text-lg text-green-700">{draft.amount || '0.00'}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-200 text-blue-800">Date</span>
                                    <span className="text-gray-700">{draft.date || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                        
                        {/* Create Expense Button */}
                        <div className="pt-4 border-t border-gray-200 flex justify-end">
                            <button 
                                onClick={createExpense} 
                                disabled={loading}
                                className={`bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition duration-200 shadow-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
                            >
                                {loading ? 'Saving...' : 'Create Expense'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
