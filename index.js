'use strict';

var osascript = require('osascript').eval;
var stringify = require('js-function-string');
var search = require('./lib/search');
var play = require('./lib/play');
var logSymbols = require('log-symbols');
var chalk = require('chalk');
var isEmptyObject = require('is-empty-object');

function startPlaying(playlist, amount) {
	// Run JavaScript file through OSA
	osascript(stringify(play.method).replace(/{{playlist}}/, playlist), function (err) {
		if (err === null) {
			console.log(logSymbols.success, 'Playing ' + amount + ' song(s) ♪♬');
		} else {
			console.log(logSymbols.error, chalk.red(err));
		}
	});
}

function startSearch(searchTerm, opts) {
	// Run JavaScript file through OSA
	osascript(stringify(search.method).replace(/{{searchTerm}}/, searchTerm), function (err, data) {
		data = data.split(',');
		var playlist = data[0];
		var amount = parseInt(data[1], 10);
		if (err === null && amount) {
			console.log(logSymbols.success, 'Found songs, albums and artists containing ”' +
				chalk.inverse(searchTerm) + '“ and generated a temporary playlist');
			if (opts.start) {
				startPlaying(playlist, amount);
			}
		} else if (err === null) {
			console.log(logSymbols.error, 'Oops. Found 0 songs, albums and artists containing ”' +
				chalk.inverse(searchTerm) + '“.');
		} else {
			console.log(logSymbols.error, chalk.red(err));
		}
	});
}

module.exports = function (str, opts) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	if (isEmptyObject(opts)) {
		opts = {start: true};
	}

	if (str) {
		startSearch(str, opts);
	} else {
		return logSymbols.warning +
			' Please enter something you like to listen to.\n' +
			chalk.yellow('Enter `itunes-remote --help` for details');
	}

	return 'Hold on …';
	// return str + ' & ' + (opts.postfix || 'rainbows');
};
