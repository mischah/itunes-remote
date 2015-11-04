#!/usr/bin/env node
'use strict';

var vorpal = require('vorpal')();
var itunesRemote = require('./');

vorpal
	.delimiter('iTunes:')
	.show();

vorpal.find('exit').description('Exit itunes-remote.');

vorpal
	.command('play', 'Start playing the current selection')
	.action(function (args, callback) {
		var self = this;
		self.log('Hold on …');
		itunesRemote('play', function (response) {
			self.log(response);
			callback();
		});
	});

vorpal
	.command('stop', 'Stop playing the current selection')
	.action(function (args, callback) {
		var self = this;
		self.log('Hold on …');
		itunesRemote('stop', function (response) {
			self.log(response);
			callback();
		});
	});

vorpal
	.command('pause', 'Pause playing the current selection')
	.action(function (args, callback) {
		var self = this;
		self.log('Hold on …');
		itunesRemote('pause', function (response) {
			self.log(response);
			callback();
		});
	});

vorpal
	.command('search <searchterm>', 'Fuzzy search album, artists and songs.')
	.option('-d, --dont-play', 'Prevent playing the search result.')
	.action(function (args, callback) {
		var self = this;
		var frames = [' ', ' ','.',  '..', '...', '....', '.....'];
		var i = 0;
		var waiting = setInterval(function() {
			var frame = frames[i = ++i % frames.length];
			vorpal.ui.redraw('Hold on. ' + frame);
		}, 250);
		itunesRemote('search', function (response) {
			clearInterval(waiting);
			vorpal.ui.redraw.done();
			self.log(response);
			callback();
		}, args);
	});

vorpal.parse(process.argv);
