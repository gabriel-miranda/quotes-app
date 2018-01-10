import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
          <title>Quotes app</title>
          <link
            rel="stylesheet"
            href="https://cdn.auth0.com/styleguide/core/2.0.5/core.min.css"
          />
          <link
            rel="stylesheet"
            href="https://cdn.auth0.com/styleguide/components/2.0.0/components.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
