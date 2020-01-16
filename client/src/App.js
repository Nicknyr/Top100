import React, { Component } from 'react';
import Home from './components/Home';
import styled, { css } from 'styled-components';
import 'reset-css';


const STYLES = styled.div`

`

class App extends Component {
  render() {
    return (
      <div className="App">
        <Home />
      </div>
    );
  }
}

export default App;
