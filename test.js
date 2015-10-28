var expect = require('chai').expect;
var itunesRemote = require('./');


describe("itunes-remote", function() {
	it("returns correct string", function() {
		expect(itunesRemote('unicorns')).to.equal('unicorns & rainbows');
	});
});
