import { useState } from 'react'
import { nanoid } from 'nanoid'

export default function useItems() {
  const [items, setItems] = useState([]) // Items (ingredient + amount) initialized as an array of objects

  function addItems() {
    let id = nanoid()
    setItems((old) => [...old, { id: id, amount: "", ingredient: "" }])
  }

  // Delete functionality
  function deleteItem(index) {
    console.log(index, items)
    setItems((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ])
  }

  return { items, setItems, addItems, deleteItem }
}