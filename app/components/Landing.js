import React from 'react';

class Landing extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <h2>Want to find out how much it costs to travel to the event that you really wanted to go?</h2>
                <h3>It is as simple as three steps:</h3>
                <ul>
                    <li>Search for your favorite events</li>
                    <li>Pick the event that works best for your schedule</li>
                    <li>We will find you the cheapest flight tickets that will get you there and back</li>
                </ul>
            </div>
        );
    }
}

export default Landing;
