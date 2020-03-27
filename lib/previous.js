'use strict';

/* global Application */

module.exports = {
	method: function () {
		var app = Application('Music'); // eslint-disable-line new-cap

		app.run();
		app.previousTrack();
	}
};
