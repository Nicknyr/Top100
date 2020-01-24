import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import "animate.css/animate.min.css";
import ScrollAnimation from 'react-animate-on-scroll';
import axios from 'axios';

const STYLES = styled.div`
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

    .number-container {
        background: red;
        height: 10em;
        width: 100%;
    }
`;

class Albums extends Component {
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

    render() {
        const data = this.state.data;
        // Albums sorted by rank, not date
        let albumData = data.map((item, key) => {
            let songLink = item.id.label;
            return (
                <ScrollAnimation animateIn='fadeIn' duration="2">
                    <li className="details">
                        <div className="album-cover">
                            <a href={songLink}>
                                <img src={item['im:image'][2].label} width="200"/>
                                <div className="number-container">
                                    <div className="number">{key + 1}</div>
                                </div>
                            </a>
                        </div>
                        <h4>{item.title.label}</h4>
                        <p><span>Genre:</span> {item.category.attributes.label}</p>
                        <p><span>Release Date:</span> {item['im:releaseDate'].attributes.label}</p>
                    </li>
                </ScrollAnimation>

            );
        });

        return (
            <STYLES>
                <div className="container">
                    {albumData}
                </div>         
            </STYLES>
        );
    }
}


export default Albums;