'use strict';

/* global Application */

module.exports = {
	method: function () {
		(function () {
			var app = Application('iTunes'); // eslint-disable-line new-cap
			var library = app.libraryPlaylists[0];
			var tracks;
			var artists = [];
			var uniqueArtists;
			var artistsWithoutPartialDuplicates = [];
			var albums = [];
			var uniqueAlbums;

			// console.log(app.version());
			// console.log(library.name());

			app.run();

			tracks = library.sharedTracks();
			// console.log('tracks.length=', tracks.length);

			tracks.forEach(function (element) {
				// console.log(element.artist());
				artists.push(element.artist());
				albums.push(element.album());
			});

			uniqueArtists = artists.filter(function (item, pos) {
				return artists.indexOf(item) === pos;
			});

			uniqueArtists.map(function (artist) {
				var found = 0;
				artistsWithoutPartialDuplicates.forEach(function (element) {
					// console.log(artist.toLowerCase() + '=' + element.toLowerCase());
					if (artist.toLowerCase() === element.toLowerCase() || artist.toLowerCase().indexOf(element.toLowerCase()) !== -1) {
						found++;
					}
				});
				if (found === 0) {
					artistsWithoutPartialDuplicates.push(artist);
				}
			});

			uniqueAlbums = albums.filter(function (item, pos) {
				return albums.indexOf(item) === pos;
			});

			return {
				tracksLength: tracks.length,
				artistsLength: artistsWithoutPartialDuplicates.length,
				artists: artistsWithoutPartialDuplicates,
				albumsLength: uniqueAlbums.length,
				albums: uniqueAlbums.sort()
			};
		})();
	}
};
