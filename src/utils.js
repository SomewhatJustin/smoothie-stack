import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://elwrnresrviksptoeoes.supabase.co'
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function getRecipe(id) {
  let { data: Recipes, error } = await supabase
    .from('Recipes')
    .select('recipe, path')
    .eq('path', id)

  return JSON.parse(Recipes[0].recipe)
}

async function getFeaturedRecipes() {
  let { data: Recipes, error } = await supabase
    .from('Recipes')
    .select('path, recipe')
    .eq('isFeatured', true)
  return Recipes
}

async function sendToDB(sharedObject, shortPath) {
  const { data, error } = await supabase
    .from('Recipes')
    .insert([
      { recipe: JSON.stringify(sharedObject), path: shortPath },
    ])
}



export { getRecipe, getFeaturedRecipes, sendToDB }