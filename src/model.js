import { randomNum, randomOprator, getSolve } from './helper';

export const state = {
  equations: [],
  equationsSolve: [],
  numbersRange: 10,
  equationsCount: 10,
};

export const generateEquations = function (equCount) {
  state.equations = [];
  state.equationsSolve = [];
  for (let i = 0; i < equCount; i++) {
    const num1 = randomNum(state.numbersRange - 1) + 1;
    const num2 = randomNum(state.numbersRange - 1) + 1;
    const operator = randomOprator();

    const equation = `${num1} ${operator} ${num2}`;
    state.equations.push(equation);
    state.equationsSolve.push(getSolve(equation));
  }
};
