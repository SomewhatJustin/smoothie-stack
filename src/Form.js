import React from "react"
import ItemPair from "./ItemPair"
import { nanoid } from "nanoid"
import { getRecipe, sendToDB } from './utils'

export default function Form(props) {
  const [recipeID, setRecipeID] = React.useState("")
  const [isVisiting, setIsVisiting] = React.useState(false)

  // On first load, check URL to see if someone shared this link with me. If so, set the state equal to that recipe.
  React.useEffect(() => {
    if (window.location.href.includes("/s/")) {
      setIsVisiting(true)
      const urlID = window.location.href.split("/s/")[1]

      setRecipeID(urlID)

      getRecipe(urlID).then(result => {
        let itemsArray = []

        for (let i = 0; i < result.ingredients.length; i++) {
          itemsArray.push(
            {
              id: nanoid(),
              ingredient: result.ingredients[i],
              amount: result.amount[i]
            }
          )
        }
        props.setItems(itemsArray)
        props.setNotes(result.notes)
      })
      props.setIsShared(true)
    }
  }, [])

  // Delete functionality
  function deleteItem(index) {
    props.setItems((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ])
  }

  // Remove any blanks
  function removeBlanks() {
    for (let i = 0; i < props.items.length; i++) {
      if (!props.items[i].ingredient && !props.items[i].amount) {
        deleteItem(i)
      }
    }
  }

  // Create new item inputs when needed
  let itemPairElements = generateItemPairs()

  function generateItemPairs() {
    let itemPairArr = []
    for (let i = 0; i < props.items.length; i++) {
      const itemPairEl = (
        <ItemPair
          items={props.items}
          setItems={props.setItems}
          key={props.items[i].id} // id is set with function addItems() in ./App
          id={props.items[i].id}
          deleteItem={deleteItem}
          isShared={props.isShared}
        />
      )
      itemPairArr.push(itemPairEl)
    }
    return itemPairArr
  }

  // In share mode, display an unordered list
  if (props.isShared) {
    itemPairElements = <ul className="share-mode">{itemPairElements}</ul>
  }

  // Event listener for "Share" button
  function share(event) {
    event.preventDefault()
    // Do nothing if no items have been added
    if (!props.items[0].ingredient && !props.items[0].amount) {
      return
    }

    // Remove blanks!
    removeBlanks() // TODO: This may be removed??

    // Set an ID, which we'll use as the short URL
    const shortPath = nanoid(6)
    setRecipeID(shortPath)

    // Write to URL
    window.history.replaceState(null, "", `/s/${shortPath}`)
    navigator.clipboard.writeText(window.location.href)

    // Combine into one big ol' object
    const sharedObject = {
      ingredients: [...props.items.map((item) => item.ingredient).filter(item => item !== "")],
      amount: [...props.items.map((item) => item.amount).filter(item => item !== "")],
      notes: props.notes
    }

    sendToDB(sharedObject, shortPath)

    props.setIsShared(true)
  }

  // Convert notes if not in edit mode
  let notesSection

  if (!props.isShared) {
    notesSection = (
      <textarea
        value={props.notes}
        name="notes"
        onChange={(event) => props.setNotes(event.target.value)}
      ></textarea>
    )
  } else {
    notesSection = (
      <p className={props.isShared && "share-mode"}>{props.notes}</p>
    )
  }

  const copiedBanner = (
    <p className="copied">
      <i className="fa-solid fa-circle-check"></i> Copied to clipboard!
    </p>)


  return (
    <form className="column card">
      {props.isShared && <label className="share-mode">Ingredients</label>}
      {itemPairElements}
      {!props.isShared ? (
        <label id="notes-label">Notes</label>
      ) : props.notes === "" ? (
        ""
      ) : (
        <label
          className={props.isShared ? "share-mode notes-label" : "notes-label"}
        >
          Notes
        </label>
      )}
      {notesSection}

      <button onClick={(event) => share(event)} id="share-btn">
        Share <i className="fa-solid fa-share"></i>
      </button>
      {(props.isShared && !isVisiting) && copiedBanner}
    </form>
  )
}
