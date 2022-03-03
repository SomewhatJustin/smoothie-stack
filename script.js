const addBtn = document.getElementById("add-btn")
console.log(addBtn)
let ingredientInput = ""
let amountInput = ""
let ingredientItems = document.getElementById("ingredient-items")
let amountItems = document.getElementById("amount-items")

function getInputs() {
  ingredientInput = document.getElementById("ingredient-input").value
  amountInput = document.getElementById("amount-input").value
  console.log(`${ingredientInput}, ${amountInput}`)
}

addBtn.addEventListener("click", function () {
  getInputs()
  ingredientItems.innerHTML += `<p>${ingredientInput}<p>`
  amountItems.innerHTML += `<p>${amountInput}<p>`
})