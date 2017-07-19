var expect = require('chai').expect;
require('blanket'); // eslint-disable-line import/no-unassigned-import
var logSymbols = require('log-symbols');
var chalk = require('chalk');
var itunesRemote = require('./');

describe('itunesRemote', function () {
	it('should throw an error when called without command', function () {
		expect(itunesRemote).to.throw(Error, /You have to call itunesRemote with a command/);
	});

	describe('command `play`', function () {
		it('should return »✔ Playing ♪♬«', function (done) {
			itunesRemote('play', function (response) {
				expect(response).to.equal(logSymbols.success + ' Playing ♪♬');
				done();
			});
		});
	});

	describe('command `stop`', function () {
		it('should return »✔ Stopped playing ♪♬«', function (done) {
			itunesRemote('stop', function (response) {
				expect(response).to.equal(logSymbols.success + ' Stopped playing ♪♬');
				done();
			});
		});
	});

	describe('command `pause`', function () {
		it('should return »✔ Paused playing ♪♬«', function (done) {
			itunesRemote('pause', function (response) {
				expect(response).to.equal(logSymbols.success + ' Paused playing ♪♬');
				done();
			});
		});
	});

	describe('command `next`', function () {
		it('should return »✔ Skipped track.«', function (done) {
			itunesRemote('next', function (response) {
				expect(response).to.equal(logSymbols.success + ' Skipped track.');
				done();
			});
		});
	});

	describe('command `previous`', function () {
		it('should return »✔ Returned to previous track.«', function (done) {
			itunesRemote('previous', function (response) {
				expect(response).to.equal(logSymbols.success + ' Returned to previous track.');
				done();
			});
		});
	});

	describe('command `back`', function () {
		it('should return »✔ Returned to previous track or beginning of current track.«', function (done) {
			itunesRemote('back', function (response) {
				expect(response).to.equal(logSymbols.success + ' Returned to previous track or beginning of current track.');
				done();
			});
		});
	});

	describe('command `search`', function () {
		this.timeout(15000);

		it('should return success message', function (done) {
			this.timeout(15000);
			setTimeout(done, 15000);
			itunesRemote('search', function (response) {
				expect(response).to.equal(logSymbols.success + ' Found songs by ”' +
				chalk.inverse('emancipator') + '“ and generated a temporary playlist');
				done();
			}, {searchterm: 'emancipator', options: {dontplay: true, artists: true}}
			);
		});
		it('should return error message when no search results for all', function (done) {
			itunesRemote('search', function (response) {
				expect(response).to.equal(logSymbols.error + ' Oops. Found 0 songs, albums and artists containing ”' +
				chalk.inverse('foozel') + '“.');
				done();
			}, {searchterm: 'foozel', options: {}}
			);
		});
		it('should return error message when no search results for albums', function (done) {
			itunesRemote('search', function (response) {
				expect(response).to.equal(logSymbols.error + ' Oops. Found 0 album containing ”' +
				chalk.inverse('foozel') + '“.');
				done();
			}, {searchterm: 'foozel', options: {albums: true}}
			);
		});
		it('should return error message when no search results for songs', function (done) {
			itunesRemote('search', function (response) {
				expect(response).to.equal(logSymbols.error + ' Oops. Found 0 songs containing ”' +
				chalk.inverse('foozel') + '“.');
				done();
			}, {searchterm: 'foozel', options: {songs: true}}
			);
		});
		it('should return error message when no search results for artists', function (done) {
			itunesRemote('search', function (response) {
				expect(response).to.equal(logSymbols.error + ' Oops. Found 0 songs by ”' +
				chalk.inverse('foozel') + '“.');
				done();
			}, {searchterm: 'foozel', options: {artists: true}}
			);
		});
	});

	describe('command `getData`', function () {
		it('should return an object.', function (done) {
			itunesRemote('getData', function (response) {
				expect(response).to.be.an('object');
				done();
			});
		});
	});
});
