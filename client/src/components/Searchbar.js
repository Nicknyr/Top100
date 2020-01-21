import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import downshift from 'downshift';

const STYLES = styled.div`
    width: 100%;


    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        margin: 0 auto;
    }


    h1 {
        font-family: 'Rokkitt', serif;
        text-align: center;
        margin-top: 0;
        font-size: 2em;
        padding: 1em .3em;
        color: snow;
    }
    /*
    h1::before {
        content: "";
        position: absolute;
        bottom: 2px;
        left: 0;
        right: 0;
        top: calc(100% - 10px);
        background: red;
        z-index: -1;
        transition: all 120ms ease-in-out;
    }   
    */

    .searchbar-container {
        text-align: center;
        display: block;
        overflow: auto;
        width: 100%;

        @media(min-width: 992px) {
            width: 70%;
        }

        input {
            width: 50%;
            height: 40px;
            font-size: 1.1em;
            padding-left: .5em;
            display: inline;
            vertical-align: bottom;

            &:focus {
                outline: none;
            }
        }
    }
`;

const BUTTON = styled.button`
    font-family: 'Oswald', sans-serif;
    height: 46px;
    width: 4em;
    background: #EA526F;
    color: snow;
    font-size: 22px;
    margin: 0;
    display: inline-block;

    &:hover {
        filter: brightness(90%);
        cursor: pointer;
    }

    &:focus {
        outline: none;
    }
`;

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            titles: '',
            genres: ''
        };
    }

    render() {
       console.log('genres : ' + this.props.genres);
        return(
            <STYLES>
                <div className="container">
                    <div className="searchbar-container">
                        <h1>iTunes Top 100 Songs</h1>
                        <form>
                            <input type='text' placeholder="Search albums"/>
                            <BUTTON type="button" value="search">Search</BUTTON>
                        </form>
                    </div>
                </div>
            </STYLES>
        );
    }
}

export default SearchBar;