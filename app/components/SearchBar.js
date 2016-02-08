import React from 'react';
import WebAPIActions from '../actions/WebAPIActions';
import {Link} from 'react-router';


let style = {
    header: {
        width: '100%',
        padding: '30px 0 50px',
        backgroundColor: 'lightBlue',
        textAlign: 'left'
    },
    title: {
        margin: '0 0 0 10px',
        fontSize: '1.5em',
        fontWeight: 'bold'
    },
    subTitle: {

    }
};

class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchText: '',
            ww: window.innerWidth,
            focus: false
        };
    }
    componentDidMount(){
        var self = this;
        window.onresize = function(){
            self.setState({ww: window.innerWidth});
        }
    }
    handleChange(e){
        this.setState({searchText: e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        console.log(this.state.searchText);
        if(!this.state.searchText){
            return;
        }
        WebAPIActions.requestEvents(this.state.searchText);
        let encodedURI = encodeURIComponent(this.state.searchText);
        this.context.router.push({pathname:'/search/'+ encodedURI});
    }
    calcInputStyle(){
        let widthMultiplier = this.state.focus ? 0.5 : 0.3;
        let style = {
            fontSize: '1.5em',
            display: 'block',
            transition: 'all 0.3s ease',
            paddingLeft: '7px'
        };

        if(this.state.ww > 960){
            style.width = this.state.ww * widthMultiplier;
            style.margin = '10px 0 0 50px';
        }
        else {
            style.width = this.state.ww * 0.9;
            style.margin = '10px auto 0';
        }
        return style;
    }
    handleFocus(){
        console.log('focus');
        this.setState({focus: true});
    }
    handleBlur(){
        this.setState({focus: false});
    }
    render(){
        return (
            <div style={style.header}>
                <div><span style={style.title}>Event Travel Helper</span> - <span style={style.subTitle}>Search for your favorite events or shows</span></div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input style={this.calcInputStyle()} type='text' value={this.state.searchText} placeholder='Search for events or shows' onChange={this.handleChange.bind(this)} onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)} />
                </form>
            </div>
        );
    }
}

SearchBar.contextTypes = { router: React.PropTypes.object.isRequired };

export default SearchBar;
