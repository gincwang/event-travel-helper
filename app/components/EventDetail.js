import React from 'react'
import moment from 'moment'
import expediaAPI from '../lib/expediaAPI'
import AirFares from './AirFares'

let style = {
    tickets: {

    },
    description: {

    },
    table: {
        width: '100%',
        border: '1px solid black',
        margin: '15px 0',
        borderCollapse: 'separate',
        borderRadius: '5px',
        textAlign: ''
    },
    thRow: {
        height: '50px',
    },
    tbRow: {
        height: '40px',
        borderTop: '1px solid gray'
    },
    td: {
        padding: '10px 15px'
    },
    th: {
        padding: '10px 15px'
    }
}

class EventDetail extends React.Component {
    renderTicket(event){
        let tickets;
        if( event.ticket_classes ){
            tickets = event.ticket_classes.map( (ticket, index) => {
                let price, fee;
                if(ticket.free){
                    price = 'FREE';
                    fee = '0.00';
                }else {
                    if(ticket.cost){
                        price = ticket.cost.display;
                        fee = ticket.fee.display;
                    }
                    else if (ticket.donation){
                        price = 'Any';
                        fee = '0.00';
                    }
                }
                return <tr key={index} style={style.tbRow}><td style={style.td}>{ticket.name}</td><td style={style.td}>{price}</td><td style={style.td}>{fee}</td></tr>;
            });
            return (
                <table style={style.table}>
                    <thead>
                        <tr style={style.thRow}>
                            <th style={style.th}>Registration Type</th>
                            <th style={style.th}>Price</th>
                            <th style={style.th}>Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets}
                    </tbody>
                </table>);
        }
        else {
            return null;
        }
    }
    renderDescription(event){
        if(event.description){
            let description = {
                __html: event.description.html
            };
            return <div>
                        <h3>Event Description</h3>
                        <div dangerouslySetInnerHTML={description} />
                    </div>;
        }
        else {
            return null;
        }
    }
    renderVenue(event){
        let venue;
        if(event.venue){
            return  <div>
                        <h4>{event.venue.name}</h4>
                        <h4>{event.venue.address.city}, {event.venue.address.region}</h4>
                    </div>;
        }
    }
    renderDates(event){
        let start = moment(event.start.local);
        let end = moment(event.end.local);
        //intelligently parse start/end ranges
        if( moment(start).isSame(end, 'day') ){             //same-date event returns time ranges
            return start.format('dddd, MMMM Do, ha~') + end.format('ha');
        }
        else if ( moment(start).isSame(end, 'month') ){     //same-month event return date ranges
            return start.format('dddd, MMMM Do~') + end.format('Do');
        }
        else {                                              //return the entire dates
            return start.format('dddd, MMM Do, ha~') + end.format('dddd, MMMM Do, ha');
        }
    }
    render(){
        let event = this.props.location.state.event;
        let tickets, description, dates, venue;
        tickets = this.renderTicket(event);
        description = this.renderDescription(event);
        dates = this.renderDates(event);
        venue = this.renderVenue(event);
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-7'>
                        <h2>{event.name.text}</h2>
                        <h3>{dates}</h3>
                        {venue}
                        <hr/>
                        <div style={style.tickets}>{tickets}</div>
                        <hr/>
                        <div style={style.description}>{description}</div>
                        <a href={event.url} target='_blank'>Eventbrite Link</a>
                    </div>
                    <div className='col-md-5'>
                        <AirFares />
                    </div>
                </div>
            </div>
        );
    }
}

export default EventDetail;
