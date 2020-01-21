import React, { Component } from 'react';
import downshift from 'downshift';
import Downshift from 'downshift';
import {all as starWarsNames} from 'starwars-names';

//console.log(starWarsNames);

const items = starWarsNames.map(name => ({
    value: name,
    id: name.toLowerCase(),
}));

console.log(items);

class DownshiftExample extends Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }
    render(){
        return (
            <div>
                <Downshift>
                    {({getLabelProps, getInputProps}) => (
                        <div>
                            <label {...getLabelProps()}>Search</label>
                            <input {...getInputProps()}></input>
                            <ul>
                                {items.map(item => (
                                    <li key={item.value}>{item.id}</li>
                                ))}
                            </ul>
                        </div>
                    )  
                    }}
                </Downshift>
            </div>
        );
    }
}


export default DownshiftExample;