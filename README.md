
# detect-environment

[![npm version](https://badge.fury.io/js/%40betsol%2Fdetect-environment.svg)](https://badge.fury.io/js/%40betsol%2Fdetect-environment)

Detects environment by examining CLI arguments and NODE_ENV.

## Features

- Two detection methods: `CLI` and `NODE_ENV`
- Detection methods, the order of their use and the list of environments are fully configurable
- Enables shorthand syntax and environment name aliases
- Very small module with single dependency
- Written in TypeScript, shipped with typings
- Targeted to ES6


## Installation

### yarn

`yarn add @betsol/detect-environment`

### npm

`npm i @betsol/detect-environment`


## Usage

Require the module and call it to detect the environment. Pass options to alter the default behavior.
Library will always return the canonical name of the detected environment even if shorthand syntax was used.

The module will sequentially iterate over various detection methods until environment will be detected,
otherwise it will fallback to default environment.

> The order and availability of detection methods could be configured through `methods` option.

### Detection Methods

#### `CLI`

This method detects environment by examining the CLI arguments passed to your program.

Various call formats are possible:

- `$ node app.js --environment=production` — This is the longest "canonical" form
- `$ node app.js --env=production` — Shorthand `"env"` argument name could be used
- `$ node app.js --environment=prod` — Shorthand `"prod"` environment name is used
- `$ node app.js --env=prod` — Both of the above
- `$ node app.js --production` — Just the canonical name of the environment is used
- `$ node app.js --prod` — This is the shortest form, nice for development

> Canonical environment names and their aliases could be configured using `environments` option.

#### `NODE_ENV`

This method examines the value of `NODE_ENV` environment variable.

- `$ NODE_ENV=production app` — Longest "canonical" form
- `$ NODE_ENV=prod app` — Shorthand environment name could be used


### Minimal Example

```js
const detectEnvironment = require('@betsol/detect-environment');

const ENVIRONMENT = detectEnvironment();

// ENVIRONMENT = "development"
```

### Default Options Example

```js
const detectEnvironment = require('@betsol/detect-environment');

const ENVIRONMENT = detectEnvironment({
  environments: {
    production: {
      aliases: ['prod']
    },
    development: {
      aliases: ['dev']
    }
  },
  methods: ['CLI', 'NODE_ENV'],
  defaultEnvironment: 'development'
});

// ENVIRONMENT = "development"
```

## Options

- `environments` — is map where each key is a canonical environment name, e.g. `prodution`.
- `environments[].aliases` — is a string array of all shorthand/alternative environment names,
  e.g.: `['dev', 'develop', 'local']`
- `methods` — is a prioritized list of methods to use for environment detection.
  Possible values are: `CLI` and `NODE_ENV`.
- `defaultEnvironment` — fallback canonical environment name to be used by default, e.g.: `development`.

## Support

If this library is useful to you, please add a star on [GitHub repository][repo-gh].

Thank you!


## License

```
The MIT License (MIT)

Copyright (c) 2017 Slava Fomin II, BETSOL GROUP FOUNDATION.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

  [repo-gh]: https://github.com/betsol/detect-environment
