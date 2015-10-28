'use strict';

var osascript = require('osascript');
var fs = require('fs');

module.exports = function (str, opts) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	opts = opts || {};

// Run JavaScript file through OSA
fs.createReadStream('lib/play.js')
	.pipe(osascript())
	.pipe(process.stdout);

	return str + ' & ' + (opts.postfix || 'rainbows');
};
