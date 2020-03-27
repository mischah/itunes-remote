'use strict';

/* global Application */

module.exports = {
	method: function () {
		var app = Application('Music'); // eslint-disable-line new-cap
		var playlist = '{{playlist}}';

		app.run();

		if (playlist === '{{playlist}}') {
			app.play();
		} else {
			app.userPlaylists[playlist].play();
		}
	}
};
