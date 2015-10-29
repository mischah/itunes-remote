# itunes-remote [![Build Status](https://travis-ci.org/mischah/itunes-remote.svg?branch=master)](https://travis-ci.org/mischah/itunes-remote)

> Control iTunes via your terminal


## Install

```
$ npm install --save itunes-remote
```


## Usage

```
$ npm install --global itunes-remote
```

```
$ itunes-remote --help

  Usage
    $ itunes-remote [<artist|album|song> ...]
  
  Options
    --stop   Stop playing the current selection. [Default: false]
    --start  Start playing the current selection. [Default: true]
  
  Examples
    $ itunes-remote she
    Hold on …
    ✔ Found songs, albums and artists containing ”she“ and generated a playlist
    ✔ Playing your songs (っ◕‿◕)っ
    
    $ itunes-remote she --stop
    Hold on …
    ✔ Found songs, albums and artists containing ”she“ and generated a playlist
```


## License

MIT © [Michael Kühnel](http://michael-kuehnel.de)
