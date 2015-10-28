(function () {
	var playlistName = 'CLI',
		app = Application('iTunes'),
		searchTerm = 'midwest product',
		library = app.libraryPlaylists[0],

		result,
		list;

	console.log(app.version());
	console.log(library.name());

	app.run();

	result = app.search(library, {
		'for': searchTerm
	});


	console.log(result.length);
	console.log(result[0].album());

	try {
		app.userPlaylists[playlistName]();
	} catch (e) {
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
		app.duplicate(element,{to: list});
	});

	console.log(list.time());

	list.play();
})();
