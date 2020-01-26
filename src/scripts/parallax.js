console.log("parallax in action");

// var parallax = (function () {
// 	var sky = document.querySelector('.parallax__layer--sky');
// 	var hills = document.querySelector('.parallax__layer--hills');
// 	var train = document.querySelector('.parallax__layer--train');
// 	var field = document.querySelector('.parallax__layer--field');
// 	var gradient = document.querySelector('.parallax__layer--gradient');

// 	return {
// 		move: function (block, windowScroll, strafeAmount) {
// 			var strafe = windowScroll / -strafeAmount + '%';
// 			var transformString = 'translate3d(0,' + strafe + ',0)';

// 			var style = block.style;

// 			style.transform = transformString;
// 			style.webkitTransform = transformString;
// 		},

// 		init: function (wScroll) {
// 			this.move(sky, wScroll, 45);
// 			this.move(hills, wScroll, 35);
// 			this.move(train, wScroll, 25);
// 			this.move(field, wScroll, 15);
// 			this.move(gradient, wScroll, 5);
// 		}
// 	}

// }());

// window.onscroll = function () {
// 	var wScroll = window.pageYOffset;

// 	parallax.init(wScroll);
// }

const parallax = document.querySelector('.parallax');

const layers = parallax.children;

function moveLayersDependsOnScroll(wScroll) {
	Array.from(layers).forEach(layer => {
		const divider = layer.dataset.speed;
		const strafe = wScroll * divider / 10;

		layer.style.transform = `translateY(-${strafe}%)`;
	})
};

window.addEventListener('scroll', e => {
	const wScroll = window.pageYOffset;
	moveLayersDependsOnScroll(wScroll);
});