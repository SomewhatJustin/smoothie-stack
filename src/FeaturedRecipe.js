import React from "react";
import { Link } from 'react-router-dom'
import { ReactComponent as Smoothie } from './img/smoothie.svg'

export default function FeaturedRecipe(props) {
  const path = props.path
  const recipeObj = JSON.parse(props.recipeObj)

  function title() {
    const ingredients = recipeObj.ingredients
    if (ingredients.length === 1) {
      return ingredients
    } else if (ingredients.length === 2) {
      return `${ingredients[0]} and ${ingredients[1]}`
    } else if (ingredients.length >= 3) {
      return `${ingredients[0]}, ${ingredients[1]}, and ${ingredients[2]}`
    }
  }

  return (
    <div className="featuredRecipe card">
      <Smoothie fill={props.color} />
      <Link to={`/s/${path}`}><h3>{title()}</h3></Link>
    </div>

  )
}