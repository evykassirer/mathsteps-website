import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/steps.css';

export default class Step extends Component {
  static propTypes = {
    step: PropTypes.object // TODO flesh this out with shapeof
  };

  state = {
    substepsExpanded: false
  }

  printEquation(equation) {
    return `${equation.leftNode.toString()} ${equation.comparator} ${equation.rightNode.toString()}`;
  }

  printOldNode(step) {
    return step.oldNode ? step.oldNode.toString() : this.printEquation(step.oldEquation);
  }

  printNewNode(step) {
    return step.newNode ? step.newNode.toString() : this.printEquation(step.newEquation);
  }

  toggleSubsteps = () => {
    const {substepsExpanded} = this.state;

    this.setState({
      substepsExpanded: !substepsExpanded
    });
  }

  renderStep = (step) => {
    // todo unique key
    return <div className='step'>
      <div>{this.printNewNode(step)}</div>
    </div>;
  }

  renderSubsteps = (step) => {
    const substeps = step.substeps;

    if (substeps.length === 0) return null;

    return <div className='substeps'>
      {this.printOldNode(substeps[0])}
      {substeps.map(step => <Step step={step}/>)}
    </div>;
  }

  render() {
    const {step} = this.props;
    const {substepsExpanded} = this.state;

    const toggleText = <div onClick={this.toggleSubsteps}>
      <div className='toggleSubsteps'>
        {this.state.substepsExpanded ? '▼ collapse' : '► expand'}
      </div>
    </div>;

    return <div>
      {step.substeps.length > 0 && toggleText}
      {substepsExpanded && this.renderSubsteps(step)}
      {this.renderStep(step)}
    </div>
  }
}
