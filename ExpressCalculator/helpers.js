function parseNums(numsAsString) {
  if (!numsAsString) throw new Error("Numbers are required");
  const stringArray = numsAsString.split(",");
  const numbers = stringArray.map(Number);
  for (let i = 0; i < numbers.length; i++) {
    if (Number.isNaN(numbers[i])) {
      throw new Error(`${stringArray[i]} is not a number`);
    }
  }
  return numbers;
}

function mean(nums) {
  let sum = 0;
  for (const num of nums) {
    sum += num;
  }
  return sum / nums.length;
}

function median(nums) {
  const sortedNums = nums.sort((a, b) => a - b);
  const middle = Math.floor(sortedNums.length / 2);
  if (nums.length % 2 === 0) {
    return (sortedNums[middle - 1] + sortedNums[middle]) / 2;
  } else {
    return sortedNums[middle];
  }
}

function mode(nums) {
  let modeObject = {};
  for (const num of nums) {
    if (!(num in modeObject)) {
      modeObject[num] = 1;
    } else {
      modeObject[num] += 1;
    }
  }

  let bestNum;
  let bestCount = 0;
  for (let num in modeObject) {
    if (modeObject[num] > bestCount) {
      bestCount = modeObject[num];
      bestNum = num;
    }
  }
  return Number(bestNum);
}

module.exports = { mean, median, mode, parseNums };
