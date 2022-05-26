import React from "react"

export default function ItemPair(props) {
  function generateNewInputs() {
    let itemsArray = []

    for (let i = 0; i < props.items.length; i++) {
      itemsArray.push(
        <div className="item-pair row">
          <label className="column">
            Amount
            <input
              type="text"
              name="amount"
              value={props.items[i].amount}
              onChange={(event) => props.setItems(event.target.value)}
            />
          </label>
          <label className="column">
            Ingredient
            <input
              type="text"
              name="ingredients"
              value={props.items[i].ingredient}
              onChange={(event) => props.setItems(event.target.value)}
            />
          </label>
        </div>
      )
    }
    return itemsArray
  }

  const formItems = generateNewInputs()

  return <div className="item-holder">{formItems}</div>
}
