'use strict';

var osascript = require('osascript').eval;
var stringify = require('js-function-string');
var logSymbols = require('log-symbols');
var chalk = require('chalk');
var requireDir = require('require-dir');

var lib = requireDir('./lib');

var osascriptOpts = {
	flags: ['-s', 's']
};

function startPlayback(callback) {
	// Run JavaScript file through OSA
	osascript(stringify(lib.play.method), function (err) {
		var result;
		if (err === null) {
			result = callback(logSymbols.success + ' Playing ♪♬');
		} else {
			result = callback(logSymbols.error + ' ' + chalk.red(err));
		}
		return result;
	});
}

function stopPlayback(callback) {
	// Run JavaScript file through OSA
	osascript(stringify(lib.stop.method), function (err) {
		var result;
		if (err === null) {
			result = callback(logSymbols.success + ' Stopped playing ♪♬');
		} else {
			result = callback(logSymbols.error + ' ' + chalk.red(err));
		}
		return result;
	});
}

function pausePlayback(callback) {
	// Run JavaScript file through OSA
	osascript(stringify(lib.pause.method), function (err) {
		var result;
		if (err === null) {
			result = callback(logSymbols.success + ' Paused playing ♪♬');
		} else {
			result = callback(logSymbols.error + ' ' + chalk.red(err));
		}
		return result;
	});
}

function nextTrack(callback) {
	// Run JavaScript file through OSA
	osascript(stringify(lib.next.method), function (err) {
		var result;
		if (err === null) {
			result = callback(logSymbols.success + ' Skipped track.');
		} else {
			result = callback(logSymbols.error + ' ' + chalk.red(err));
		}
		return result;
	});
}

function prevTrack(callback) {
	// Run JavaScript file through OSA
	osascript(stringify(lib.previous.method), function (err) {
		var result;
		if (err === null) {
			result = callback(logSymbols.success + ' Returned to previous track.');
		} else {
			result = callback(logSymbols.error + ' ' + chalk.red(err));
		}
		return result;
	});
}

function backTrack(callback) {
	// Run JavaScript file through OSA
	osascript(stringify(lib.back.method), function (err) {
		var result;
		if (err === null) {
			result = callback(logSymbols.success + ' Returned to previous track or beginning of current track.');
		} else {
			result = callback(logSymbols.error + ' ' + chalk.red(err));
		}
		return result;
	});
}

function startPlaylist(playlist, amount, callback) {
	// Run JavaScript file through OSA
	osascript(stringify(lib.play.method).replace(/{{playlist}}/, playlist), function (err) {
		var result;
		if (err === null) {
			result = callback(logSymbols.success + ' Playing ' + amount + ' song' + (amount > 1 ? 's' : '') + ' ♪♬');
		} else {
			result = callback(logSymbols.error + ' ' + chalk.red(err));
		}
		return result;
	});
}

function startSearch(searchTerm, opts, callback) {
	var limitTo = 'all';
	var messagePart = 'songs, albums and artists containing ”';

	if (opts.songs) {
		limitTo = 'songs';
		messagePart = 'songs containing ”';
	}
	if (opts.artists) {
		limitTo = 'artists';
		messagePart = 'songs by ”';
	}
	if (opts.albums) {
		limitTo = 'albums';
		messagePart = 'album containing ”';
	}

	// Run JavaScript file through OSA
	osascript(stringify(lib.search.method)
	.replace(/{{searchTerm}}/, searchTerm)
	.replace(/{{limitTo}}/, limitTo), osascriptOpts, function (err, data) {
		data = JSON.parse(data);
		var playlist = data[0];
		var amount = parseInt(data[1], 10);
		var result;
		if (err === null && amount) {
			if (!opts.dontplay) {
				startPlaylist(playlist, amount, function (response) {
					result = callback(response);
				});
			}
			result = callback(logSymbols.success + ' Found ' + messagePart +
				chalk.inverse(searchTerm) + '“ and generated a temporary playlist');
		} else if (err === null) {
			result = callback(logSymbols.error + ' Oops. Found 0 ' + messagePart +
				chalk.inverse(searchTerm) + '“.');
		} else {
			result = callback(logSymbols.error + ' ' + chalk.red(err));
		}
		return result;
	});
}

function getData(callback) {
	// Run JavaScript file through OSA
	osascript(stringify(lib.getLibraryData.method), osascriptOpts, function (err, data) {
		var result;
		if (err === null) {
			data = JSON.parse(data);
			result = callback(data);
		} else {
			result = callback(logSymbols.error + ' ' + chalk.red(err));
		}
		return result;
	});
}

module.exports = function (command, callback, args) {
	switch (command) {
		case 'play':
			startPlayback(function (response) {
				return callback(response);
			});
			break;
		case 'stop':
			stopPlayback(function (response) {
				return callback(response);
			});
			break;
		case 'pause':
			pausePlayback(function (response) {
				return callback(response);
			});
			break;
		case 'next':
			nextTrack(function (response) {
				return callback(response);
			});
			break;
		case 'previous':
			prevTrack(function (response) {
				return callback(response);
			});
			break;
		case 'back':
			backTrack(function (response) {
				return callback(response);
			});
			break;
		case 'search':
			startSearch(args.searchterm, args.options, function (response) {
				return callback(response);
			});
			break;
		case 'getData':
			getData(function (response) {
				return callback(response);
			});
			break;
		default:
			throw new Error('You have to call itunesRemote with a command');
	}
};
