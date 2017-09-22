import React, { Component } from 'react';
import PropTypes from 'prop-types';
// this should be just mathsteps and not mathsteps-test once we have
// webpack ready
import mathsteps from 'mathsteps-test';

import '../styles/steps.css';

export default class Steps extends Component {
  static propTypes = {
    input: PropTypes.string
  };

  printEquation(equation) {
    return `${equation.leftNode.toString()} ${equation.comparator} ${equation.rightNode.toString()}`;
  }

  renderStep = (step) => {
    const topLevelOld = <div>
      {step.oldNode ? step.oldNode.toString() : this.printEquation(step.oldEquation)}
    </div>;
    const subSteps = <div className='substeps'>
      {this.renderSteps(step.substeps)}
    </div>;
    const topLevelNew = <div>
      {step.newNode ? step.newNode.toString() : this.printEquation(step.newEquation)}
    </div>;

    // todo unique key
    return <div className='step'>
      {topLevelOld}
      {subSteps}
      {topLevelNew}
    </div>;
  }

  renderSteps = (steps) => {
    const renderedSteps = steps.map(this.renderStep);
    return <div>
      {renderedSteps}
    </div>
  }

  isEquation(mathInput) {
    const comparators = ['<=', '>=', '=', '<', '>'];
    let isEquation = false;

    comparators.forEach(comparator => {
      if (mathInput.includes(comparator)) isEquation = true;
    });
    return isEquation;
  }

  render() {
    const {input} = this.props;
    const isEquation = this.isEquation(input);
    const steps = isEquation
      ? mathsteps.solveEquation(input)
      : mathsteps.simplifyExpression(input);

    if (steps.length === 0) {
      return <div className='error'>
        No steps for this input :( <br/>
        Either we don't support this math, or we had trouble parsing your input
      </div>;
    }

    return <div className='steps'>
      {this.renderSteps(steps)}
    </div>;
  }
}
