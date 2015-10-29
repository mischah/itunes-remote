var expect = require('chai').expect;
var itunesRemote = require('./');


describe("itunes-remote", function() {
	it("should return a hint when called without searchterm and options", function() {
		// expect(itunesRemote('unicorns', {postfix: 'foo'})).to.equal('Hold on …');
		expect(itunesRemote('', {})).to.equal('\u001b[33m⚠\u001b[39m Please enter something you like to listen to.\n\u001b[33mEnter `itunes-remote --help` for details\u001b[39m');
	});
});
