import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import WebAPIStore from '../stores/WebAPIStore';
import WebAPIActions from '../actions/WebAPIActions';
import moment from 'moment';

let style = {
    ul: {
        padding: '15px 0',
        backgroundColor: 'lightGray'
    },
    li: {
        listStyle: 'none',
        margin: '0 20px 20px',
        display: 'flex',
        justifyContent: 'flex-start',
        backgroundColor: 'white'
    },
    img: {
        width: '280px'
    },
    imgDiv: {
        margin: '10px',
        height: '150px',
        overflow: 'hidden'
    },
    title: {
        fontWeight: 'bold',
        fontSize: '1.2em'
    },
    info: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-between'
    },
    loadingText: {
        position: 'block',
        textAlign: 'center',
        margin: '50px'
    }
}

class EventView extends React.Component {
    static getStores(){
        return [WebAPIStore];
    }
    static getPropsFromStores(){
        return WebAPIStore.getState();
    }
    handleClick(id){
        let detail = this.getDetails(id);
        console.log(detail);
        if(detail.venue){
            WebAPIActions.requestAirports(detail.venue.address);
        }
        this.context.router.push({pathname: '/detail/'+id, state: {event: detail}});
    }
    getDetails(id){
        let details;
        this.props.events.forEach( (event) => {
            if(event.id === id){
                details = event;
            }
        });
        return details;
    }
    render(){
        console.log('eventView: ');
        if(!this.props.events.length){
            return <div style={style.loadingText}>We are currently loading your events...</div>;
        }

        return (
            <div>
                <ul style={style.ul}>
                    {this.props.events.map((event) => {
                        let img = <img style={style.img} src='../../app/asset/img/dummyImg.jpg' />;
                        let venue = '';
                        if(event.logo){
                            img = <img style={style.img} src={event.logo.url} />;
                        }
                        if(event.venue){
                            venue = <div><p>{event.venue.name}</p><p>{event.venue.address.city}, {event.venue.address.region}</p></div>;
                        }
                        return (
                            <li style={style.li} key={event.id} alt='logo' onClick={this.handleClick.bind(this, event.id)}>
                                <div style={style.imgDiv}>
                                    {img}
                                </div>
                                <div style={style.info}>
                                    <p>{moment((event.start.local)).format('ddd, MMM Do - ha')}</p>
                                    <p style={style.title}>{event.name.html}</p>
                                    {venue}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        )


    }
}

EventView.contextTypes = { router: React.PropTypes.object.isRequired };

export default connectToStores(EventView);
