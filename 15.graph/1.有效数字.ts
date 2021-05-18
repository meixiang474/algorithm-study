// 65
// read

export {};
function isNumber(s: string) {
  const graph: Record<number, Record<string, number>> = {
    0: {
      blank: 0,
      sign: 1,
      '.': 2,
      digit: 6,
    },
    1: {
      digit: 6,
      '.': 2,
    },
    2: {
      digit: 3,
    },
    3: {
      digit: 3,
      e: 4,
    },
    4: {
      digit: 5,
      sign: 7,
    },
    5: {
      digit: 5,
    },
    6: {
      digit: 6,
      '.': 3,
      e: 4,
    },
    7: {
      digit: 5,
    },
  };
  let state = 0;
  for (let current of s.trim()) {
    current = current.toLowerCase();
    if (parseFloat(current) >= 0 && parseFloat(current) <= 9) {
      current = 'digit';
    } else if (current === ' ') {
      current = 'blank';
    } else if (current === '+' || current === '-') {
      current = 'sign';
    }
    state = graph[state][current];
    if (state == null) {
      return false;
    }
  }
  if (state === 3 || state === 5 || state === 6) {
    return true;
  }
  return false;
}
