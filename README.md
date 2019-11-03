# Carpen

Build light weight GUI with frontend stack.

## Pre-request

- Chrome Browser is installed

## Installation

```
npm i carpen --save
```

## Usage

```json
// package.json

{
  "scripts": {
    "dev": "carpen",
    "build": "carpen build"
  }
}
```

Write a `index.html` as entry:

```html
<html>
  <body>
    <div id="root" />
    <script src="./app.js"></script>
  </body>
</html>
```

`./app.js` is your app:

```js
import React from 'react'
import { render } from 'react-dom'

render(<div>Hello world</div>, document.querySelector('#root'))
```

Then run `npm run dev`, [Parcel](https://parceljs.org) will parse the `index.html` and bundle the code. Finally the app would start and is ready for your development.

# License

MIT License