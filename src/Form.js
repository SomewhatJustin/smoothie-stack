import React from "react"
import ItemPair from "./ItemPair"
import { nanoid } from "nanoid"
import utf8 from "utf8"

import { createClient } from '@supabase/supabase-js'


export default function Form(props) {
  const supabaseUrl = 'https://elwrnresrviksptoeoes.supabase.co'
  const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)
  // On first load, check URL to see if someone shared this link with me. If so, set the state equal to that recipe.
  React.useEffect(() => {
    if (window.location.href.includes("share")) {
      let url64 = window.location.href.split("=")[1]

      const sharedObject = JSON.parse(utf8.decode(atob(url64)))
      console.log(sharedObject)

      let itemsArray = []
      for (let i = 0; i < sharedObject.ingredients.length; i++) {
        // Don't add blanks!
        if (sharedObject.ingredients[i] || sharedObject.amount[i]) {
          itemsArray.push({
            id: nanoid(),
            ingredient: sharedObject.ingredients[i],
            amount: sharedObject.amount[i],
          })
        }
      }

      props.setInEditMode(false)
      props.setIsShared(true)
      props.setItems(itemsArray)
      props.setNotes(sharedObject.notes)
    }
  }, [])

  React.useEffect(() => {
    async function testingThisOut() {
      const { data, error } = await supabase
        .from('Recipes')
        .insert([
          { recipe: 'someValue', path: 'otherValue' },
        ])
    }
    testingThisOut()

  }, [props.isShared])



  // Delete functionality
  function deleteItem(index) {
    props.setItems((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ])
    console.log("deleted")
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
          inEditMode={props.inEditMode}
          setInEditMode={props.setInEditMode}
          deleteItem={deleteItem}
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

    props.setShareBtnClicked(true)

    // Remove blanks!
    removeBlanks()

    // Combine into one big ol' object
    const sharedObject = {
      ingredients: [...props.items.map((item) => item.ingredient)],
      amount: [...props.items.map((item) => item.amount)],
      notes: props.notes
    }

    // Convert to base64. Take care of character escaping.
    let base64 = btoa(utf8.encode(JSON.stringify(sharedObject)))

    // Write to URL
    window.history.replaceState(null, "", `?share=${base64}`)

    navigator.clipboard.writeText(window.location.href)


    props.setIsShared(true)
    props.setInEditMode(false)
  }

  // Convert notes if not in edit mode
  let notesSection

  if (props.inEditMode) {
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


  return (
    <form className="column">
      {props.isShared && <label className="share-mode">Ingredients</label>}
      {itemPairElements}
      {props.inEditMode ? (
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
      {props.shareBtnClicked && (
        <p className="copied">
          <i className="fa-solid fa-circle-check"></i> Copied to clipboard!
        </p>
      )}
    </form>
  )
}
