import React, {Component} from 'react';
import {Router, Route, Redirect, IndexRoute, hashHistory,browserHistory, Link} from 'react-router';

class Implementation extends Component {

	constructor(props){
		super(props);
	}

	componentDidMount(){



	}




	render() {
		return (
			<div >

				{this.props.children}

			</div>
		)
	}
}


module.exports  = Implementation