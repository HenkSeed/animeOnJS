const modal = () => {
	const searchModal = document.querySelector('.search-model');

	const iconBtn = document.querySelector('.icon_search');

	const searchClose = searchModal.querySelector('.search-close-switch');

	// Находим строку поиска
	const searchInput = document.getElementById('search-input');
	// После отпускания клавиши, выводим в консоль содержимое строки поиска
	searchInput.addEventListener('keyup', () => {
		console.log(searchInput.value);
	});

	iconBtn.addEventListener('click', () => {
		searchModal.classList.add('active');
	});

	searchClose.addEventListener('click', () => {
		searchModal.classList.remove('active');
	});
};

modal();
