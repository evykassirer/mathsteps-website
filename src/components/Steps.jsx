import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TeX from '../react-components/tex.jsx';
import mathsteps from 'mathsteps';

import print from '../print.js';
import Step from './Step.jsx';
import '../styles/steps.css';

export default class Steps extends Component {
  static propTypes = {
    input: PropTypes.string
  };

  isEquation(mathInput) {
    const comparators = ['<=', '>=', '=', '<', '>'];
    let isEquation = false;

    comparators.forEach(comparator => {
      if (mathInput.includes(comparator)) isEquation = true;
    });
    return isEquation;
  }

  renderSteps = (steps) => {
    const renderedSteps = steps.map(
      (step, index) => <Step step={step} key={index}/>);
    return <div>
      <div className='latex'><TeX>{print.oldNode(steps[0])}</TeX></div>
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
        No steps for this input :( <br/><br/>
        This is probably because either: <br/>
        1. We don't support this math<br/>
        2. This is already simplified/solved<br/>
        3. We had trouble parsing your input
      </div>;
    }

    return <div className='steps'>
      {this.renderSteps(steps)}
    </div>;
  }
}
