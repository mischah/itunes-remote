'use strict';

var osascript = require('osascript').eval;
var stringify = require('js-function-string');
var play = require('./lib/play');
var logSymbols = require('log-symbols');
var chalk = require('chalk');

module.exports = function (str, opts) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	opts = opts || {};

	// Run JavaScript file through OSA
	osascript(stringify(play.method).replace(/{{str}}/, str), function(err, data) {
		if (err === null) {
			console.log(logSymbols.success, 'Playing songs, albums and artists containing ”' + chalk.inverse(str) + '“');
		} else {
			console.log(logSymbols.error, chalk.red(err));
		}
	});

	return 'Hold on …';
	// return str + ' & ' + (opts.postfix || 'rainbows');
};
