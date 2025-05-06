import React from 'react'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import Jobsection from '../components/Jobsection'
import Quote from '../components/Quote'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Searchbar/>
      <Jobsection/>
      <Quote/>
      <Footer/>
    </div>
  )
}

export default Home