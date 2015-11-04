[![npm version](https://img.shields.io/npm/v/itunes-remote.svg?style=flat)](https://www.npmjs.org/package/itunes-remote.svg)
[![Build Status](https://travis-ci.org/mischah/itunes-remote.svg?branch=master)](https://travis-ci.org/mischah/itunes-remote)
[![devDependency Status](https://david-dm.org/mischah/itunes-remote/dev-status.svg)](https://david-dm.org/mischah/itunes-remote#info=devDependencies)
[![Dependency Status](https://david-dm.org/mischah/itunes-remote/status.svg)](https://david-dm.org/mischah/itunes-remote#info=Dependencies)
[![Unicorn approved](https://img.shields.io/badge/unicorn-approved-ff69b4.svg?style=flat)](https://www.youtube.com/watch?v=ihXfH-zR8qA&feature=youtu.be&t=10s) 

# itunes-remote

> Control iTunes via your terminal


## Install

```
$ npm install --global itunes-remote
```


## Usage

```
$ itunes-remote --help

  Usage
    $ itunes-remote [<artist|album|song> ...]
  
  Options
    --play   Start playing the current selection or search result. [Default: true]',
    --stop   Stop playing the current selection or prevent playing the current search result. [Default: false]',
    --pause  Pause playing the current selection. [Default: false]',
  
  Examples
    $ itunes-remote nicknack',
    Hold on …',
    ✔ Found songs, albums and artists containing ”nicknack“ and generated a temporary playlist',
    ✔ Playing 44 song(s) ♪♬',

    $  itunes-remote --pause',
    Hold on …',
    ✔ Paused playing ♪♬',

    $  itunes-remote --play',
    Hold on …',
    ✔ Playing ♪♬',

    $ itunes-remote emancipator --stop',
    Hold on …',
    ✔ Found songs, albums and artists containing ”emancipator“ and generated a temporary playlist'
```


## License

MIT © [Michael Kühnel](http://michael-kuehnel.de)
