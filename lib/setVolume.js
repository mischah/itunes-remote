'use strict';

/* global Application */

module.exports = {
	method: function () {
		(function () {
            var app = Application('iTunes'); // eslint-disable-line new-cap
            var outputs = app.airplayDevices;
            var desiredVolume = parseInt("{{desiredVolume}}");

            if (isNaN(desiredVolume)) {
                throw 'Desired volume is invalid';
            }

            for (var i = 0; i < outputs.length; ++i) {
                outputs[i].soundVolume = desiredVolume;
            }
		})();
	}
};
