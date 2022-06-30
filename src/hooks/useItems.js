import { useState } from 'react'


export default function useItems() {
  const [items, setItems] = useState([]) // Items (ingredient + amount) initialized as an array of objects

  return { items, setItems }
}