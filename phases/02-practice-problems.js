function anagrams(str1, str2) {

const set1 = new Set(str1);
const set2 = new Set(str2);

for(let car of set1){
  if(!set2.has(car)) return false;
}

return true;
}


function commonElements(arr1, arr2) {

}


function duplicate(arr) {
  // Your code here
}


function twoSum(nums, target) {
  // Your code here
}


function wordPattern(pattern, strings) {
  // Your code here
}

anagrams('elvis', 'lives')


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
