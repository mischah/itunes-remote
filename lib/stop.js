'use strict';

/* global Application */

module.exports = {
	method: function () {
		var app = Application('iTunes'); // eslint-disable-line new-cap

		app.run();
		app.stop();
	}
};
