import React, { Component } from 'react'

export default class Frame extends Component {
  render() {
    const { styling, html } = this.props

    var frameSrc = `data:text/html,
      <html>
        <head>
          <style>
            html {
              font-size: 10px;
            }

            body {
              background: rgb(251, 251, 250);
              font-size: 2rem;
              line-height: 3.2rem;

              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
              color: rgb(100, 114, 119);
              font-family: 'Open Sans', 'Helvetica Neue', sans-serif;
            }

            ${styling}
          </style>
        </head>
        <body style="margin:0px;">${html}</body>
      </html>
    `

    return (
      <div className="Frame">
        <iframe
          src={frameSrc}
          frameBorder="0"
          scrolling="no"
          />
      </div>
    )
  }
}
