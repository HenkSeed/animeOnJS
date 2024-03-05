const categoriesData = () => {
	const preloader = document.querySelector('.preloder');

	const renderGanreList = (ganres) => {
		const dropdownBlock = document.querySelector('.header__menu .dropdown');
		console.log('dropdownBlock: ', dropdownBlock);

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

	const renderAnimeList = (array, ganres) => {
		const wrapper = document.querySelector('.product-page .col-lg-8');
		// console.log('array: ', array);

		// wrapper.innerHTML = '';

		ganres.forEach((ganre) => {
			const productBlock = document.createElement('div');
			const listBlock = document.createElement('div');
			const list = array.filter((item) => item.tags.includes(ganre));

			listBlock.classList.add('row');
			productBlock.classList.add('mb-5');

			// wrapper.querySelectorAll('.set-bg').forEach((element) => {
			// 	element.style.backgroundImage = `url(${element.dataset.setbg})`;
			// });

			productBlock.insertAdjacentHTML(
				'afterbegin',
				`
				<div class="row">
					<div class="col-lg-8 col-md-8 col-sm-8">
						<div class="section-title">
							<h4>${ganre}</h4>
						</div>
					</div>
					<div class="col-lg-4 col-md-4 col-sm-4">
						<div class="btn__all">
						<a href="/categories.html?${ganre}" class="primary-btn"
								>View All <span class="arrow_right"></span
							></a>
						</div>
					</div>
				</div>	
			`
			);

			list.forEach((item) => {
				const tagsBlock = document.createElement('ul');

				item.tags.forEach((tag) => {
					tagsBlock.insertAdjacentHTML(
						'afterbegin',
						`
							<li>${tag}</li>
						`
					);
				});

				listBlock.insertAdjacentHTML(
					'afterbegin',
					`
					<div class="col-lg-4 col-md-6 col-sm-6">
						<div class="product__item">
							<div
								class="product__item__pic set-bg"
								data-setbg="${item.image}"
							>
								<div class="ep">${item.rating} / 10</div>
								<div class="view"><i class="fa fa-eye"></i>${item.views}</div>
							</div>
							<div class="product__item__text">
								<ul>
									${tagsBlock.outerHTML}
								</ul>
								<h5>
									<a href="/anime-details.html?itemId=${item.id}"
										>${item.title}</a
									>
								</h5>
							</div>
						</div>
					</div>
				`
				);
			});

			productBlock.append(listBlock);
			wrapper.append(productBlock);

			wrapper.querySelectorAll('.set-bg').forEach((element) => {
				element.style.backgroundImage = `url(${element.dataset.setbg})`;
			});
		});
		setTimeout(() => {
			preloader.classList.remove('active');
		}, 500);
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
		.then((response) => response.json())
		.then((data) => {
			const ganres = new Set();
			const ganreParams = new URLSearchParams(window.location.search).get(
				'ganre'
			);
			console.log('ganreParams: ', ganreParams);

			data.forEach((item) => {
				ganres.add(item.ganre);
			});

			renderTopAnime(
				data
					// Согласен, немного извратно )
					.sort((a, b) => a.views - b.views)
					.slice(-5)
					.reverse()
			);
			if (ganreParams) {
				renderAnimeList(data, [ganreParams]);
			} else {
				renderAnimeList(data, ganres);
			}
			renderGanreList(ganres);
		});
};

categoriesData();
