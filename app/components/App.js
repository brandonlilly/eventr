import React from 'react'
import Footer from './Footer'

const App = ({ template, data, children }) =>
  <div className="App">
    { children }
    <Footer/>
  </div>

export default App
