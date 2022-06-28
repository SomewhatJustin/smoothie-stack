import React from "react"
import { nanoid } from "nanoid"

export default function ItemPair(props) {
  // On form change, edit the right item in the array of objects
  function handleChange(event, myIndex) {
    props.setItems((prev) => [
      ...prev.slice(0, myIndex),
      { ...prev[myIndex], [event.target.name]: event.target.value },
      ...prev.slice(myIndex + 1),
    ])
  }

  // Use ID to determine which index we're at in the Items state array
  function findMyIndex() {
    return props.items.findIndex((item) => item.id === props.id)
  }

  const myIndex = findMyIndex()

  // Render either inputs/labels OR a recipe-style list
  let itemPair = []

  // Make the delete btn transparent if there isn't data on that line
  let deleteClass =
    props.items[myIndex].ingredient || props.items[myIndex].amount
      ? "delete-btn"
      : "delete-btn transparent"

  if (!props.isShared) {
    itemPair.push(
      <div className="item-pair row" key={props.items[myIndex].id}>
        <label className={"column"}>
          {myIndex === 0 ? "Amount" : ""}
          <input
            type="text"
            name="amount"
            placeholder="1/2 cups"
            value={props.items[myIndex].amount}
            onChange={(event) => handleChange(event, myIndex)}
          />
        </label>
        <label className="column">
          {myIndex === 0 ? "Ingredient" : ""}
          <input
            type="text"
            name="ingredient"
            placeholder="Frozen bananas"
            value={props.items[myIndex].ingredient}
            onChange={(event) => handleChange(event, myIndex)}
          />
        </label>
        <button
          className={deleteClass}
          type="button"
          onClick={() => props.deleteItem(myIndex)}
        >
          <i className="fa-solid fa-circle-xmark"></i>
        </button>
      </div>
    )
  } else {
    itemPair.push(
      <li key={nanoid()}>
        {props.items[myIndex].amount} of {props.items[myIndex].ingredient}
      </li>
    )
  }

  return <div className="item-holder">{itemPair}</div>
}
