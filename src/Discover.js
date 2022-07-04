import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { createClient } from '@supabase/supabase-js'
import { nanoid } from "nanoid"
import FeaturedRecipe from "./FeaturedRecipe";
import { getFeaturedRecipes } from './utils'

export default function Discover(props) {

  const [featuredList, setFeaturedList] = useState([])


  useEffect(() => {
    getFeaturedRecipes()
      .then(items => {
        setFeaturedList([...items])
      })
  }, [])

  const featuredColors = ["#FFBE0B", "#FB5607", "#FF006E", "#8338EC", "#3A86FF"]

  const createFeaturedRecipes = () => {
    const featuredEls = featuredList.map(item => <FeaturedRecipe key={nanoid()} path={item} color={featuredColors[Math.floor(Math.random() * featuredColors.length)]} />)
    return featuredEls
  }

  let featuredListEls = []
  useEffect(() => {
    featuredListEls = createFeaturedRecipes()
  }, [featuredList])

  console.log("loading")

  return (
    <div className="App column discover">
      <Navbar />
      <h1>Find your new favorite recipe</h1>
      <div className="recipes-container">
        {createFeaturedRecipes()}
      </div>
    </div>
  )
}