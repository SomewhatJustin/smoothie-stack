import "./App.css"
import Form from "./Form"
import Footer from "./Footer"
import Navbar from "./Navbar"
import React from "react"
import useItems from './hooks/useItems'

function App() {
  // STATE

  const { items, setItems, addItems, deleteItem } = useItems()
  const [notes, setNotes] = React.useState("")
  const [isShared, setIsShared] = React.useState(false)

  function startOver() {
    setItems([])
    setNotes("")
    setIsShared(false)
    window.history.replaceState(null, "", "/")
  }

  function editRecipe() {
    setIsShared(false)
  }

  // set up first blank item
  if (items.length === 0) {
    addItems()
  }

  // Add new items as I input new data
  React.useEffect(() => {
    if (
      items[items.length - 1].amount &&
      items[items.length - 1].ingredient &&
      !isShared
    ) {
      addItems()
    }
  }, [items, isShared, addItems])

  return (
    <div className="App column">
      <Navbar startOver={startOver} />
      <h1>My Smoothie Stack</h1>
      <h2>Build your recipe and share it with a link.</h2>
      <Form
        items={items}
        setItems={setItems}
        notes={notes}
        setNotes={setNotes}
        isShared={isShared}
        setIsShared={setIsShared}
        addItems={addItems}
        deleteItem={deleteItem}
      />
      <div className="edit-start-zone">
        {isShared && (
          <button onClick={startOver}>
            <i className="fa-solid fa-rotate"></i> Start new recipe
          </button>
        )}
        {isShared && (
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
