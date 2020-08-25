import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import '../../../sass/main.scss'

import ListClass from './ListClass'
import Test from './../test/test'
import FormAdd from './FormAdd'
import DetailClass from './DetailClass'
import './css/Main.scss'
import NotFound from './../NotFound'
import routes from './../../routes'

// Header-Main-Footer
class Main extends React.Component {

	constructor(props) {
	  super(props);

	  this.state = {
	  	sltClass : 15,
	  	dataLoad : []
	  }
	}
	render(){
		const { sltClass } = this.state
		const showRoute = (routes) =>{
			var result = null	
			if ( routes.length > 0 ){
				result = routes.map((route, index)=>{
					return (
							<Route 
								key = { index }
								path = { route.path }
								exact = { route.exact }
								component = { route.main }
							/>
					)
				})
			}
			return result
		}
		//console.log(showRoute(routes))
		// console.log('ok')
		return (
			<Router>			
			    <div className='Main' onScroll={this.onScroll} >

			    	<div className='control-menu'>
				        <Link to='/class' className='btn btn-info'>Danh sách lớp</Link>
				        <Link to='/class/add' className='btn btn-info'>Tạo lớp</Link>
				        {/*<Link to='/class/1' className='btn btn-info'>Tạo 1</Link>*/}
			        </div>
						
					<Switch>
						<Route path = '/class' exact component = { ListClass }/>
						<Route path = '/class/add' component = { FormAdd } />
						<Route path = '/class/:id' component = { DetailClass } />
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
