import React from 'react'

const App = ({ template, data }) =>
  <div className="App">
    <h1>Welcome</h1>
    { JSON.stringify(template) }
    { JSON.stringify(data) }
  </div>

export default App
