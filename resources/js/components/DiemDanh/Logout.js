import React from 'react';
import { Redirect } from 'react-router-dom'
import callApi from './../../apiCaller/apiCaller'
import './css/Login.scss'
//import { Button, TextField } from '@material-ui/core';

class Logout extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLogin : false
		}
	}
	
	componentDidMount(){
		localStorage.removeItem('token')
		window.location.reload();
	}

	render(){
		const { isLogin } = this.state
		if ( isLogin === false ){
			return <Redirect to='/login' />
		}	
		return (
			<div>
				<h1>logout</h1>
			</div>
		);
	}
}

export default Logout;

