export const randomNum = function (range) {
  return Math.floor(Math.random() * range);
};

export const randomOprator = function (choseOprator) {
  const oprator = ['+', '-', '*'];
  return oprator[randomNum(choseOprator)];
};

export const getSolve = function (equ) {
  const arr = equ.split(' ');
  if (arr.length === 1) return parseInt(equ);
  const [numStr1, operator, numStr2, operator2 = false, numStr3 = false] = arr;
  const num1 = parseInt(numStr1);
  const num2 = parseInt(numStr2);
  const num3 = numStr3 === false ? false : parseInt(numStr3);
  if (!operator2) {
    if (operator === '+') return num1 + num2;
    if (operator === '-') return num1 - num2;
    if (operator === '*') return num1 * num2;
    return false;
  }

  if (operator2) {
    if (operator === '+') {
      if (operator2 === '+') return num1 + num2 + num3;
      if (operator2 === '-') return num1 + num2 - num3;
      if (operator2 === '*') return num1 + num2 * num3;
    }
    if (operator === '-') {
      if (operator2 === '+') return num1 - num2 + num3;
      if (operator2 === '-') return num1 - num2 - num3;
      if (operator2 === '*') return num1 - num2 * num3;
    }
    if (operator === '*') {
      if (operator2 === '+') return num1 * num2 + num3;
      if (operator2 === '-') return num1 * num2 - num3;
      if (operator2 === '*') return num1 * num2 * num3;
    }
    return false;
  }
};

export const randomConcat = function (arr1, arr2) {
  const arr = [...arr1, ...arr2];

  for (let i = arr.length - 1; i > 0; i--) {
    const randomIndex = randomNum(i + 1);
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }

  return arr;
};
