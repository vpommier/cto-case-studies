function parseMatrixStr(strArr: string[]): number[][] {
  return strArr
    .map(str => [...str])
    .map(strArr => strArr.map(str => Number(str)));
}

function isConsecutive(n: number, m: number): boolean {
  return m - n === 1;
}

function foo(matrix: number[][], i: number, j: number, nbHop: number): number {
  // can go right
  if (j + 1 < matrix[i].length) {
    const k = j + 1;
    if (isConsecutive(matrix[i][j], matrix[i][k])) {
      const nb = foo(matrix, i, k, nbHop + 1);
      if (nb >= nbHop) {
        nbHop = nb;
      }
    }
  }
  // can go down
  if (i + 1 < matrix.length) {
    const k = i + 1;
    if (isConsecutive(matrix[i][j], matrix[k][j])) {
      const nb = foo(matrix, k, j, nbHop + 1);
      if (nb >= nbHop) {
        nbHop = nb;
      }
    }
  }
  // can go up
  if (i - 1 >= 0) {
    const k = i - 1;
    if (isConsecutive(matrix[i][j], matrix[k][j])) {
      const nb = foo(matrix, k, j, nbHop + 1);
      if (nb >= nbHop) {
        nbHop = nb;
      }
    }
  }
  // can go left
  if (j - 1 >= 0) {
    const k = j - 1;
    if (isConsecutive(matrix[i][j], matrix[i][k])) {
      const nb = foo(matrix, i, k, nbHop + 1);
      if (nb >= nbHop) {
        nbHop = nb;
      }
    }
  }

  return nbHop;
}

function LongestMatrixPath(strArr: string[]): number {
  const matrix = parseMatrixStr(strArr);

  let max = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const nb = foo(matrix, i, j, 0);
      if (nb >= max) {
        max = nb;
      }
    }
  }
  return max;
}

const r = LongestMatrixPath(['67', '21', '45']);
console.log(r);
