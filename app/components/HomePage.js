import React from 'react'
import Banner from './Banner'
import EventDisplay from './EventDisplay'
import Footer from './Footer'
import Hero from './Hero'
import Nav from './Nav'

// import data from '../../server/event'

const data = {
  "title": "Startup Grind Hosts Hugo Strange (Arkham Asylum)",
  "address": {
    "city": "Arkham",
    "street": "1 Asylum rd.",
    "zip": "72000"
  },
  "start_date": "2016-06-10T19:00:00",
  "end_data": "2016-06-10T21:30:00",
  "agenda_items": [
    {
      "description": "Welcome",
      "start": "2016-06-10T19:00:00",
      "end": "2016-06-10T19:30:00",
    },
    {
      "description": "Fireside Chat",
      "start": "2016-06-10T19:30:00",
      "end": "2016-06-10T20:30:00",
    },
    {
      "description": "Mingling",
      "start": "2016-06-10T20:30:00",
      "end": "2016-06-10T21:30:00",
    }
  ],
  "presenters": [
    {
      "image": "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/ModernHugoStrange.jpg/250px-ModernHugoStrange.jpg",
      "name": "Hugo Strange",
      "bio": "He is an evil psychologist and chemical genius who knows Batman\'s secret identity and lusts to take the identity for himself. Just as The Batman was familiar with him, Strange knew of his adversary long before they met."
    }
  ]
}

// const template = `<div><h1>THE TEMPLATE</h1></div>`

const HomePage = (prop, { store: { template, data, styling } }) =>
  <div className="HomePage">
    <Banner>
      <Nav/>
      <Hero/>
    </Banner>
    <div className="content">
      <EventDisplay template={template} event={data} styling={styling} />
    </div>
  </div>

HomePage.contextTypes = {
  store: React.PropTypes.object
}

export default HomePage
