'use strict';

var colorQuantize = require('../lib/color-quantize.js');

/*
	======== A Handy Little Nodeunit Reference ========
	https://github.com/caolan/nodeunit

	Test methods:
		test.expect(numAssertions)
		test.done()
	Test assertions:
		test.ok(value, [message])
		test.equal(actual, expected, [message])
		test.notEqual(actual, expected, [message])
		test.deepEqual(actual, expected, [message])
		test.notDeepEqual(actual, expected, [message])
		test.strictEqual(actual, expected, [message])
		test.notStrictEqual(actual, expected, [message])
		test.throws(block, [error], [message])
		test.doesNotThrow(block, [error], [message])
		test.ifError(value)
*/

exports['color-quantize'] = {
	setUp: function (done) {
		// setup here
		done();
	},
	'websafe / websmart counts': function (test) {
		var iterations = 32;
		var websafeHash = {}, websmartHash = {}, websafeResult, websmartResult, rgb;
		test.expect(Math.pow(32, 3) * 6 + 2);
		for (var r = 0; r < iterations; r++) {
			for (var g = 0; g < iterations; g++) {
				for (var b = 0; b < iterations; b++) {
					rgb = 'rgb(' + [r,g,b].join(',') + ')';
					// websafe
					websafeResult = colorQuantize.websafe(rgb);
					websafeHash[websafeResult] = 1;
					test.ok(typeof websafeResult === 'string');
					test.ok(websafeResult.indexOf('#') === 0);
					test.ok(websafeResult.length === 7);
					// websmart
					websmartResult = colorQuantize.websmart(rgb);
					websmartHash[websmartResult] = 1;
					test.ok(typeof websmartResult === 'string');
					test.ok(websmartResult.indexOf('#') === 0);
					test.ok(websmartResult.length === 7);
				}
			}
		}
		test.equal(Object.keys(websafeHash).length, 8);
		test.equal(Object.keys(websmartHash).length, 27);
		test.done();
	},
	'#cd1289': function (test) {
		var rgb = '#cd1289';
		test.expect(2);
		test.equal(colorQuantize.websafe(rgb), '#cc0099');
		test.equal(colorQuantize.websmart(rgb), '#cc1188');
		test.done();
	}
};
