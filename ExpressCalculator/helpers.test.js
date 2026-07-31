const { parseNums, mean, median, mode } = require("./helpers");

describe("parseNums", function () {
  test("converts a comma string into numbers", function () {
    expect(parseNums("1,3,5")).toEqual([1, 3, 5]);
  });

  test("throws a non-numeric input", function () {
    expect(() => parseNums("foo,2")).toThrow("foo is not a number");
  });
});

describe("mean", function () {
  test("calculates the average", function () {
    expect(mean([1, 3, 5, 7])).toEqual(4);
  });
});

describe("median", function () {
  test("find the median in an even array of numbers", function () {
    expect(median([1, 3, 5, 7])).toEqual(4);
  });
  test("find the median in an odd array of numbers", function () {
    expect(median([1, 3, 5, 7, 9])).toEqual(5);
  });
});

describe("mode", function () {
  test("find how many times each number is in an array and return the number that is most prominent", function () {
    expect(mode([1, 3, 5, 7, 7, 7])).toEqual(7);
  });
});
