import React, { Component } from 'react';
import PropTypes from 'prop-types';
// this should be just mathsteps and not mathsteps-test once we have
// webpack ready
import mathsteps from 'mathsteps-test';

import Step from './Step.jsx';
import '../styles/steps.css';

export default class Steps extends Component {
  static propTypes = {
    input: PropTypes.string
  };

  // TODO move these to a separate file
  printEquation(equation) {
    return `${equation.leftNode.toString()} ${equation.comparator} ${equation.rightNode.toString()}`;
  }

  printOldNode(step) {
    return step.oldNode ? step.oldNode.toString() : this.printEquation(step.oldEquation);
  }

  isEquation(mathInput) {
    const comparators = ['<=', '>=', '=', '<', '>'];
    let isEquation = false;

    comparators.forEach(comparator => {
      if (mathInput.includes(comparator)) isEquation = true;
    });
    return isEquation;
  }

  renderSteps = (steps) => {
    const renderedSteps = steps.map(step => <Step step={step}/>);
    return <div>
      {this.printOldNode(steps[0])}
      {renderedSteps}
    </div>;
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
