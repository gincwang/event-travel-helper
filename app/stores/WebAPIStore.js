import alt from '../alt';
import WebAPIActions from '../actions/WebAPIActions.js';

class WebAPIStore {
    constructor(){
        this.bindListeners({
            handleEvents: WebAPIActions.requestEvents,
            handleUpdateEvents: WebAPIActions.updateEvents,
            handleFlights: WebAPIActions.requestFlights,
            handleRequestAirports: WebAPIActions.requestAirports,
            handleUpdateAirports: WebAPIActions.updateAirports
        });

        this.state = {
            events: [],
            flights: [],
            origAirports: [],
            destAirports: []
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
    handleRequestAirports(){
        console.log('requesting airport');
    }
    handleUpdateAirports(airports){
        console.log('store_handleAirports');
        this.setState({destAirports: airports});
    }

}

export default alt.createStore(WebAPIStore, 'WebAPIStore');
