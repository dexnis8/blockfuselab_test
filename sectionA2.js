/**
 * Finds two indices in the array such that the numbers at those indices add up to the target value.
 *
 * @param {number[]} nums - The array of integers.
 * @param {number} target - The target sum.
 * @returns {number[]} - The indices of the two numbers that add up to the target.
 */

/* 
APPROACH USED
1. I looped through the array of nums
2. At each Iteration,  I assigned the value 

*/

function twoSum(nums, target) {
  const numToIndex = {};

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const complementNumber = target - num;
    if (numToIndex.hasOwnProperty(complementNumber)) {
      return [numToIndex[complementNumber], i];
    }
    numToIndex[num] = i;
  }
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9));
console.log(twoSum([3, 2, 4], 5));
console.log(twoSum([3, 3], 6));
console.log(twoSum([-1, -2, -3, -4, -5], -8));
console.log(twoSum([0, 4, 3, 0], 0));
