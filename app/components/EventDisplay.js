import React, { Component } from 'react'
import Handlebars from 'handlebars/dist/handlebars'
import Frame from './Frame'

export default class EventDisplay extends Component {
  render() {
    const { template, event, styling } = this.props
    const html = Handlebars.compile(template)(event)

    return (
      <article className="EventDisplay">
        <Frame styling={styling} html={html} />
      </article>
    )
  }
}
