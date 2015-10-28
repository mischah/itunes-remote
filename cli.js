#!/usr/bin/env node
'use strict';
var meow = require('meow');
var itunesRemote = require('./');

var cli = meow([
	'Usage',
	'  $ itunes-remote [input]',
	'',
	'Options',
	'  --postfix  Lorem ipsum. [Default: false]',
	'',
	'Examples',
	'  $ itunes-remote',
	'  unicorns & rainbows',
	'  $ itunes-remote ponies',
	'  ponies & rainbows'
]);

console.log(itunesRemote(cli.input[0] || 'unicorns', cli.flags));
