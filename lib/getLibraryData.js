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
			var albums = [];
			var uniqueAlbums;

			console.log(app.version());
			console.log(library.name());

			app.run();

			console.log(library);

			tracks = library.sharedTracks();
			console.log('tracks.length=', tracks.length);

			tracks.forEach(function (element) {
				// console.log(element.artist());
				artists.push(element.artist());
				albums.push(element.album());
			});

			uniqueArtists = artists.filter(function (item, pos) {
				return artists.indexOf(item) === pos;
			});

			uniqueAlbums = albums.filter(function (item, pos) {
				return albums.indexOf(item) === pos;
			});

			return {
				tracksLength: tracks.length,
				uniqueArtistsLength: uniqueArtists.length,
				uniqueArtists: uniqueArtists,
				uniqueAlbumsLength: uniqueAlbums.length,
				uniqueAlbums: uniqueAlbums
			};
		})();
	}
};
