'use strict';

var osascript = require('osascript').eval;
var stringify = require('js-function-string');
var search = require('./lib/search');
var play = require('./lib/play');
var pause = require('./lib/pause');
var stop = require('./lib/stop');
var logSymbols = require('log-symbols');
var chalk = require('chalk');

function startPlayback(callback) {
	// Run JavaScript file through OSA
	osascript(stringify(play.method), function (err) {
		if (err === null) {
			return callback(logSymbols.success + ' Playing ♪♬');
		} else {
			return callback(logSymbols.error + ' ' + chalk.red(err));
		}
	});
}

function stopPlayback(callback) {
	// Run JavaScript file through OSA
	osascript(stringify(stop.method), function (err) {
		if (err === null) {
			return callback(logSymbols.success + ' Stopped playing ♪♬');
		} else {
			return callback(logSymbols.error + ' ' + chalk.red(err));
		}
	});
}

function pausePlayback(callback) {
	// Run JavaScript file through OSA
	osascript(stringify(pause.method), function (err) {
		if (err === null) {
			return callback(logSymbols.success + ' Paused playing ♪♬');
		} else {
			return callback(logSymbols.error + ' ' + chalk.red(err));
		}
	});
}

function startPlaylist(playlist, amount, callback) {
	// Run JavaScript file through OSA
	osascript(stringify(play.method).replace(/{{playlist}}/, playlist), function (err) {
		if (err === null) {
			return callback(logSymbols.success + ' Playing ' + amount + ' song(s) ♪♬');
		} else {
			return callback(logSymbols.error + ' ' + chalk.red(err));
		}
	});
}

function startSearch(searchTerm, opts, callback) {
	// Run JavaScript file through OSA
	osascript(stringify(search.method).replace(/{{searchTerm}}/, searchTerm), function (err, data) {
		data = data.split(',');
		var playlist = data[0];
		var amount = parseInt(data[1], 10);
		if (err === null && amount) {
			if (!opts.dontplay) {
				startPlaylist(playlist, amount, function(response) {
					return callback(response);
				});
			}
			return callback(logSymbols.success + ' Found songs, albums and artists containing ”' +
				chalk.inverse(searchTerm) + '“ and generated a temporary playlist');
		} else if (err === null) {
			return callback(logSymbols.error + ' Oops. Found 0 songs, albums and artists containing ”' +
				chalk.inverse(searchTerm) + '“.');
		} else {
			return callback(logSymbols.error + ' ' + chalk.red(err));
		}
	});
}

module.exports = function (command, callback, args) {

	switch (command) {
		case 'play':
			startPlayback(function(response) {
				return callback(response);
			});
			break;
		case 'stop':
			stopPlayback(function(response) {
				return callback(response);
			});
			break;
		case 'pause':
			pausePlayback(function(response) {
				return callback(response);
			});
			break;
		case 'search':
			// console.log(args);
			startSearch(args.searchterm, args.options, function(response) {
				return callback(response);
			});
			break;
	}

};
