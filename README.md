# All aboard the `nonce-express`!
> *Choo choo/`bzfS2qzo/Q==`!*

`nonce-express` is a simple low-code express middleware to help generate nonces. It uses the built-in `crypto` module to generate ["cryptographically strong pseudorandom data"](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback) to be exposed at `res.locals.nonce`.

What's also cool, is that you can choose how many bytes of data you want your nonce to be, as well as what variable name you want it to be exposed as!

## Everything you need
1. Install
```bash
npm install --save nonce-express
```

2. Use the middleware
```js
// ...

const nonce = require("nonce-express");
app.use(nonce({ // These are the defaults
    varName: "nonce",
    size: 16
}));

// ...
```

3. Use the generated nonce
```js
// ...

// In helmet
app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            scriptSrc: [
                "'self'",
                (req, res) => `'nonce-${res.locals["nonce"]}'`,
            ]
        }
    }
}));

// In your app
app.get("/", (req,res) => res.send(`<script nonce="${res.locals.nonce}">alert("Hello, there!")</script>`));

// ...
```

## Final words

Now that this readme is officially longer than the actual `nonce.js` file, I think it's time to end it here.

[MIT License](https://choosealicense.com/licenses/mit/), 2021 Jarod Brennfleck