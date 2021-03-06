import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';
import SearchBar from './Searchbar';
import Albums from './Albums';
import SortedAlbums from './SortedAlbums';
import Downshift from './Downshift';
import DownshiftExample from './Downshift';
import records from './assets/recordsdark.jpg';

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
        //background: red;

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
        //padding-top: 5em;
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
            margin-bottom: 5em;
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

    .number-container {
        background: rgba(0,0,0,.5);
        height: 4em;
        width: 100%;
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
    }

    .number {
        justify-content: center;
        display: flex;
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
        height: 2px;
    }

    .intro {
        padding: 1em;
        margin: 0 auto;
        height: 70vh;

        h1 {
            color: snow;
            font-family: 'Rokkitt', serif;
            font-size: 2.8em;
            width: 100%;
            text-align: center;
            margin: 0 auto;
        }

        p {
            color: snow;
            font-family: 'Oswald', sans-serif;
            font-size: 1.2em;
            //width: 30%;
            margin: 1em auto;
            line-height: 1.5;
            text-align: center;
        }

        .itunes-highlight {
            color:  #00C9FF
        }

        .highlight {
            color: #F9DC5C;
        }
            
    @media(min-width: 425px) {
        height: 50vh;

        p {
            width: 60%;
        }
    }

    @media(min-width: 768px) {
        p {
            width: 40%;
            font-size: 1.5em;
        }
    }
        
}

    .hero {
        padding-top: 5em;
        background-image:url(${records});
        background-size: cover;
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
    margin: 1em auto;

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
            artists: [],
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
                    }),
                    artists: res.data.feed.entry.map((item, key) => {
                        return item["im:artist"].label
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

    hi = (e) => {
        alert('suggestion clicked' + e);
        let { data } = this.state;
        let songToFind = e; 
        console.log("hi : " + e);

        let obj = data.find(o => o["im:name"] === 'ABBA');
       
    }

    render() {
        return(
            <STYLES>
                <div className="border-top"></div>  
                <div className="hero">
                <ScrollAnimation animateIn='fadeIn' duration="2">
                        <div className="intro">
                            <h1>iTunes Top 100</h1>
                            <p>
                                Today's Top 100 purchased songs on <span className="itunes-highlight">iTunes</span>. View the list, search for an <span className="highlight">artist</span> or <span className="highlight">genre</span>, or toggle to sort songs by <span className="highlight">release date</span>.
                            </p>
                        </div>
                    </ScrollAnimation>
                </div>
                <div className="container">     
                
                <DownshiftExample 
                        data={this.state.data} 
                        genres={this.state.genres} 
                        artists={this.state.artists}
                        hi={this.hi}
                    />      
                
                <BUTTON onClick={() => this.sortButton()}>Sort by {this.state.sortButton}</BUTTON>
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