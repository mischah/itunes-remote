var expect = require('chai').expect;
var itunesRemote = require('./');


describe("itunes-remote", function() {
	it("returns correct string", function() {
		expect(itunesRemote('unicorns', {postfix: 'foo'})).to.equal('unicorns & rainbows');
	});
});
