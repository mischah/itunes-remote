'use strict';

/* global Application */

module.exports = {
	method: function () {
		(function () {
            var app = Application('iTunes'); // eslint-disable-line new-cap
            var outputs = app.airplayDevices;

            var outputNames = [];
            for (var i = 0; i < outputs.length; ++i) {
                outputNames.push(outputs[i].name());
            }

			return {
				outputNames
			};
		})();
	}
};
