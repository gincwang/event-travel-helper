import React from "react";
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, browserHistory} from "react-router";
import SearchBar from './components/SearchBar';
import EventView from './components/EventView';
import Landing from './components/Landing';


class App extends React.Component{
    render(){
        return(
            <div>
                <SearchBar />
                {this.props.children}
            </div>
        );
    }
}


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Landing}/>
      <Route path='search/:name' component={EventView} />
    </Route>
  </Router>
), document.getElementById('app'))
