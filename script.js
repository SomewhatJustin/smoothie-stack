const addBtn = document.getElementById("add-btn")
const shareBtn = document.getElementById("share-btn")
let ingredientInput = ""
let amountInput = ""
let ingredientItems = document.getElementById("ingredient-items")
let amountItems = document.getElementById("amount-items")
let ingredientList = []
let amountList = []


function checkURL() {
  if (window.location.href.includes("share")) {
    let splitURL = (window.location.href.split('='))
    let urlItems = (decodeURIComponent(splitURL[1]).split(","))
    console.log(urlItems)

    for (let i = 0; i < urlItems.length / 2; i++) {
      ingredientItems.innerHTML += `<p>${urlItems[i]}</p`
    }

    for (let j = 0 + urlItems.length / 2; j < urlItems.length; j++) {
      amountItems.innerHTML += `<p>${urlItems[j]}</p`
    }
  }
}

checkURL()

function getInputs() {
  ingredientInput = document.getElementById("ingredient-input").value
  amountInput = document.getElementById("amount-input").value
  ingredientList.push(ingredientInput)
  amountList.push(amountInput)
  document.getElementById("ingredient-input").value = ""
  document.getElementById("amount-input").value = ""
  return [ingredientInput, amountInput]
}

addBtn.addEventListener("click", function () {
  let newItems = getInputs()
  ingredientItems.innerHTML += `<p class="ingredient">${newItems[0]}</p>`
  amountItems.innerHTML += `<p class="amount">${newItems[1]}</p>`
})

shareBtn.addEventListener("click", function () {
  let fullList = encodeURIComponent(ingredientList.concat(amountList))
  window.history.replaceState(null, "", `?share=${fullList}`)
  // console.log(decodeURIComponent(fullList))
  // navigator.clipboard.writeText(window.location.href);

  let clipboardURL = window.location.href
  navigator.clipboard.writeText(clipboardURL)

  document.getElementById("success-text").style.visibility = "visible"
})

