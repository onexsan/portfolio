(function parallax() {
	let parallax = document.querySelectorAll('.parallax');
	let windowWidth = null;

	function moveLayersDependsOnScroll(parallax, percent) {
		const windowOffset = window.pageYOffset;
		const parallaxOffsetTop = parallax.parentElement.offsetTop;
		const parallaxOffsetBottom = parallaxOffsetTop + parallax.clientHeight;
		const scroll = windowOffset - parallaxOffsetTop + (window.innerHeight / 100 * percent);

		if (windowOffset >= parallaxOffsetTop - (window.innerHeight / 2) && windowOffset <= parallaxOffsetBottom) {
			[...parallax.children].forEach(layer => {
				const divider = layer.dataset.speed;
				const strafe = scroll * divider / 10;

				layer.style.transform = `translateY(-${strafe}%) translateZ(0)`;
			});
		}
	}

	if (windowWidth > 768) {
		[...parallax].forEach(parallax => {
			const percent = parallax.dataset.percent || 0;


			window.addEventListener('scroll', () => {
				moveLayersDependsOnScroll(parallax, percent);
			});
		});
	}
})();
