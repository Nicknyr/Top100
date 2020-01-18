import React, { Component } from 'react';
import Home from './components/Home';
import styled, { css } from 'styled-components';
import 'reset-css';


const STYLES = styled.div`

`
/*
xs = Extra small <576px

sm = Small ≥576px

md = Medium ≥768px

lg = Large ≥992px

xl = Extra large ≥1200px
*/

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
