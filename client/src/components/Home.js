import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';


const STYLES = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Oswald|Rokkitt&display=swap');
    font-family: 'Rokkitt', serif;
    //font-family: 'Oswald', sans-serif;
    background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
    height: 100%;

    h1 {
        font-family: 'Rokkitt', serif;
        color: snow;
        text-align: center;
        margin-top: 0;
        font-size: 3em;
        padding: .3em;
    }

    .searchbar-container {
        text-align: center;
        padding: 1em;
        display: block;

        input {
            width: 500px;
            height: 40px;
            font-size: 1.1em;
            padding-left: .5em;
            display: inline;
            //border: 2px solid snow;
            vertical-align: bottom;
        }
    }

    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        //justify-content: flex-start;
        margin: 0 auto;
    }

    /*
    .album-info {
        border: 2px solid salmon;
        margin: 2em .5em;
        width: 25em;
        text-align: center;

        h3 {
            font-size: 1.3em;
        }

        p {
            font-size: 1.1em;
        }
    }
    */

    .albums {
        display: flex;
    }

    .featured-album {
        height: 30em;
        width: 30em;
        background: green;
        width: 30%;
        margin: 1em;
        display: none;
    }


    .albums-ul {
        display: flex;
        flex-wrap: wrap;
        //background: blue;
        //width: 70%;
        justify-content: center;
        list-style-type: none;
        text-align: center;
        align-items: flex-end;
        padding: 0;
        color: white;
        font-weight: bolder;

        h4 {
            //padding: 1em .5em;
            //background: black;
            //align-self: center;
            //margin: 0;
            //font-family: 'Rokkitt', serif;
        }

        li {
            height: 30em;
            width: 16em;
            //background: lightgrey;
            margin: 3em;
            justify-content: center;
            align-items: center;
            border: 1px solid snow;
        }

        img {
            //display: flex;
            align-items: flex-start;
            min-width: 100%;
        }

        p {
            display: flex;
            //background: yellow;
            margin-top: auto;
            align-self: flex-end;
        }
    }

    .details {
       
    }

    .number {
        display: flex;
        justify-content: center;
        font-size: 2.2em;
        width: 60px;
        height: 60px;
        font-size:20px;
        color:#fff;
        text-align:center;
        line-height:60px;
        margin: 0 auto;
        border-radius: 30px;
        background:#09f
    }

        p {
            text-align: center;
            margin: 0 auto;
            display: block;
        }
    }
`;

const BUTTON = styled.button`
    height: 46px;
    width: 4em;
    background: #09F;
    //border: 2px solid snow;
    font-family: 'Rokkitt', serif;
    color: snow;
    font-size: 22px;
    margin: 0;
    display: inline-block;

    &:hover {
        filter: brightness(90%);
        cursor: pointer;
    }
`;

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    
    componentDidMount = () => {
        axios.get('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
            .then((res) => {
                //console.log(res.data.feed.entry[0].title.label);
                this.setState({
                    data: res.data.feed.entry
                })
            })
            .catch((err) => {
                console.log("Error : " + err);
            })
    };

    render() {
        const data = this.state.data;

    
        let albumData = data.map((item, key) => {
            return (
                <ScrollAnimation animateIn='fadeIn' duration="2">
                    <li className="details">
                        <img src={item['im:image'][2].label} width="250"/>
                        <h4>{item.title.label}</h4>
                        {/*<p>{item['im:artist'].label}</p>*/}
                        <p>Genre: {item.category.attributes.label}</p>
                        <p>Release Date: {item['im:releaseDate'].attributes.label}</p>
                        <div className="number">{key + 1}</div>
                    </li>
                </ScrollAnimation>

            );
        });
        

        console.log(data);
        
        
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
                    <div className="albums">
                        <div className="featured-album"></div>
                        <ul className="albums-ul">
                            {albumData}
                        </ul>
                    </div>
                </div>
            </STYLES>
        );
    }
}

export default Home;