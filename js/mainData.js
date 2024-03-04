const mainData = () => {
	const renderAnimeList = (array, ganres) => {
		console.log('array: ', array);
		console.log('ganres: ', ganres);
	};

	const renderTopAnime = (array) => {
		const wrapper = document.querySelector('.filter__gallery');

		wrapper.innerHTML = '';
		array.forEach((item) => {
			wrapper.insertAdjacentHTML(
				'beforeend',
				`
				<div
				class="product__sidebar__view__item set-bg mix"
				data-setbg="${item.image}"
				>
				<div class="ep">${item.rating} / 10</div>
				<div class="view"><i class="fa fa-eye"></i>${item.views}</div>
				<h5>
				<a href="/anime-details.html"
				>${item.title}</a
				>
				</h5>
				</div>
				`
			);
		});

		wrapper.querySelectorAll('.set-bg').forEach((element) => {
			element.style.backgroundImage = `url(${element.dataset.setbg})`;
		});
	};

	fetch('https://anime-site-2feee-default-rtdb.firebaseio.com/anime.json')
		// fetch('./db.json')
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			const ganres = new Set();

			renderTopAnime(
				data
					// Согласен, немного извратно )
					.sort((a, b) => a.views - b.views)
					.slice(-5)
					.reverse()
			);

			data.forEach((item) => {
				ganres.add(item.ganre);
			});

			renderAnimeList(data, ganres);
		});
};

mainData();
