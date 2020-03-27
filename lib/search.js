'use strict';

/* global Application */

module.exports = {
	method: function () {
		(function () {
			var playlistName = 'music-remote';
			var app = Application('Music'); // eslint-disable-line new-cap
			var searchTerm = "{{searchTerm}}"; // eslint-disable-line quotes
			var library = app.libraryPlaylists[0];
			var result;
			var list;

			// console.log(app.version());
			// console.log(library.name());

			app.run();

			result = app.search(library, {
				for: searchTerm,
				only: '{{limitTo}}'
			});

			// console.log(result.length);
			// console.log(result[0].album());

			try {
				app.userPlaylists[playlistName]();
			} catch (err) {
				console.log('create playlist');
				app.make({
					new: 'playlist',
					withProperties: {
						name: playlistName
					}
				});
			}

			list = app.userPlaylists[playlistName];

			app.delete(list.tracks);

			result.forEach(function (element) {
				app.duplicate(element, {
					to: list
				});
			});

			console.log(list.time());

			// list.play();
			return [
				playlistName,
				result.length
			];
		})();
	}
};
