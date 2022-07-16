const api = 'https://smoothie-stack-server.herokuapp.com/api'

async function getRecipe(id) {
  const response = await fetch(api + `/getOne/${id}`)
  return response.json()
}

async function getFeaturedRecipes() {
  const response = await fetch(api + `/featured`)
  return response.json()
}


async function sendToDB(sharedObject, shortPath) {
  const send = await fetch(api + '/post', {
    method: 'POST',
    body: JSON.stringify({
      isFeatured: false,
      path: 'shortPath',
      recipe: {
        ingredients: ["yep"],
        amount: ["yep"],
        notes: "NO"
      }
    })
  })
}

// recipe: sharedObject


export { getRecipe, getFeaturedRecipes, sendToDB }