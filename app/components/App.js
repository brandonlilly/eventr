import React from 'react'
import Banner from './Banner'
import EventDisplay from './EventDisplay'
import Footer from './Footer'
import Hero from './Hero'
import Nav from './Nav'

const App = ({ template, data }) =>
  <div className="App">
    <Banner>
      <Nav/>
      <Hero/>
    </Banner>
    <div className="content">
      <EventDisplay template={template} data={data}/>
    </div>
    <Footer/>
  </div>

export default App
