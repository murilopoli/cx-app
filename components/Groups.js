// components/Groups.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Groups() {
  const [groups, setGroups] = useState([])
  const [name, setName] = useState('')

  const fetchGroups = async () => {
    let { data: groups, error } = await supabase
      .from('groups')
      .select('*')
    if (error) console.error(error)
    else setGroups(groups)
  }

  const addGroup = async () => {
    let { data: group, error } = await supabase
      .from('groups')
      .insert([{ name }])
    if (error) console.error(error)
    else fetchGroups()
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Group Name"
      />
      <button onClick={addGroup}>Add Group</button>
      <ul>
        {groups.map(group => (
          <li key={group.id}>{group.name}</li>
        ))}
      </ul>
    </div>
  )
}
