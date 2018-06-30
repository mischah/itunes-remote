'use strict';

/* global Application */

module.exports = {
	method: function () {
		(function () {
			var app = Application('iTunes'); // eslint-disable-line new-cap
			var outputs = app.airplayDevices;
			var outputName = "{{outputName}}";
			var clearOthers = "{{clearOthers}}";

			var newOutputs = [];

			for (var i = 0; i < outputs.length; ++i) {
				// Add output first. If we remove first, music will stop
				if (outputs[i].name().toLowerCase() === outputName.toLowerCase()) {
					outputs[i].selected = true;
					newOutputs.push(outputs[i].name());
				} else if (outputs[i].selected() && !clearOthers) {
					newOutputs.push(outputs[i].name());
				}
			}

			if (clearOthers) {
				for (var i = 0; i < outputs.length; ++i) {
					// Add output first. If we remove first, music will stop
					if (outputs[i].name().toLowerCase() !== outputName.toLowerCase()) {
						outputs[i].selected = false;
					}
				}
			}

			return newOutputs;
		})();
	}
};
