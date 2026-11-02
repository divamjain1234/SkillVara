import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import Jobsection from '../components/Jobsection'
import Quote from '../components/Quote'
import Footer from '../components/Footer'

const Home = () => {
  const [search, setSearch] = useState('')
  return (
    <div>
      <Navbar/>
      <Searchbar value={search} onChange={setSearch}/>
      <Jobsection search={search}/>
      <Quote/>
      <Footer/>
    </div>
  )
}

export default Home