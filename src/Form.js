import React from "react"
import ItemPair from "./ItemPair"
import { nanoid } from "nanoid"
import utf8 from "utf8"

export default function Form() {
  // STATE
  const [items, setItems] = React.useState([]) // Items (ingredient + amount) initialized as an array of objects
  const [notes, setNotes] = React.useState("")
  const [isShared, setIsShared] = React.useState(false)

  // On first load, check URL to see if someone shared this link with me. If so, set the state.
  React.useEffect(() => {
    if (window.location.href.includes("share")) {
      let url64 = window.location.href.split("=")[1]
      // console.log(`after part of URL: ${url64}`)
      const sharedObject = JSON.parse(utf8.decode(atob(url64)))
      console.log(sharedObject)

      let itemsArray = []
      for (let i = 0; i < sharedObject.ingredients.length; i++) {
        itemsArray.push({
          id: nanoid(),
          ingredient: sharedObject.ingredients[i],
          amount: sharedObject.amount[i],
        })
      }

      setItems(itemsArray)
      setNotes(sharedObject.notes)
    }
  }, [])

  // Event listener for "Add" button
  function addItems() {
    const id = nanoid()
    setItems((old) => [...old, { id: id, amount: "", ingredient: "" }])
  }

  // set up first blank item
  if (items.length === 0) {
    addItems()
  }

  // Create new item inputs when needed
  function generateItemPairs() {
    let itemPairArr = []
    for (let i = 0; i < items.length; i++) {
      // const id = nanoid()
      const itemPairEl = (
        <ItemPair
          items={items}
          setItems={setItems}
          key={items[i].id}
          id={items[i].id}
        />
      )
      itemPairArr.push(itemPairEl)
    }
    return itemPairArr
  }

  const itemPairElements = generateItemPairs()
  // const itemPairElements = <h2>nothing</h2>

  // Event listener for "Share" button
  function share(event) {
    event.preventDefault()
    // console.log(items, notes)

    // Combine into one big ol' object
    const sharedObject = {
      ingredients: [...items.map((item) => item.ingredient)],
      amount: [...items.map((item) => item.amount)],
      notes: notes,
    }
    console.log(sharedObject)
    let base64 = btoa(utf8.encode(JSON.stringify(sharedObject)))

    window.history.replaceState(null, "", `?share=${base64}`)

    let clipboardURL = window.location.href
    navigator.clipboard.writeText(clipboardURL)

    setIsShared(true)
  }

  return (
    <form className="column">
      {itemPairElements}
      <button type="button" id="add-btn" onClick={addItems}>
        Add
      </button>
      <label>Notes</label>
      <textarea
        value={notes}
        name="notes"
        onChange={(event) => setNotes(event.target.value)}
      ></textarea>
      <button onClick={(event) => share(event)}>Share</button>
      {isShared && <p>Copied to clipboard!</p>}
    </form>
  )
}
