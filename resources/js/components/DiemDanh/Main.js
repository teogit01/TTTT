import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import '../../../sass/main.scss'

import ListDD from './ListDiemDanh'
import Test from './../test/test'
import FormAdd from './FormAdd'

import Login from './Login'
import Logout from './Logout'

import DetailClass from './DetailClass'
import './css/Main.scss'
import NotFound from './../NotFound'
import routes from './../../routes'



function ListRoute_giaovu(){
	return (
			<div className='control-menu'>
			<Link to='/diemdanh/all' className='btn btn-info'>DS phiếu điểm danh</Link>
			{/*<Link to='/class' className='btn btn-info'>Danh sách lớp</Link>*/}
			<Link to='/diemdanh/add' className='btn btn-info'>Tạo phiếu điểm danh</Link>
			<Link to='/logout' className='btn btn-info'>logout</Link>
			{/*<Link to='/class/1' className='btn btn-info'>Tạo 1</Link>*/}
		</div>
	)
}
function ListRoute_giaovien(){
	return (
			<div className='control-menu'>
			<Link to='/diemdanh/' className='btn btn-info'>DS phiếu điểm danh</Link>
			<Link to='/logout' className='btn btn-info'>logout</Link>
			{/*<Link to='/class/1' className='btn btn-info'>Tạo 1</Link>*/}
		</div>
	)
}
// Header-Main-Footer
class Main extends React.Component {

	constructor(props) {
	  super(props)

	  const token = JSON.parse(localStorage.getItem('token'))
	  let isLogin = true
	  if ( token == null){
	  	isLogin = false
	  }
	  //console.log(token.role)
	  let role = 0;
	  if (isLogin == true){
	  	role = token.role
	  }

	  this.state = {
	  	sltClass : 15,
	  	dataLoad : [],
	  	isLogin,
	  	role : role
	  }
	}
	
	render(){
		const { sltClass, isLogin, role } = this.state
		const isShow = isLogin == true ? '' : 'hide'
		return (

			<Router>			
			    <div className='Main' onScroll={this.onScroll} >
			    <div className={isShow}>

			    	{
			    		(isLogin == true && role == 1) ? ListRoute_giaovu() : ListRoute_giaovien()
			    	}
			    </div>
			    	
						
					<Switch>
			        	<Route path='/login' exact component={ Login } /> 

			        	<Route path='/logout' exact component={ Logout } /> 
						
						<Route path='/diemdanh/all' exact component={ (props)=> <ListDD {...props} role='1' />  } />

						<Route path='/diemdanh/' exact component={ (props)=> <ListDD {...props} />  } />

						<Route path='/diemdanh/detail/:DD_ID' exact component={ DetailClass } />

						<Route path='/class' exact component={ ListDD } />

						<Route path='/class/:LHP_ID' exact component={ DetailClass } />

						<Route path='/diemdanh/add' exact component={ FormAdd } /> 
					
					</Switch>
					
			        
			    </div>

		    </Router>
    	);
	}
}

export default Main;

if (document.getElementById('diemdanh')) {
    ReactDOM.render(<Main />, document.getElementById('diemdanh'));
}
