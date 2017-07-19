
module.exports.fillArray = (value, length) => {
	const arr = [];
	while (arr.length < length) arr.push(value);
	return arr;
};


// import tweenFunctions from 'tween-functions';
//
// /*
//  TODO:
//   - Validate destination as int or dom element
//  */
//
// module.exports.scrollTo = (destination, overrides) => {
// 	const defaults = {
// 		container: window,
// 		duration: 500,
// 		easing: 'easeOutQuad',
// 	};
// 	const config = { ...defaults, ...overrides };
// 	if (typeof tweenFunctions[config.easing] !== 'function') {
// 		console.warn(`${config.easing} is not a valid easing function.`);
// 		config.easing = defaults.easing;
// 	}
//
// 	const startY = config.container.scrollTop;
// 	const destY = destination.offsetTop;
// 	const startTime = Date.now();
//
// 	if (config.duration === 0) {
// 		config.container.scrollTop = destY;
// 		if (config.callback) config.callback();
// 		return;
// 	}
//
// 	if (startY === destY) {
// 		if (config.callback) config.callback();
// 		return;
// 	}
//
// 	function tween() {
// 		const elapsed = Math.min(Date.now() - startTime, config.duration);
// 		const newTop = tweenFunctions[config.easing](elapsed, startY, destY, config.duration);
// 		config.container.scrollTop = newTop;
//
//
// 		if (elapsed < config.duration) {
// 			requestAnimationFrame(tween);
// 		} else if (config.callback) {
// 			config.callback();
// 		}
// 	}
//
// 	requestAnimationFrame(tween);
// };


/**
 * Combines any number of array or string arguments into a single, space-separated className string
 * @param  {string|array} input		'class1', ['class2', 'class1--modifier'], 'class3'
 * @return {string}       				'class1 class2 class1--modifier class3'
 */
module.exports.cn = (...input) => {
	const allNames = [];
	for (const piece of input) {
		if (piece) {
			if (typeof piece === 'string') {
				allNames.push(...piece.split(' '));
			} else if (piece.constructor === Array) {
				allNames.push(...piece);
			} else {
				console.warn(`Input must be string or array, ${typeof piece} given.`);
			}
		}
	}
	return allNames.join(' ');
};

module.exports.findOne = (haystack, needles) => needles.some(needle => haystack.indexOf(needle) >= 0);

module.exports.slugify = text => text.toString().toLowerCase().replace(/\s+/g, '-');