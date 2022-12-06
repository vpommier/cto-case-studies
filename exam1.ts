function checkUniq(acc: string[], val: string, i: number): string[] {
  if (i === 0) {
    acc.push(val);
  } else {
    if (!acc.includes(val)) {
      acc.push(val);
    }
  }
  return acc;
}

function Wildcards(str: string): boolean {
  if (!str.includes(' ')) {
    return false;
  }
  const sStr = str.split(' ');
  const pattern = [...sStr[0]];
  const testedStr = [...sStr[1]];

  let j = 0;
  for (let i = 0; i < pattern.length; i++) {
    const patternChar = pattern[i];
    const testedChar = testedStr[j];

    console.log('pattern: ', patternChar, 'char: ', testedChar);

    if (patternChar === '+') {
      if (!/^[a-z]$/.test(testedChar)) {
        return false;
      }
    } else if (patternChar === '$') {
      if (!/^[1-9]$/.test(testedChar)) {
        return false;
      }
    } else if (patternChar === '*') {
      if (i === pattern.length - 1) {
        if (testedStr.slice(j).length !== 3) {
          return false;
        }
      }
      if (pattern[i + 1] === '{') {
        const n = Number(pattern[i + 2]);
        if (n < 1) {
          return false;
        }
        const slice = testedStr.slice(j, n);
        if (slice.reduce(checkUniq, []).length > 1) {
          return false;
        }
        i += 3;
        j += n - 1;
      } else {
        if (testedStr.slice(j, j + 3).reduce(checkUniq, []).length > 1) {
          return false;
        }
        j += 2;
      }
    } else {
      return false;
    }
    j++;
  }

  return true;
}

const r = Wildcards('$**+*{2}$+* 9mmmrrrkbb7ejjj');
console.log(r);
