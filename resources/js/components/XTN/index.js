import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
//import '../../../sass/main.scss'
import ControlTop from './ControlTop'
// import Login from './Login'
// import Logout from './Logout'

//import './css/index.scss'
//import NotFound from './../NotFound'

// Header-Main-Footer
class XTN extends React.Component {

	constructor(props) {
	  super(props)

	  const token = localStorage.getItem('token')
	  let isLogin = true
	  if ( token == null){
	  	isLogin = false
	  }

	  this.state = {
	  	sltClass : 15,
	  	dataLoad : [],
	  	isLogin
	  }
	}
	
	render(){
		return (

			<div className='XTN'>

				<ControlTop />
					
			        
			</div>
    	);
	}
}

export default XTN;

if (document.getElementById('xtn')) {
    ReactDOM.render(<XTN />, document.getElementById('xtn'));
}
