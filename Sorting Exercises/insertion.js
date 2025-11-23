function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let temp = arr[i];

    let j = i - 1;
    //run as long as j is greater than 0 and j is less than the key which is
    while (j >= 0 && arr[j] > temp) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = temp;
  }
  return arr;
  console.log(arr);
}
