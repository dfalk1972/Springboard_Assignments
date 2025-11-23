function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums) {
  let max = 0;
  for (let num of nums) {
    max = Math.max(max, digitCount(num));
  }
  return max;
}

function radixSort(nums) {
  let maxDigitCount = mostDigits(nums);

  for (let k = 0; k < maxDigitCount; k++) {
    let buckets = Array.from({ length: 10 }, () => []);

    for (let i = 0; i < nums.length; i++) {
      let digit = getDigit(nums[i], k);
      buckets[digit].push(nums[i]);
    }

    nums = [].concat(...buckets);
  }

  return nums;
}

// module.exports = radixSort;
