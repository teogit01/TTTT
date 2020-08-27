import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import '../../../sass/main.scss'

import ListClass from './ListClass'
import Test from './../test/test'
import FormAdd from './FormAdd'

import Login from './Login'
import Logout from './Logout'

import DetailClass from './DetailClass'
import './css/Main.scss'
import NotFound from './../NotFound'
import routes from './../../routes'



function ListRoute(){
	return (
			<div className='control-menu'>
			<Link to='/class' className='btn btn-info'>Danh sách lớp</Link>
			{/*<Link to='/class' className='btn btn-info'>Danh sách lớp</Link>*/}
			<Link to='/add' className='btn btn-info'>Tạo lớp</Link>
			<Link to='/logout' className='btn btn-info'>logout</Link>
			{/*<Link to='/class/1' className='btn btn-info'>Tạo 1</Link>*/}
		</div>
	)
}
// Header-Main-Footer
class Main extends React.Component {

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
		console.log(this.props)
		const { sltClass, isLogin } = this.state
		return (

			<Router>			
			    <div className='Main' onScroll={this.onScroll} >

			    	{
			    		isLogin == true ? ListRoute() : ''
			    	}
			    	
						
					<Switch>
			        	<Route path='/login' exact component={ Login } /> 

			        	<Route path='/logout' exact component={ Logout } /> 
						
						<Route path='/class' exact component={ ListClass } />

						<Route path='/class/:LHP_ID' exact component={ DetailClass } />

						<Route path='/add' exact component={ FormAdd } /> 
					
					</Switch>
					
			        
			    </div>

		    </Router>
    	);
	}
}

export default Main;

if (document.getElementById('class')) {
    ReactDOM.render(<Main />, document.getElementById('class'));
}
