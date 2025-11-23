/*
pivot accepts an array, starting index, and ending index
You can assume the pivot is always the first element
*/

// function pivotSort(arr) {
//   let pivot = arr[0];
//   let left = [];
//   let right = [];

//   for (let i = 1; i < arr.length; i++) {
//     if (arr[i] < pivot) {
//       left.push(arr[i]);
//     } else {
//       right.push(arr[i]);
//     }
//   }

//   arr.length = 0; // clear original array
//   arr.push(...left, pivot, ...right);

//   return arr;
// }

/*
quickSort accepts an array, left index, and right index
*/

function quickSort(arr) {
  if (arr.length <= 1) return arr;

  let pivot = arr[0];

  let left = [];

  let right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  let sortedLeft = quickSort(left);
  let sortedRight = quickSort(right);

  return [...sortedLeft, pivot, ...sortedRight];
  console.log([...sortedLeft, pivot, ...sortedRight]);
}

//module.exports = quickSort;
