'use strict';

var mappingHash = {
    1000:   { 1: 'M' },
    100:    { 1: 'C', 5: 'D' },
    10:     { 1: 'X', 5: 'L' },
    1:      { 1: 'I', 5: 'V' }
};

var keys = Object.keys(mappingHash);
keys.sort().reverse();

var decToRoman = function(input) {
    var dec = parseInt(input, 10);

    if (dec != input || dec <= 0 || dec >= 4000) {
        throw new Error('Unsupported input');
    }

    var rem = dec,
        i = 0,
        response = '',
        ones,
        keyInt;

    for (; i < keys.length; i++) {
        keyInt = parseInt(keys[i], 10);
        if (rem < keyInt) { continue; }

        ones = Math.floor(rem/keyInt);
        if (ones == 9) {
            response += get(1, 1, keyInt) + get(1, 1, keys[i-1]);
        } else if (ones >= 5) {
            response += get(1, 5, keyInt) + get(ones - 5, 1, keyInt);
        } else if (ones == 4) {
            response += get(1, 1, keyInt) + get(1, 5, keyInt);
        } else if (ones < 4) {
            response += get(ones, 1, keyInt);
        } else {
            throw new Error('Internal error.');
        }

        rem = rem % keyInt;
    }

    return response;
};


var get = function(how, what, where) {
    var res = '';
    while(how--){
        res += mappingHash[where][what];
    }
    return res;
};

module.exports = decToRoman;
