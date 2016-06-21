import React, { Component } from 'react'
import Handlebars from 'handlebars/dist/handlebars'
import { formatDate, formatTime, transformData } from '../utils'
import Frame from './Frame'

export default class EventDisplay extends Component {
  render() {
    const { template, event, styling } = this.props

    const formattedEvent = transformData(event)
    const html = Handlebars.compile(template)(formattedEvent)

    return (
      <article className="EventDisplay">
        <Frame styling={styling} html={html} />
      </article>
    )
  }
}
