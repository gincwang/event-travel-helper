import alt from '../alt';
import eventbrite from '../lib/eventbriteAPI.js';
import expediaAPI from '../lib/expediaAPI.js';

class WebAPIActions {
    requestEvents(search){
        return (dispatch) => {
            dispatch();
            eventbrite.fetch(search)
                .then((events) => {
                    console.log('fetch complete');
                    this.updateEvents(events);
                })
                .catch((error) => {
                    console.log('error' + error);
                });
        };
    }
    updateEvents(events){
        return events;
    }
    requestFlights(dates){
        return dates;
    }
    requestAirports(address){
        return (dispatch) => {
            dispatch();
            let location = address.city + ',' + address.region;
            expediaAPI.fetchAirport(location)
                .then((results) => {
                    console.log('airports fetched');
                    console.log(results);
                    let airports = results.map((result) => result.a );
                    console.log(airports);
                    this.updateAirports(airports);
                })
                .catch((error) => {
                    console.log('error airports');
                    console.log(error);
                });
        }
    }
    updateAirports(airports) {
        console.log('updateAirports: ');
        return airports;
    }
}

export default alt.createActions(WebAPIActions);
