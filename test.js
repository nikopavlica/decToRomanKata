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
    [95, 'XCV']
];

var subtractions = [
    [4, 'IV'],
    [9, 'IX'],
    [14, 'XIV'],
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

process(numerals, 'Basic numerals');
process(additions, 'additions');
process(subtractions, 'subtractions');
process(shortest, 'shortest');
