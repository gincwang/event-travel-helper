import React from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';
import WebAPIStore from '../stores/WebAPIStore';
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
        height: '150px',
        padding: '10px'
    },
    title: {
        fontWeight: 'bold',
        fontSize: '1.2em'
    },
    info: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-between'
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
        console.log(id);
    }
    render(){
        console.log('eventView: ');
        console.log(this.props.events);
        if(!this.props.events.length){
            return <div>Your events will be displayed here</div>;
        }

        return (
            <div>
                <ul style={style.ul}>
                    {this.props.events.map((event) => {
                        let img = <img style={style.img} src='app/asset/img/dummyImg.jpg' />;
                        let venue = '';
                        if(event.logo){
                            img = <img style={style.img} src={event.logo.url} />;
                        }
                        if(event.venue){
                            venue = <div><p>{event.venue.name}</p><p>{event.venue.address.city}, {event.venue.address.region}</p></div>;
                        }
                        return (<li style={style.li} key={event.id} alt='logo' onClick={this.handleClick.bind(this, event.id)}>
                                    <div>
                                        {img}
                                    </div>
                                    <div style={style.info}>
                                        <p>{moment.utc((event.start.utc)).format('ddd, MMM Do - h:mmA')}</p>
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

export default connectToStores(EventView);
