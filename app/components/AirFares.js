import React from 'react'
import connectToStores from 'alt-utils/lib/connectToStores'
import WebAPIStore from '../stores/WebAPIStore'


class AirFares extends React.Component {
    static getStores(){
        return [WebAPIStore];
    }
    static getPropsFromStores(){
        return WebAPIStore.getState();
    }
    render(){
        console.log(this.props);
        if(this.props.destAirports.length <= 0){
            return <div>air</div>;
        }
        else {
            return <div>Destination Airport: </div>;
        }
    }
}

export default connectToStores(AirFares);
