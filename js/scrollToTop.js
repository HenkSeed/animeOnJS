const scrollToTop = () => {
	const topBtn = document.querySelector('#scrollToTopButton');

	topBtn.addEventListener('click', (e) => {
		e.preventDefault();

		// Скроллинг методом объекта window
		// window.scrollTo({
		// 	top: 0,
		// 	behavior: 'smooth',
		// });

		// Скроллинг методом seamless scroll polyfill
		seamless.scrollIntoView(document.querySelector('.header'), {
			behavior: 'smooth',
			block: 'center',
			inline: 'center',
		});
	});
};

scrollToTop();
