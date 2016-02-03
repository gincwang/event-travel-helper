import React from "react";
import ReactDOM from "react-DOM";
import SearchBar from './components/SearchBar';
import EventView from './components/EventView';

ReactDOM.render((
    <div>
        <SearchBar />
        <EventView />
    </div>
), document.getElementById("app"));
