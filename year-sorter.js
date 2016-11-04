'use strict';

const arr = ['500', '1986', '1944', '1964', '826'];
const orderedArr = [];

var numArr = arr.map(function(string) {
    return Number(string);
});

numArr.sort(function(a, b) {
    return b - a;
});

console.log(numArr);
