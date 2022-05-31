import "./App.css"
import Form from "./Form"
import Footer from "./Footer"
import { nanoid } from "nanoid"
import React from "react"

function App() {
  // STATE
  const [inEditMode, setInEditMode] = React.useState(true)
  const [items, setItems] = React.useState([]) // Items (ingredient + amount) initialized as an array of objects
  const [notes, setNotes] = React.useState("")
  const [isShared, setIsShared] = React.useState(false)
  const [shareBtnClicked, setShareBtnClicked] = React.useState(false)

  function startOver() {
    setShareBtnClicked(false)
    setInEditMode(true)
    setItems([])
    setNotes("")
    setIsShared(false)
    window.history.replaceState(null, "", "/")
  }

  function editRecipe() {
    setIsShared(false)
    setInEditMode(true)
    setShareBtnClicked(false)
  }

  // set up first blank item
  if (items.length === 0) {
    addItems()
  }

  // Event listener for "Add" button
  function addItems() {
    let id = nanoid()
    setItems((old) => [...old, { id: id, amount: "", ingredient: "" }])
  }

  React.useEffect(() => {
    if (
      items[items.length - 1].amount &&
      items[items.length - 1].ingredient &&
      inEditMode
    ) {
      addItems()
    }
  }, [items, inEditMode])

  return (
    <div className="App column">
      <h1>My Smoothie Stack</h1>
      <h2>Build your recipe and share it with a link.</h2>
      <Form
        inEditMode={inEditMode}
        setInEditMode={setInEditMode}
        items={items}
        setItems={setItems}
        notes={notes}
        setNotes={setNotes}
        isShared={isShared}
        setIsShared={setIsShared}
        addItems={addItems}
        shareBtnClicked={shareBtnClicked}
        setShareBtnClicked={setShareBtnClicked}
      />
      <div className="edit-start-zone">
        {!inEditMode && (
          <button onClick={startOver}>
            <i className="fa-solid fa-rotate"></i> Start new recipe
          </button>
        )}
        {!inEditMode && (
          <button onClick={editRecipe}>
            <i className="fa-solid fa-pen-to-square"></i> Edit this recipe
          </button>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default App
