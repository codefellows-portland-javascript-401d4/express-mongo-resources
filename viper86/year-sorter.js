'use strict';


// this code will take data from the database and return an array of the 'created' years in descending order

var numArr = arr.map(function(string) {
    return Number(string);
});

numArr.sort(function(a, b) {
    return b - a;
});

console.log(numArr);
