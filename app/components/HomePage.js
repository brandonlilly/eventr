import React from 'react'
import { connect } from 'react-redux'
import Banner from './Banner'
import EventDisplay from './EventDisplay'
import Footer from './Footer'
import Hero from './Hero'
import Nav from './Nav'
import { getStyling, getCurrentEvent, getTemplate } from '../redux'

const HomePage = ({ template, event, styling }) =>
  <div className="HomePage">
    <Banner>
      <Nav/>
      <Hero/>
    </Banner>
    <div className="content">
      <EventDisplay template={template} event={event} styling={styling} />
    </div>
  </div>

const mapStateToProps = (state, props) => ({
  event: getCurrentEvent(state),
  styling: getStyling(state),
  template: getTemplate(state),
})

export default connect(mapStateToProps)(HomePage)
