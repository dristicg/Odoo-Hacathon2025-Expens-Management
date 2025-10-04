import api from '../lib/api'
import { useEffect, useState } from 'react'

export default function TeamExpenses() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState(null)

  async function load() {
    const res = await api.get('/expenses/team')
    setItems(res.data)
  }

  useEffect(() => { load() }, [])

  async function openDetails(id) {
    const res = await api.get(`/expenses/${id}`)
    setSelected(res.data)
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Team Expenses</h1>
      <ul className="space-y-2">
        {items.map((e) => (
          <li key={e._id} className="border p-3 rounded bg-white flex items-center justify-between">
            <div>
              <div className="font-medium">{e.category} • {e.amountOriginal} {e.currencyOriginal} → {e.amountCompany} {e.currencyCompany}</div>
              <div className="text-xs text-gray-600">{new Date(e.date).toLocaleDateString()} • Status: {e.status}</div>
            </div>
            <button onClick={() => openDetails(e._id)} className="text-sm px-3 py-1 rounded border">Details</button>
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
          <div className="text-xs text-gray-600">By {selected.expense.employee.email} on {new Date(selected.expense.date).toLocaleDateString()}</div>

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
