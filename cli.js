#!/usr/bin/env node
'use strict';
var meow = require('meow');
var itunesRemote = require('./');

var cli = meow([
	'Usage',
	'  $ itunes-remote [<artist|album|song> ...]',
	'',
	'Options',
	'  --stop   Stop playing the current selection. [Default: false]',
	'  --start  Start playing the current selection. [Default: true]',
	'',
	'Examples',
	'  $ itunes-remote she',
	'  Hold on …',
	'  ✔ Found songs, albums and artists containing ”she“ and generated a playlist',
	'  ✔ Playing 12 song(s) ♪♬',
	'',
	'  $ itunes-remote she --stop',
	'  Hold on …',
	'  ✔ Found songs, albums and artists containing ”she“ and generated a playlist'
], {
	alias: {
		v: 'version',
		h: 'help'
	}
});

console.log(itunesRemote(cli.input[0] || '', cli.flags));
