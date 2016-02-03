import alt from '../alt';
import WebAPIActions from '../actions/WebAPIActions.js';

class WebAPIStore {
    constructor(){
        this.bindListeners({
            handleEvents: WebAPIActions.requestEvents,
            handleUpdateEvents: WebAPIActions.updateEvents,
            handleFlights: WebAPIActions.requestFlights
        });

        this.state = {
            events: [],
            flights: []
        };
    }
    handleEvents(){
        console.log('store_handleEvents');
        this.setState({events: []});
    }
    handleUpdateEvents(events){
        console.log('store_handleUpdateEvents');
        this.setState({events: events});
    }
    handleFlights(date){
        console.log('store: ' + date);
    }

}

export default alt.createStore(WebAPIStore, 'WebAPIStore');
