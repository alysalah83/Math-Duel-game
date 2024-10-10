import * as model from './model.js';
import view from './view.js';

const controllCardFace = function () {
  // generating the equations and the solve
  model.generateEquations(model.state.equationsCount);

  //render math equtions and solve in cards face
  view.render(model.state.equations, model.state.equationsSolve);
};

const init = function () {
  view.addHandlerPlayClick(controllCardFace);
};
init();
