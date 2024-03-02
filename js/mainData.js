const mainData = () => {
	fetch('https://anime-site-2feee-default-rtdb.firebaseio.com/anime.json')
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log('data: ', data);
			console.log('data_anime: ', data.anime);
		});
};

mainData();
