'use strict';

/* global Application */

module.exports = {
	method: function () {
		var app = Application('iTunes'); // eslint-disable-line new-cap
		var playlist = '{{playlist}}';

		app.run();
		app.userPlaylists[playlist].play();
	}
};
