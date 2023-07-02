
<h1 align="center">Current.js</h1>

<p align="center">
  <a href="https://github.com/marcoroth/current.js">
    <img src="https://github.com/marcoroth/current.js/actions/workflows/tests.yml/badge.svg">
  </a>
  <a href="https://www.npmjs.com/package/current.js">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/current.js?logo=npm&color=38C160">
  </a>
  <a href="https://www.npmjs.com/package/current.js">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/current.js?logo=npm&color=38C160">
  </a>
  <a href="https://bundlephobia.com/package/current.js">
    <img alt="NPM Bundle Size" src="https://img.shields.io/bundlephobia/minzip/current.js?label=bundle%20size&logo=npm">
  </a>
</p>


## Introduction

`current.js` is a tiny 🤏 JavaScript library (only 379 bytes) that allows you to access data stored in "current" HTML `<meta>` elements.

## Installation

To add `current.js` to your project, run the following command in your terminal:

```bash
yarn add current.js
```

Then, in the JavaScript file where you want to use `current.js` (usually `application.js`), add the following line of code:

```js
import "current.js"
```

This will make the `Current` object available globally, so you can access it in any file without having to import it again.

Alternatively, you can import the `Current` object directly:

```js
import { Current } from "current.js"
```

## Usage

To use `current.js`, you need to add `<meta>` elements to the `<head>` section of your HTML document, with the `name` attribute starting with `current-`:

```html
<head>
  <meta name="current-environment" content="production">
  <meta name="current-user-id" content="123">
  <meta name="current-user-time-zone-name" content="Central Time (US & Canada)">
</head>
```

You can then access the data stored in these elements using the `Current` object. If there is only one `<meta>` tag with the name you requested, `current.js` will return the value as a string:

```js
Current.environment
// => "production"
```

If there are multiple `<meta>` tags with the same name, `current.js` will return an object with the remaining name as a camelized key.

```js
Current.user
// => { id: "123", timeZoneName: "Central Time (US & Canada)" }
```

If the name you requested is not found, it will return an empty object

```js
Current.foo
// => {}
```

## Configuration

#### Custom Prefix

The `prefix` property on `config` can be used to customize the prefix used to lookup the `<meta>` tags.

```js
import { config } from "current.js"
config.prefix = "config"
```

```html
<meta name="current-environment" content="development">
<meta name="config-environment" content="production">
```

Calling `Current.environment` would now look for the meta tag with the `config-environment` name.

```js
Current.environment
// => "production"
```


#### No Prefix

You can also configure `current.js` to use no `prefix` if you set the `prefix` to `null`.

```js
import { config } from "current.js"
config.prefix = null
```

```html
<meta name="current-environment" content="development">
<meta name="environment" content="production">
```

Calling `Current.environment` would also return `"production"` in this case.


## Development

To run the test runner:

```bash
yarn install
yarn build
yarn test
```

## Acknowledgments

This library was inspired by the [source code](https://production.haystack-assets.com/assets/helpers/current_helpers-69434f7688aaf68b68226df19cd29426713fdcad.js) of [HEY.com](https://hey.com), developed by [37signals](https://37signals.com). The original source code can be found [here](https://production.haystack-assets.com/assets/helpers/current_helpers-69434f7688aaf68b68226df19cd29426713fdcad.js).

A big shout out to the team at 37signals and HEY.com for not minifying the JavaScript source code in their apps by ["Paying tribute to the web with View Source"](https://m.signalvnoise.com/paying-tribute-to-the-web-with-view-source/).

We have made some changes and improvements, but this library wouldn't have been possible without their inspiration and ideas. Thanks, it's really appreciated!
