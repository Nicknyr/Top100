import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';
import SearchBar from './Searchbar';
import Albums from './Albums';
import SortedAlbums from './SortedAlbums';

 // #00C9FF
 // #92FE9D
 // #EA526F
 // #75F4F4
 // #F9DC5C

const STYLES = styled.div`
    @import url('https://fonts.googleapis.com/css?family=Oswald|Rokkitt&display=swap');
    font-family: 'Rokkitt', serif;
    //font-family: 'Oswald', sans-serif;
    //background: linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%);
    height: 100%;

    .test {
        background-image: linear-gradient(180deg,transparent 50%,rgba(249,157,120,.5) 0);
        background-position-y: 2px;
        background-position-x: 4px;
        background-repeat: no-repeat;
        -webkit-transition: .15s ease;
        transition: .15s ease;
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
        font-weight: bolder;
        color: snow;
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

    .border-top {
        //border-width: 10px 0 0;
        //border-top-style: solid;
        //-o-border-image: linear-gradient(139deg, #EA526F, #00C9FF, #75F4F4, #F9DC5C) 3;
        //border-image: linear-gradient(139deg, #EA526F, #00C9FF, #75F4F4, #F9DC5C) 3;
        background: #EA526F;
        width: 100%;
        height: 6px;
    }

    .intro {
        background: #EA526F;
        width: 33%;
        margin: 3em auto;
        border-radius: 20px;
        //padding: 1em;

        p {
            color: snow;
            font-size: 1.3em;
            padding: 1em;
            line-height: 1.2;
            //font-family: 'Oswald', sans-serif;
        }
        
    }
`;

const BUTTON = styled.button`
    font-family: 'Oswald', sans-serif;
    height: 3em;
    width: 9em;
    background: #00C9FF;
    color: #F9DC5C;
    border: none;
    color: snow;
    font-size: 16px;
    display: block;
    margin: 0 auto;

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
            data: [],
            genres: [],
            sortByDate: false,
            sortButton: 'Date'
        };
    }

    componentDidMount = () => {
        axios.get('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
            .then((res) => {
                this.setState({
                    data: res.data.feed.entry,
                    genres: res.data.feed.entry.map((item, key) => {
                        return item.category.attributes.label
                    })
                })
            })
            .catch((err) => {
                console.log("Error : " + err);
            })
    };

    sortButton = (e) => {
        this.setState(prevState => ({
            sortByDate: !prevState.sortByDate
        }));

        if(this.state.sortByDate === true) {
            this.setState({
                sortButton: 'Date'
            });
        }
        else {
            this.setState({
                sortButton: 'Top 100'
            })
        }
    
    }

    render() {
        return(
            <STYLES>
                <div className="container">
                    <div className="border-top"></div>
                    <SearchBar 
                        click={() => this.sortButton()} 
                        data={this.state.data}
                        genres={this.state.genres}
                    />

                    <ScrollAnimation animateIn='fadeIn' duration="2">
                        <div className="intro">
                            <p>
                                View today's top 100 iTunes songs, click the album cover for more info, or toggle the results to view the albums in order of release date.
                            </p>
                            <BUTTON onClick={() => this.sortButton()}>Sort by {this.state.sortButton}</BUTTON>
                        </div>
                    </ScrollAnimation>
                
                    <div className="albums">
                        <div className="featured-album"></div>
                        <ul className="albums-ul">
                            {this.state.sortByDate ? <SortedAlbums /> :  <Albums /> }
                        </ul>
                    </div>
                </div>
            </STYLES>
        );
    }
}

export default Home;