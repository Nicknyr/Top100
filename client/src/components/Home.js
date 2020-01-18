import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';

 // #00C9FF
 // #92FE9D
 // #EA526F
 // #75F4F4
 // #F9DC5C

const STYLES = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Oswald|Rokkitt&display=swap');
    font-family: 'Rokkitt', serif;
    //font-family: 'Oswald', sans-serif;
    background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
    height: 100%;

    h1 {
        font-family: 'Rokkitt', serif;
        text-align: center;
        margin-top: 0;
        font-size: 2em;
        padding: 1em .3em;
        color: snow;
    }

    .test {
        background-image: linear-gradient(180deg,transparent 50%,rgba(249,157,120,.5) 0);
        background-position-y: 2px;
        background-position-x: 4px;
        background-repeat: no-repeat;
        -webkit-transition: .15s ease;
        transition: .15s ease;
    }

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

    .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        margin: 0 auto;
    }

    .albums {
        display: flex;
        overflow: auto;
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
        justify-content: center;
        list-style-type: none;
        text-align: center;
        align-items: flex-end;
        padding-top: 5em;
        color: white;
        font-weight: bolder;

        h4 {
            font-family: 'Rokkitt', serif;
            text-align: left;
            padding: .5em;
            font-size: 1.3em;
            color: #00C9FF;
            line-height: 1.1;
        }

        li {
            height: 33em;
            width: 20em;
            margin-top: 5em;
            justify-content: center;
            align-items: center;
            //border: 2px solid #282828;
            //background: #282828;
            background: #EA526F;
            border-radius: 10px;

            &:hover {
                /*
                -webkit-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
                -moz-box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
                box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.75);
                */
               -moz-box-shadow: 0px 0px 5px 4px #262626;
               -webkit-box-shadow: 0px 0px 5px 4px #262626;
               box-shadow: 0px 0px 5px 4px #262626;
            }
        
        }

        img {
            align-items: flex-start;
            min-width: 100%;
        }

        p {
            margin-top: auto;
            text-align: left;
            padding: .5em;
            font-size: 1.2em;
        }

        span {
            margin-top: auto;
            text-align: left;
            font-size: 1em;
            color: #F9DC5C;
        }

        @media(min-width: 768px) {
            li {
                margin: 3em;
            }
        }
    }

    .details {

    }

    .album-cover {
        position: relative;
    }

    .album-cover img {
        //filter: brightness(100%);
    }

    .number {
        justify-content: center;
        font-size: 2.2em;
        width: 40px;
        height: 40px;
        font-size:20px;
        color:#fff;
        text-align:center;
        line-height:40px;
        margin: 0 auto;
        border-radius: 20px;
        background: #EA526F;
        border: 1px solid snow;
        position: absolute;
        top: 2%;
        left: 2%;
        filter: brightness(100%);

    }

        p {
            text-align: center;
            margin: 0 auto;
            display: block;
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
                this.setState({
                    data: res.data.feed.entry
                })
            })
            .catch((err) => {
                console.log("Error : " + err);
            })
    };

    sortByDate = () => {
        this.state.data.sort((a, b) => {
            return a.release_date - b.release_date;
        });
    }

    render() {
       const data = this.state.data;
      
        let albumData = data.map((item, key) => {
            let songLink = item.id.label;
            return (
                <ScrollAnimation animateIn='fadeIn' duration="2">
                    <li className="details">
                        <div className="album-cover">
                            <a href={songLink}>
                                <img src={item['im:image'][2].label} width="200"/>
                                <div className="number">{key + 1}</div>
                            </a>
                        </div>
                        <h4>{item.title.label}</h4>
                        {/*<p>{item['im:artist'].label}</p>*/}
                        <p><span>Genre:</span> {item.category.attributes.label}</p>
                        <p><span>Release Date:</span> {item['im:releaseDate'].attributes.label}</p>
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