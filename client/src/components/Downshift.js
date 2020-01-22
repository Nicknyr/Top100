import React, { Component } from 'react';
import downshift from 'downshift';
import Downshift from 'downshift';
import {all as starWarsNames} from 'starwars-names';
import matchSorter from 'match-sorter';
import styled, { css } from 'styled-components';
import axios from 'axios';

const STYLES = styled.div`
     width: 100%;
     font-family: 'Rokkitt', serif;
    //font-family: 'Oswald', sans-serif;


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

    .search-results {
        background: transparent;
        width: auto;
        margin: 0 auto;
        color: snow;
        font-size: 1.2em;
        text-align: left;
        line-height: 1.3;
        border: 2px solid #EA526F;
        cursor: pointer;
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

/*
const items = starWarsNames.map(name => ({
    value: name,
    id: name.toLowerCase(),
}));

const itemToString = item => item ? item.value : '';

const getItems = value => value ? matchSorter(items, value, {keys: ['value'] }) : items;
*/


const DownshiftExample = (props) => {
    console.log(props);

    // Genres received as props
    let genres = props.genres;
    // Gets rid of duplicate genres
    let uniqueGenres = [...new Set(genres)];
    console.log('uniq  : ' + uniqueGenres);

    const genreItems = uniqueGenres.map(name => ({
        values: name,
        id: name  //.toLowerCase()
    }));

    let artists = props.artists;
    let uniqueArtists = [... new Set(artists)];

    const artistsItems = uniqueArtists.map(name => ({
        values: name,
        id: name
    }));

    const itemToString = item => item ? item.value : '';
    const getGenres = value => value ? matchSorter(artistsItems, value, {keys: ['values'] }) : artistsItems;

        return (
            <STYLES>
                <div className="container">
                <Downshift itemToString={itemToString}>
                    {({
                        getLabelProps, 
                        getInputProps, 
                        getMenuProps, 
                        getToggleButtonProps,
                        getItemProps, 
                        isOpen, 
                        clearSelection,
                        selectedItem, 
                        inputValue,
                        highlightedIndex}) => (
                        <div className="searchbar-container">
                            {/*<label {...getLabelProps()}>Search</label>*/}
                            <input {...getInputProps()}></input>
                            <BUTTON {...getToggleButtonProps()}>
                                {isOpen ? 'close' : 'open '}
                            </BUTTON>
                            { selectedItem ? (
                                <button onClick={clearSelection}>x</button> 
                            ) : null }
                            <ul className="search-results" {...getMenuProps}>
                                {isOpen
                                   ? getGenres(inputValue).map((item, index) => (
                                        <li 
                                            {...getItemProps({
                                            item, 
                                            key: item.id, 
                                            style:{
                                                backgroundColor: index === highlightedIndex ? 'red' : null
                                            },
                                            })}>{item.id}</li>
                                    ))
                                : null}
                            </ul>
                        </div>
                    )  
                    }}
                </Downshift>
            </div>
            </STYLES>
    );
}


export default DownshiftExample;