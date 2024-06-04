// components/Expenses.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Expenses({ groupId }) {
  const [expenses, setExpenses] = useState([])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')

  const fetchExpenses = async () => {
    let { data: expenses, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('group_id', groupId)
    if (error) console.error(error)
    else setExpenses(expenses)
  }

  const addExpense = async () => {
    let { data: expense, error } = await supabase
      .from('expenses')
      .insert([{ description, amount, group_id: groupId }])
    if (error) console.error(error)
    else fetchExpenses()
  }

  useEffect(() => {
    fetchExpenses()
  }, [])

  return (
    <div>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={addExpense}>Add Expense</button>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>{expense.description}: ${expense.amount}</li>
        ))}
      </ul>
    </div>
  )
}
