#!/usr/bin/env node
'use strict';

var vorpal = require('vorpal')();
var ora = require('ora');
var chalk = require('chalk');
var itunesRemote = require('./');

vorpal
	.history('itunes-remote')
	.delimiter('iTunes:')
	.show();

vorpal.find('exit').description('Exit itunes-remote.');

vorpal
	.command('play', 'Start playing the current selection.')
	.alias('start')
	.option('-E, --exit', 'exit itunes-remote after executing the command')
	.action(function (args, callback) {
		var self = this;
		var spinner = ora().start();
		itunesRemote('play', function (response) {
			spinner.stop();
			if (args.options.exit) {
				vorpal.execSync('exit');
			}
			callback();
		});
	});

vorpal
	.command('play artist', 'Plays songs by an artist.')
	.action(function (args, callback) {
		var self = this;
		var spinner = ora('Getting artists').start();

		itunesRemote('getData', function (response) {
			var artists = [];
			spinner.stop();
			artists = response.artists;

			self.prompt({
				type: 'list',
				name: 'artist',
				message: 'Choose an artist',
				choices: artists
			}, function (result) {
				var selectedArtist = result.artist;
				var spinner = ora('Searching for songs by ' + chalk.blue(result.artist)).start();
				itunesRemote('search', function (response) {
					spinner.stop();
					self.log(response);
					callback();
				}, {
					searchterm: selectedArtist,
					options: {artists: true}
				});
			});
		});
	});

vorpal
	.command('play album', 'Plays an album.')
	.action(function (args, callback) {
		var self = this;
		var spinner = ora('Getting albums').start();

		itunesRemote('getData', function (response) {
			var albums = [];
			spinner.stop();
			albums = response.albums;

			self.prompt({
				type: 'list',
				name: 'album',
				message: 'Choose an album',
				choices: albums
			}, function (result) {
				var selectedAlbum = result.album;
				var spinner = ora('Searching for albums named ' + chalk.blue(result.album)).start();
				itunesRemote('search', function (response) {
					spinner.stop();
					self.log(response);
					callback();
				}, {
					searchterm: selectedAlbum,
					options: {albums: true}
				});
			});
		});
	});

vorpal
	.command('stop', 'Stop playing the current selection')
	.option('-E, --exit', 'exit itunes-remote after executing the command')
	.action(function (args, callback) {
		var self = this;
		var spinner = ora().start();
		itunesRemote('stop', function (response) {
			spinner.stop();
			self.log(response);
			if (args.options.exit) {
				vorpal.execSync('exit');
			}
			callback();
		});
	});

vorpal
	.command('pause', 'Pause playing the current selection')
	.option('-E, --exit', 'exit itunes-remote after executing the command')
	.action(function (args, callback) {
		var self = this;
		var spinner = ora().start();
		itunesRemote('pause', function (response) {
			spinner.stop();
			self.log(response);
			if (args.options.exit) {
				vorpal.execSync('exit');
			}
			callback();
		});
	});

vorpal
	.command('next', 'Advance to the next track in the current playlist.')
	.option('-E, --exit', 'exit itunes-remote after executing the command')
	.action(function (args, callback) {
		var self = this;
		var spinner = ora().start();
		itunesRemote('next', function (response) {
			spinner.stop();
			self.log(response);
			if (args.options.exit) {
				vorpal.execSync('exit');
			}
			callback();
		});
	});

vorpal
	.command('previous', 'Return to the previous track in the current playlist.')
	.alias('prev')
	.option('-E, --exit', 'exit itunes-remote after executing the command')
	.action(function (args, callback) {
		var self = this;
		var spinner = ora().start();
		itunesRemote('previous', function (response) {
			spinner.stop();
			self.log(response);
			if (args.options.exit) {
				vorpal.execSync('exit');
			}
			callback();
		});
	});

vorpal
	.command('back', 'Reposition to beginning of current track or go to previous track if already at start of current track.')
	.option('-E, --exit', 'exit itunes-remote after executing the command')
	.action(function (args, callback) {
		var self = this;
		var spinner = ora().start();
		itunesRemote('back', function (response) {
			spinner.stop();
			self.log(response);
			if (args.options.exit) {
				vorpal.execSync('exit');
			}
			callback();
		});
	});

vorpal
	.command('search <searchterm>', 'Fuzzy search album, artists and songs.')
	.option('-A, --albums', 'Limit search to albums')
	.option('-s, --songs', 'Limit search to songs')
	.option('-a, --artists', 'Limit search to artist')
	.option('-d, --dont-play', 'Prevent playing the search result')
	.action(function (args, callback) {
		var self = this;
		var spinner = ora('Searching …').start();
		itunesRemote('search', function (response) {
			spinner.stop();
			self.log(response);
			callback();
		}, args);
	});

vorpal.parse(process.argv);
