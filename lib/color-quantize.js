/*
 * color-quantize
 * https://github.com/skratchdot/color-quantize
 * 
 * NOTE: Original inspiration, and code adapted from: http://mudcu.be/sphere/
 *
 * Copyright (c) 2014 skratchdot
 * Licensed under the MIT license.
 */

'use strict';

var onecolor = require('onecolor');

var isInt = function (n) {
   return typeof n === 'number' && n % 1 === 0;
};

var quantize = function (color, key, quantizeAmount) {
	var value = Math.round(color[key]() * 255);
	value = ((value + quantizeAmount / 2) / quantizeAmount >> 0) * quantizeAmount;
	return color[key](value / 255);
};

exports.quantize = function (colorString, quantizeAmount) {
	var color = onecolor(colorString);
	if (!color) {
		color = onecolor('#000000');
	}
	if (!isInt(quantizeAmount)) {
		throw new Error('quantizeAmount must be an integer');
	}
	// quantize rgb
	color = quantize(color, 'red', quantizeAmount);
	color = quantize(color, 'green', quantizeAmount);
	color = quantize(color, 'blue', quantizeAmount);
	// return hex value
	return color.hex();
};

// 216 color palette
exports.websafe = function (colorString) {
	return exports.quantize(colorString, 51);
};

// 4096 color palette
exports.websmart = function (colorString) {
	return exports.quantize(colorString, 17);
};
