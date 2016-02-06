import React from 'react'
import moment from 'moment'

let style = {
    tickets: {

    },
    description: {

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
                return <tr key={index}><td>{ticket.name}</td><td>{price}</td><td>{fee}</td></tr>;
            });
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Registration Type</th>
                            <th>Price</th>
                            <th>Fee</th>
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
            return <div dangerouslySetInnerHTML={description} />;
        }
        else {
            return null;
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
        else {
            return start.format('dddd, MMM Do, ha~') + end.format('dddd, MMMM Do, ha');
        }
    }
    render(){
        let event = this.props.location.state.event;
        let tickets, description, dates;
        tickets = this.renderTicket(event);
        description = this.renderDescription(event);
        dates = this.renderDates(event);

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-7'>
                        <h2>{event.name.text}</h2>
                        <h3>{dates}</h3>
                        <h4>{event.venue.name}</h4>
                        <h4>{event.venue.address.city}, {event.venue.address.region}</h4>
                        <div style={style.tickets}>{tickets}</div>
                        <div style={style.description}>{description}</div>
                    </div>
                    <div className='col-md-5'>
                        SideBar
                    </div>
                </div>
            </div>
        );
    }
}

export default EventDetail;
