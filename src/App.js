import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Container from './components/Container';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Container />
      </div>
    );
  }
}

export default App;
