import alt from '../alt';
import eventbrite from '../lib/eventbriteAPI.js';

class WebAPIActions {
    requestEvents(search){
        return (dispatch) => {
            dispatch();
            eventbrite.fetch(search)
                .then((events) => {
                    console.log('fetch complete');
                    this.updateEvents(events);
                })
                .catch(
                    (error) => {
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
}

export default alt.createActions(WebAPIActions);
