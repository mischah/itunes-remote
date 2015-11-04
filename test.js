var expect = require('chai').expect;
require('blanket');
var itunesRemote = require('./');

describe('itunesRemote', function () {
	it('should throw an error when called without command', function () {
		expect(itunesRemote).to.throw(Error, /You have to call itunesRemote with a command/);
	});
});
