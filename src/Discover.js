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

  const createFeaturedRecipes = () => {
    const featuredEls = featuredList.map(item => <FeaturedRecipe key={nanoid()} path={item} />)
    return featuredEls
  }

  let featuredListEls = []
  useEffect(() => {
    featuredListEls = createFeaturedRecipes()
  }, [featuredList])

  return (
    <div className="App column">
      <Navbar />
      <h1>Imagine a planet with smoothies.</h1>
      {createFeaturedRecipes()}
    </div>
  )
}