import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import logo from './logo.png';
import Demo from './components/Demo.jsx'
import './styles/App.css';

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
          <div className='App'>
          <div className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h2>A step by step math solver</h2>
            <div className='urls'>
              <a className='source-code-url' href='https://github.com/socraticorg/mathsteps/'>
                mathsteps on GitHub
              </a>
              <a className='source-code-url' href='https://github.com/evykassirer/mathsteps-website/'>
                this demo on GitHub
              </a>
            </div>
          </div>
          <Demo/>
          <a className='socratic' href="http://socratic.org">Thanks to  Socratic</a>
        </div>
      </MuiThemeProvider>
    );
  }
}
