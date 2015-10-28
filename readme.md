# itunes-remote [![Build Status](https://travis-ci.org/mischah/itunes-remote.svg?branch=master)](https://travis-ci.org/mischah/itunes-remote)

> Control iTunes via CLI


## Install

```
$ npm install --save itunes-remote
```


## Usage

```js
const itunesRemote = require('itunes-remote');

itunesRemote('unicorns');
//=> 'unicorns & rainbows'
```


## API

### itunesRemote(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`  
Default: `false`

Lorem ipsum.


## CLI

```
$ npm install --global itunes-remote
```

```
$ itunes-remote --help

  Usage
    itunes-remote [input]

  Options
    --postfix  Lorem ipsum. [Default: false]

  Examples
    $ itunes-remote
    unicorns & rainbows
    $ itunes-remote ponies
    ponies & rainbows
```


## License

MIT © [Michael Kühnel](http://michael-kuehnel.de)
