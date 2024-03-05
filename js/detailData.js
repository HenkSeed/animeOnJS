const detailData = () => {
	const preloader = document.querySelector('.preloder');

	const renderGanreList = (ganres) => {
		const dropdownBlock = document.querySelector('.header__menu .dropdown');

		dropdownBlock.innerHTML = '';
		ganres.forEach((ganre) => {
			dropdownBlock.insertAdjacentHTML(
				'afterbegin',
				`
					<li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
				`
			);
		});
	};

	const renderAnimeDetails = (array, itemId) => {
		// Двойное равенство потому, что item.id - это число, а itemId - строка
		const animeObj = array.find((item) => item.id == itemId);
		const imageBlock = document.querySelector('.anime__details__pic');
		const viewsBlock = imageBlock.querySelector('.view');
		const titleBlock = document.querySelector('.anime__details__title h3');
		const subTitleBlock = document.querySelector('.anime__details__title span');
		const descriptionBlock = document.querySelector('.anime__details__text p');
		const vidgetList = document.querySelectorAll(
			'.anime__details__widget ul li'
		);
		const breadcrumb = document.querySelector('.breadcrumb__links span');
		console.log('breadcrumb: ', breadcrumb);

		if (animeObj) {
			imageBlock.dataset.setbg = animeObj.image;
			viewsBlock.innerHTML = '';
			viewsBlock.insertAdjacentHTML(
				'afterbegin',
				`
            <i class="fa fa-eye"></i>${animeObj.views}
         `
			);

			titleBlock.textContent = animeObj.title;
			subTitleBlock.textContent = animeObj['original-title'];
			descriptionBlock.textContent = animeObj.description;

			vidgetList[0].insertAdjacentHTML(
				'beforeend',
				`<span>Date aired:</span>${animeObj.date}`
			);
			vidgetList[1].insertAdjacentHTML(
				'beforeend',
				`<span>Rating:</span>${animeObj.rating}`
			);
			vidgetList[2].insertAdjacentHTML(
				'beforeend',
				`<span>Ganre:</span>${animeObj.tags.join(', ')}`
			);

			breadcrumb.textContent = animeObj.ganre;

			document.querySelectorAll('.set-bg').forEach((element) => {
				element.style.backgroundImage = `url(${element.dataset.setbg})`;
			});
			setTimeout(() => {
				preloader.classList.remove('active');
			}, 500);
		} else {
			console.log('Аниме отсутствует');
		}
	};

	preloader.classList.add('active');

	fetch('https://anime-site-2feee-default-rtdb.firebaseio.com/anime.json')
		// fetch('./db.json')
		.then((response) => response.json())
		.then((data) => {
			const ganres = new Set();
			const ganreParams = new URLSearchParams(window.location.search).get(
				'itemId'
			);
			console.log('ganreParams: ', ganreParams);

			data.forEach((item) => {
				ganres.add(item.ganre);
			});

			if (ganreParams) {
				renderAnimeDetails(data, ganreParams);
			} else {
				// renderAnimeDetails(data, ganres);
				console.log('Аниме отсутствует');
			}
			renderGanreList(ganres);
		});
};

detailData();
