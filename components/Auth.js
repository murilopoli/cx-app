// components/Auth.js
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signUp = async () => {
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) console.error(error)
  }

  const signIn = async () => {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    })
    if (error) console.error(error)
  }

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={signUp}>Sign Up</button>
      <button onClick={signIn}>Sign In</button>
    </div>
  )
}