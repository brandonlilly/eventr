export function renderFullPage(markup, state) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>eventr</title>
        <link href="generated/styles.css" rel="stylesheet" type="text/css" />
      </head>
      <body>
        <div id="root">${markup}</div>
          <script>
            window.__STATE__ = ${JSON.stringify(state)}
          </script>
        <script src="generated/bundle.js"></script>
      </body>
    </html>
  `
}
