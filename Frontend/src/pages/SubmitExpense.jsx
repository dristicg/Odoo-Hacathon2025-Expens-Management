// import { useState } from 'react'
// import api from '../lib/api'

// export default function SubmitExpense() {
//   const [amount, setAmount] = useState('')
//   const [currency, setCurrency] = useState('INR')
//   const [category, setCategory] = useState('MEAL')
//   const [description, setDescription] = useState('')
//   const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
//   const [message, setMessage] = useState('')

//   async function submit(e) {
//     e.preventDefault()
//     setMessage('')
//     try {
//       const res = await api.post('/expenses', {
//         amount: Number(amount),
//         currency,
//         category,
//         description,
//         date,
//         lines: []
//       })
//       setMessage('Expense submitted!')
//     } catch (e) {
//       setMessage(e.response?.data?.error || 'Submit failed')
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
//       <h1 className="text-xl font-semibold mb-4">Submit Expense</h1>
//       {message && <p className="text-sm mb-2">{message}</p>}
//       <form onSubmit={submit} className="space-y-3">
//         <input className="w-full border px-3 py-2 rounded" placeholder="Amount" value={amount} onChange={e=>setAmount(e.target.value)} />
//         <input className="w-full border px-3 py-2 rounded" placeholder="Currency (e.g. INR, USD)" value={currency} onChange={e=>setCurrency(e.target.value)} />
//         <input className="w-full border px-3 py-2 rounded" placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
//         <input className="w-full border px-3 py-2 rounded" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
//         <input className="w-full border px-3 py-2 rounded" type="date" value={date} onChange={e=>setDate(e.target.value)} />
//         <button className="w-full bg-blue-600 text-white py-2 rounded">Submit</button>
//       </form>
//     </div>
//   )
// }


// NOTE: The external import 'api' is mocked here to prevent compilation errors
// in this environment. When you integrate this into your project, delete the 
// 'TEMPORARY MOCKS' section and uncomment the actual import below.
import { useState } from 'react'
import api from '../lib/api' // <-- Uncomment this line in your project

// // --- TEMPORARY MOCKS START ---
// const api = {
//   post: async (url, data) => {
//     console.log(`MOCK API POST to ${url}`, data);
//     await new Promise(resolve => setTimeout(resolve, 500));
//     if (Math.random() > 0.1) {
//       return { data: { success: true } };
//     } else {
//       return Promise.reject({ response: { data: { error: 'Mock submission failed due to network timeout.' } } });
//     }
//   }
// };
// // --- TEMPORARY MOCKS END ---

export default function SubmitExpense() {
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('INR')
  const [category, setCategory] = useState('MEAL')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isFormValid = amount && currency && category && description && date;

  async function submit(e) {
    e.preventDefault()
    if (!isFormValid || isSubmitting) return;

    setMessage('')
    setIsSubmitting(true)

    try {
      await api.post('/expenses', {
        amount: Number(amount),
        currency,
        category,
        description,
        date,
        lines: []
      })
      setMessage('Expense submitted successfully!')
      // Reset form fields after successful submission
      setAmount('')
      setCurrency('INR')
      setCategory('MEAL')
      setDescription('')
      setDate(new Date().toISOString().slice(0, 10))
    } catch (e) {
      const errorMsg = e.response?.data?.error || 'Submit failed. Please try again.'
      setMessage(errorMsg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getMessageStyle = () => {
    if (message.includes('successfully')) {
      return "bg-green-100 border-green-400 text-green-700";
    } else if (message.includes('failed')) {
      return "bg-red-100 border-red-400 text-red-700";
    }
    return "bg-blue-100 border-blue-400 text-blue-700";
  };

  const inputClasses = "w-full border border-gray-300 px-4 py-2 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-2xl">
        
        <h1 className="text-3xl font-extrabold mb-6 text-gray-800 border-b-2 border-blue-500 pb-2">
          Submit New Expense
        </h1>

        {/* Message Alert Box */}
        {message && (
          <div className={`p-3 mb-4 border-l-4 rounded-lg ${getMessageStyle()} shadow-md transition-all`}>
            <p className="font-medium text-sm">{message}</p>
          </div>
        )}

        <form onSubmit={submit} className="space-y-6">
          
          {/* Amount and Currency */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
              <input
                id="amount"
                className={inputClasses}
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <input
                id="currency"
                className={inputClasses.replace('focus:ring-blue-500', 'focus:ring-indigo-500')}
                placeholder="e.g. INR, USD"
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              id="category"
              className={inputClasses}
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
            >
              <option value="MEAL">Meal</option>
              <option value="TRAVEL">Travel</option>
              <option value="ACCOMMODATION">Accommodation</option>
              <option value="OFFICE_SUPPLIES">Office Supplies</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              id="date"
              className={inputClasses}
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              className={`${inputClasses} resize-none h-24`}
              placeholder="What was the expense for?"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-3 rounded-lg text-lg font-bold transition duration-300 shadow-md ${
              isFormValid && !isSubmitting
                ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                : 'bg-gray-400 text-gray-700 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
                <svg className="animate-spin h-5 w-5 mr-3 inline text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : 'Submit Expense'}
          </button>
        </form>
      </div>
    </div>
  )
}
