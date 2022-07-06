import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { nanoid } from "nanoid"
import FeaturedRecipe from "./FeaturedRecipe";
import { getFeaturedRecipes } from './utils'

export default function Discover(props) {

  const [featuredList, setFeaturedList] = useState([{}])
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    getFeaturedRecipes()
      .then(items => {
        setFeaturedList([...items])
      })
      .then(() => {
        setIsLoading(false)
      })
  }, [])

  const featuredColors = ["#FFBE0B", "#FB5607", "#FF006E", "#8338EC", "#3A86FF"]
  const featuredEls = featuredList.map(item =>
    <FeaturedRecipe
      key={nanoid()}
      path={item.path}
      color={featuredColors[Math.floor(Math.random() * featuredColors.length)]}
      recipeObj={item.recipe} />)

  return (
    <div className="App column discover">
      <Navbar />
      <h1>Find your new favorite recipe</h1>
      <div className="recipes-container">
        {isLoading ? <span>Loading...</span> : featuredEls}
      </div>
    </div>
  )
}