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
		self.log('Hold on …');
		itunesRemote('search', function (response) {
			self.log(response);
			callback();
		}, args);
	});
