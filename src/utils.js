const api = 'https://smoothie-stack-server.herokuapp.com/api'

async function getRecipe(id) {
  const response = await fetch(api + `/getOne/${id}`)
  const data = await response.json()
  console.log(data[0].recipe)
  return data[0].recipe
}

async function getFeaturedRecipes() {
  const response = await fetch(api + `/featured`)
  return response.json()
}


async function sendToDB(sharedObject, shortPath) {
  const send = await fetch(api + '/post', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      isFeatured: false,
      path: shortPath,
      recipe: {
        ingredients: sharedObject.ingredients,
        amount: sharedObject.amount,
        notes: sharedObject.notes
      }
    })
  })
}

// recipe: sharedObject


export { getRecipe, getFeaturedRecipes, sendToDB }
