var expect = require('chai').expect;
require('blanket');
var itunesRemote = require('./');
var logSymbols = require('log-symbols');
var chalk = require('chalk');

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
		it('should return error message when no search results.', function (done) {
			itunesRemote('search', function (response) {
				expect(response).to.equal(logSymbols.error + ' Oops. Found 0 songs, albums and artists containing ”' +
				chalk.inverse('foozel') + '“.');
				done();
			}, {searchterm: 'foozel', options: {}}
			);
		});
	});

	describe('command `getData`', function () {
		it('should return an object.', function (done) {
			itunesRemote('getData', function (response) {
				expect(JSON.parse(response)).to.be.an('object');
				done();
			});
		});
	});
});
