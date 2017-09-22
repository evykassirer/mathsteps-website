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

  renderStep = (step) => {
    const topLevelOld = <div>{step.oldNode.toString()}</div>;
    const subSteps = <div className='substeps'>
      {this.renderSteps(step.substeps)}
    </div>;
    const topLevelNew = <div>{step.newNode.toString()}</div>;

    // todo unique key
    return <div className='step' key={step.newNode.toString()}>
      {topLevelOld}
      {subSteps}
      {topLevelNew}
    </div>;
  }

  renderSteps = (steps) => {
    const renderedSteps = steps.map(this.renderStep);
    console.log(renderedSteps)
    return <div>
      {renderedSteps}
    </div>
  }

  render() {
    const steps = mathsteps.simplifyExpression(this.props.input);

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
