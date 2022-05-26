import React from "react"
import ItemPair from "./ItemPair"
import { nanoid } from "nanoid"

export default function Form() {
  // STATE
  const [items, setItems] = React.useState([{}]) // Items (ingredient + amount) initialized as an array of objects

  return (
    <form className="column">
      <ItemPair items={items} setItems={setItems} key={nanoid()} />
      <button type="button" id="add-btn">
        Add
      </button>
      <label>Notes</label>
      <textarea></textarea>
      <button>Share</button>
    </form>
  )
}
