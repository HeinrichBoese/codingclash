import React, { useState } from 'react';
const Render = () => {
    return (
      <div>
        <iframe
          srcDoc={`
          <!DOCTYPE html>
          <html>
            <head>
            </head>
            <body>
              <h1>Content inside an iframe, who knew...</h1>
            </body>
          </html>
        `}
        />
      </div>
    )
  }