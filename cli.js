#!/usr/bin/env node
'use strict';
var meow = require('meow');
var itunesRemote = require('./');

var cli = meow([
	'Usage',
	'  $ itunes-remote [<artist|album|song> ...]',
	'',
	'Options',
	'  --play   Start playing the current selection or search result. [Default: true]',
	'  --stop   Stop playing the current selection or prevent playing the current search result. [Default: false]',
	'  --pause  Pause playing the current selection. [Default: false]',
	'',
	'Examples',
	'  $ itunes-remote nicknack',
	'  Hold on …',
	'  ✔ Found songs, albums and artists containing ”nicknack“ and generated a temporary playlist',
	'  ✔ Playing 44 song(s) ♪♬',
	'',
	'  $  itunes-remote --pause',
	'  Hold on …',
	'  ✔ Paused playing ♪♬',
	'',
	'  $  itunes-remote --play',
	'  Hold on …',
	'  ✔ Playing ♪♬',
	'',
	'  $ itunes-remote emancipator --stop',
	'  Hold on …',
	'  ✔ Found songs, albums and artists containing ”emancipator“ and generated a temporary playlist'
], {
	alias: {
		v: 'version',
		h: 'help'
	}
});

console.log(itunesRemote(cli.input[0] || '', cli.flags));
