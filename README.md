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

# License

MIT License