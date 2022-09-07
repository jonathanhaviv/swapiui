export const simpleFilter = (dataset, query) => {
  if (query === "") return dataset;
  return dataset.filter((data) => {
    return data.name.toLowerCase().includes(query.toLowerCase());
  });
};

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


// Jaro-Winkler algorithm better at matching names with spaces than just string distance
const jaroDistance = (string1, string2) => {
  if (string1 == string2) return 1.0;

  let length1 = string1.length,
    length2 = string2.length;

  if (length1 == 0 || length2 == 0) return 0.0;

  const maxDistance = Math.floor(Math.max(length1, length2) / 2) - 1;

  let match = 0;

  const stringHash1 = new Array(string1.length).fill(0);
  const stringHash2 = new Array(string2.length).fill(0);

  for (let i = 0; i < length1; i++) {
    for (
      let j = Math.max(0, i - maxDistance);
      j < Math.min(length2, i + maxDistance + 1);
      j++
    )
      if (string1[i] == string2[j] && stringHash2[j] == 0) {
        stringHash1[i] = 1;
        stringHash2[j] = 1;
        match++;
        break;
      }
  }

  if (match == 0) return 0.0;

  let t = 0;

  let point = 0;

  for (let i = 0; i < length1; i++)
    if (stringHash1[i] == 1) {
      while (stringHash2[point] == 0) point++;

      if (string1[i] != string2[point++]) t++;
    }
  t /= 2;

  return (match / length1 + match / length2 + (match - t) / match) / 3.0;
};

export const jaroWinkler = (string1, string2) => {
  let jaroDist = jaroDistance(string1, string2);

  if (jaroDist > 0.7) {
    let prefix = 0;

    for (let i = 0; i < Math.min(string1.length, string2.length); i++) {
      if (string1[i] == string2[i]) prefix++;
      else break;
    }

    prefix = Math.min(4, prefix);

    jaroDist += 0.1 * prefix * (1 - jaroDist);
  }
  return jaroDist.toFixed(6);
};