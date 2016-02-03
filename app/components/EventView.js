import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import WebAPIStore from '../stores/WebAPIStore';

class EventView extends React.Component {
    static getStores(){
        return [WebAPIStore];
    }
    static getPropsFromStores(){
        return WebAPIStore.getState();
    }
    render(){
        console.log('eventView: ');
        console.log(this.props.events);
        if(!this.props.events.length){
            return <div>Your events will be displayed here</div>
        }

        return (
            <ul>
                {this.props.events.map((event) => {
                    let img = '';
                    if(event.logo){
                        img = <img src={event.logo.url} />;
                    }
                    return <li key={event.id}>{img}{event.name.html}</li>;
                })}
            </ul>
        )


    }
}

export default connectToStores(EventView);
