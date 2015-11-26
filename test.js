'use strict';

var test = require('tape');
var decToRoman = require('./decToRoman.js');

var numerals = [
    [1, 'I'],
    [5, 'V'],
    [10, 'X'],
    [50, 'L'],
    [100, 'C'],
    [500, 'D'],
    [1000, 'M']
];

var additions = [
    [2, 'II'],
    [3, 'III'],
    [6, 'VI'],
    [7, 'VII'],
    [8, 'VIII'],
    [11, 'XI'],
    [12, 'XII'],
    [13, 'XIII'],
    [95, 'XCV'],
    [3999, 'MMMCMXCIX']
];

var subtractions = [
    [4, 'IV'],
    [9, 'IX'],
    [14, 'XIV'],
    [40, 'XL'],
    [1900, 'MCM']
];

var shortest = [
    [99, 'XCIX']
];


function process(cases, testMsg) {
    test(testMsg, function(t) {
        t.plan(cases.length);

        cases.forEach(function(el) {
            var num = el[0], roman = el[1];
            t.equal(decToRoman(num), roman, num+' -> ' + roman);
        });
    });
}

test('exception handling', function(t) {
    var tests = [
        [[0.4], 'throw an error when float is given'],
        [[null], 'throw an error when null is given'],
        [[undefined], 'throw an error when null is given'],
        [[0], 'throw an error when \'0\' is given'],
        [[-12], 'throw an error when negative is given'],
        [[4000], 'throw an error when number larger than 3999 is given'],
    ];

    t.plan(tests.length);

    tests.forEach(function(obj) {
        try {
            decToRoman.apply(this, obj[0]);
            t.fail('it should ' + obj[1]);
        } catch (e) {
            t.pass('it does ' + obj[1]);
        }

    });
});

test('Checking if any supported number throws an error', function(t) {

    var i = 4000,
        fail = false;
    while (--i) {
        try {
            decToRoman(i);
        } catch (e) {
            t.fail('it should convert ' + i + ' instead of throwing ' + (e.msg || e));
            fail = true;
        }
    }

    if (!fail) {
        t.pass('all supported numbers can be transformed');
    }

    t.end();
});

process(numerals, 'Basic numerals');
process(additions, 'additions');
process(subtractions, 'subtractions');
process(shortest, 'shortest');
