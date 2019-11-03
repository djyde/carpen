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

Write your app code on `./app.js`:

```js
document.querySelector('#root').innerHTML = '<div>Hello world</div>'
```

Then run `npm run dev`, [Parcel](https://parceljs.org) will parse the `index.html` and bundle the code, so feel free to use any stacks you prefer. Finally the app would start and is ready for your development.

### expose function

Sometimes you may want to expose some Node.js functions which can be called on the client side code:

```js
// exposed.js

const crypto = require('crypto')

exports.md5 = text => crypto.createHash('md5').update(text).digest('hex')
```

Add a `--expose` option targeted to the `exposed.js`:

```json
// package.json

{
  "scripts": {
    "dev": "carpen --expose exposed.js",
  }
}
```

Then call it from client side (notice that all exposed functions return a Promise):

```js
const crypted = await md5('hello world')
```

# License

MIT License