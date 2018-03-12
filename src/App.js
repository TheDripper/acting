import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import Parser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();


class App extends Component {
  render() {
    return (
      <div className="App">
       <WordPress /> 
      </div>
    );
  }
}

class WordPress extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts: [],
			pages: [],
			header: {},
			footer: {}
		}
	}
	async componentDidMount() {
		let press = await Axios('http://localhost');
		press = press.data;
		this.setState({
			header: press.head
		});
	}
	render() {
		let head = entities.decode(this.state.header);
		return(
			<Header mark={head} />
		)
	}
}

const Header = (props) => {
	return <div className="head">{Parser(props.mark)}</div>
}

export default App;
