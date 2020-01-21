import React, { Component } from 'react';
import Home from './components/Home';
import styled, { css } from 'styled-components';
import 'reset-css';
import DownshiftExample from './components/Downshift';


const STYLES = styled.div`
  height: 100%;
  width: 100%;
  background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
`;
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
      <STYLES>
        {/*
        <div className="App">
          <Home />
        </div>
         */}

         <DownshiftExample />
      </STYLES>
    );
  }
}

export default App;
