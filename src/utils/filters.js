export const simpleFilter = (dataset, query) => {
  if (query === "") return dataset;
  return dataset.filter((data) => {
    return data.name.toLowerCase().includes(query.toLowerCase());
  });
};

// todo find better matching algo. Search distance struggles with fuzzy matching accurately. skywlker doesn't return Skywalker as a result.
export const stringDistance = (string1, string2) => {
  let length1 = string1.length;
  let length2 = string2.length;

  const memo = new Array(2).fill(new Array(length1 + 1).fill(0));

  for (let i = 0; i < 2; i++) {
    memo[i] = new Array(length1 + 1).fill(0);
  }

  for (let i = 1; i <= length2; i++) {
    for (let j = 0; j <= length1; j++) {
      if (j === 0) {
        memo[i % 2][j] = i;
      } else if (string1[j - 1] === string2[i - 1]) {
        memo[i % 2][j] = memo[(i - 1) % 2][j - 1];
      } else {
        memo[i % 2][j] =
          1 +
          Math.min(
            memo[(i - 1) % 2][j],
            Math.min(memo[i % 2][j - 1], memo[(i - 1) % 2][j - 1])
          );
      }
    }
  }

  return memo[length2 % 2][length1];
};