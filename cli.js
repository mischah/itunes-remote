#!/usr/bin/env node
'use strict';

var vorpal = require('vorpal')();
var itunesRemote = require('./');

function startWaitingIndicator() {
	var frames = [' ', ' ', '…', '……', '………', '…………', '……………'];
	var i = 0;
	var intervalId = setInterval(function () {
		var frame = frames[i = ++i % frames.length];
		vorpal.ui.redraw('Hold on …' + frame);
	}, 250);
	return intervalId;
}

function stopWaitingIndicator(intervalId) {
	clearInterval(intervalId);
	vorpal.ui.redraw.done();
}

vorpal
	.delimiter('iTunes:')
	.show();

vorpal.find('exit').description('Exit itunes-remote.');

vorpal
	.command('play', 'Start playing the current selection')
	.alias('start')
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
	.command('next', 'Advance to the next track in the current playlist.')
	.action(function (args, callback) {
		var self = this;
		self.log('Hold on …');
		itunesRemote('next', function (response) {
			self.log(response);
			callback();
		});
	});

vorpal
	.command('previous', 'Return to the previous track in the current playlist.')
	.alias('prev')
	.action(function (args, callback) {
		var self = this;
		self.log('Hold on …');
		itunesRemote('previous', function (response) {
			self.log(response);
			callback();
		});
	});

vorpal
	.command('back', 'Reposition to beginning of current track or go to previous track if already at start of current track.')
	.action(function (args, callback) {
		var self = this;
		self.log('Hold on …');
		itunesRemote('back', function (response) {
			self.log(response);
			callback();
		});
	});

vorpal
	.command('search <searchterm>', 'Fuzzy search album, artists and songs.')
	.option('-A, --albums', 'Limit search to albums.')
	.option('-s, --songs', 'Limit search to songs.')
	.option('-a, --artists', 'Limit search to artist.')
	.option('-d, --dont-play', 'Prevent playing the search result.')
	.action(function (args, callback) {
		var self = this;
		var searchIndicator = startWaitingIndicator();
		itunesRemote('search', function (response) {
			stopWaitingIndicator(searchIndicator);
			self.log(response);
			callback();
		}, args);
	});

vorpal
	.command('play artist', 'Plays songs by an artist.')
	.action(function (args, callback) {
		var self = this;
		var getDataIndicator = startWaitingIndicator('getData');

		itunesRemote('getData', function (response) {
			var artists = [];
			stopWaitingIndicator(getDataIndicator);
			artists = JSON.parse(response).uniqueArtists;

			self.prompt({
				type: 'list',
				name: 'artist',
				message: 'Choose an artist',
				choices: artists
			}, function (result) {
				var selectedArtist = result.artist;
				var searchArtistIndicator = startWaitingIndicator();
				itunesRemote('search', function (response) {
					stopWaitingIndicator(searchArtistIndicator);
					self.log(response);
					callback();
				}, {
					searchterm: selectedArtist,
					options: {artists: true}
				});
			});
		});
	});

vorpal.parse(process.argv);
