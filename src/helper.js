export const randomNum = function (range) {
  return Math.floor(Math.random() * range);
};

export const randomOprator = function () {
  const oprator = ['+', '*', '-'];
  return oprator.at(randomNum(3) - 1);
};

export const getSolve = function (equ) {
  const arr = equ.split(' ');
  if (arr.length === 1) return parseInt(equ);
  const [numStr1, oprator, numStr2] = arr;
  const num1 = parseInt(numStr1);
  const num2 = parseInt(numStr2);

  if (oprator === '+') return num1 + num2;
  if (oprator === '-') return num1 - num2;
  if (oprator === '*') return num1 * num2;
  return false;
};

export const randomConcat = function (arr1, arr2) {
  const arr = [...arr1, ...arr2];
  console.log(arr);

  for (let i = arr.length - 1; i > 0; i--) {
    const randomIndex = randomNum(i + 1);
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }

  console.log(arr);
  return arr;
};
