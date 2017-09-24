import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/steps.css';
import print from '../print.js';

export default class Step extends Component {
  static propTypes = {
    step: PropTypes.object, // TODO flesh this out with shapeof
    index: PropTypes.string
  };

  state = {
    substepsExpanded: false
  }

  toggleSubsteps = () => {
    const {substepsExpanded} = this.state;

    this.setState({
      substepsExpanded: !substepsExpanded
    });
  }

  renderStep = (step) => {
    return <div className='step'>
      <div>{print.newNode(step)}</div>
    </div>;
  }

  renderSubsteps = (step) => {
    const substeps = step.substeps;

    if (substeps.length === 0) return null;

    return <div className='substeps'>
      {print.oldNode(substeps[0])}
      {substeps.map((step, index) => <Step
        step={step}
        key={this.props.index + index.toString()}
      />)}
    </div>;
  }

  render() {
    const {step} = this.props;
    const {substepsExpanded} = this.state;

    const toggleText = <div onClick={this.toggleSubsteps}>
      <div className='toggleSubsteps'>
        {this.state.substepsExpanded ? '▼' : '►'} substeps
      </div>
    </div>;

    return <div key={print.oldNode(step)}>
      {step.substeps.length > 0 && toggleText}
      {substepsExpanded && this.renderSubsteps(step)}
      {this.renderStep(step)}
    </div>
  }
}
