import React from 'react'
import Banner from './Banner'
import EventDisplay from './EventDisplay'
import Footer from './Footer'
import Hero from './Hero'
import Nav from './Nav'

const App = ({ template, data, children }) =>
  <div className="App">
    { children }
    <Footer/>
  </div>

export default App
