var parallax = (function () {
	var sky = document.querySelector('.parallax__layer--sky');
	var hills = document.querySelector('.parallax__layer--hills');
	var train = document.querySelector('.parallax__layer--train');
	var field = document.querySelector('.parallax__layer--field');
	var topGradient = document.querySelector('.parallax__layer--t-gradient');
	var bottomGradient = document.querySelector('.parallax__layer--b-gradient');

	return {
		move: function (block, windowScroll, strafeAmount) {
			var strafe = windowScroll / -strafeAmount + '%';
			var transformString = 'translate3d(0,' + strafe + ',0)';

			var style = block.style;

			style.transform = transformString;
			style.webkitTransform = transformString;
		},

		init: function (wScroll) {
			this.move(sky, wScroll, 55);
			this.move(hills, wScroll, 45);
			this.move(train, wScroll, 30);
			this.move(field, wScroll, 15);
			this.move(topGradient, wScroll, 5);
			this.move(bottomGradient, wScroll, 3);
		}
	}
}());

window.onscroll = function () {
	var wScroll = window.pageYOffset;
	parallax.init(wScroll);

	console.log(wScroll);
}