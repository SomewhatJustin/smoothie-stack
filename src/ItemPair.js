import React from "react"

export default function ItemPair(props) {
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

  return (
    <div className="item-holder">
      <div className="item-pair row">
        <label className={"column"}>
          {myIndex === 0 ? "Amount" : ""}
          <input
            type="text"
            name="amount"
            value={props.items[myIndex].amount}
            onChange={(event) => handleChange(event, myIndex)}
          />
        </label>
        <label className="column">
          {myIndex === 0 ? "Ingredient" : ""}
          <input
            type="text"
            name="ingredient"
            value={props.items[myIndex].ingredient}
            onChange={(event) => handleChange(event, myIndex)}
          />
        </label>
      </div>
    </div>
  )
}
