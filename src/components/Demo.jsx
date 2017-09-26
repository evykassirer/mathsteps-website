import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

import Steps from './Steps.jsx';
import '../styles/demo.css';

export default class App extends Component {
  state = {
    mathString: '2x + 4 + 5x + 4'
  };

  onMathStringChange = (_, newValue) => {
    this.setState({
      mathString: newValue
    });
  }

  render() {
    // TODO: render input in tex as it's being drawn
    return <div className='demo'>
      <div className='input'>
        <span className='yourInput'>
          Your input
        </span>
        <TextField
          name='mathString'
          value={this.state.mathString}
          onChange={this.onMathStringChange}
          underlineFocusStyle={{borderColor: '#1d84ff'}}
        />
      </div>
      <div className="stepsTitle">Steps</div>
      <Steps input={this.state.mathString}/>
    </div>;
  }
}
