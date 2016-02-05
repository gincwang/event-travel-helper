import React from "react";
import ReactDOM from "react-DOM";
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import SearchBar from './components/SearchBar';
import EventView from './components/EventView';
import Landing from './components/Landing';

class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <SearchBar />
            </div>
        );
    }
}


ReactDOM.render((
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={Landing} />
        </Route>
    </Router>
), document.getElementById("app"));
