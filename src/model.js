import { randomNum, randomOprator, getSolve } from './helper';

export const state = {
  equations: [],
  equationsSolve: [],
  numbersRange: 10,
  equationsCount: 10,
};

export const generateEquations = function (equCount, difficulty) {
  state.equations = [];
  state.equationsSolve = [];
  for (let i = 0; i < equCount; i++) {
    const num1 = randomNum(state.numbersRange - 1) + 1;
    const num2 = randomNum(state.numbersRange - 1) + 1;
    const operator2 = randomOprator(3);
    let equation;

    if (difficulty === 'easy') {
      const operator1 = randomOprator(2);
      equation = `${num1} ${operator1} ${num2}`;
    }

    if (difficulty === 'normal') {
      equation = `${num1} ${operator2} ${num2}`;
    }

    if (difficulty === 'hard') {
      const num3 = randomNum(state.numbersRange - 1) + 1;
      const operator3 = randomOprator(3);
      equation = `${num1} ${operator2} ${num2} ${operator3} ${num3}`;
    }

    state.equations.push(equation);
    state.equationsSolve.push(getSolve(equation));
  }
};
