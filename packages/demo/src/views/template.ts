export const templateHtml = ({ title, body }: { title: string; body: string }) => /* html */ `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
    </head>
    <body>${body}</body>
  </html>
`
