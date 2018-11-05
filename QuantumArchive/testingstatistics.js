const stats = require('simple-statistics');

console.log(stats.mean([1,2,3,4,5,6,7,8,9,10]));
console.log(stats.standardDeviation([1,2,3,4,5,6,7,8,9,10]));

var testpowerarray = [255, 1000, 300, 5, 415, 600, 999, 1, 4, 3, 550];

var tempvalue = 0;

for(let i = 0; i < testpowerarray.length; i++) {
    tempvalue += testpowerarray[i];
};

console.log(tempvalue/testpowerarray.length);