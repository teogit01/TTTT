import React from 'react';
import ReactDOM from 'react-dom';

import logo_cusc from '../imgs/cus_banner_ctu.png';
import Menu from './TopMenu'
import MenuBottom from './BottomMenu'

class Header extends React.Component {
	render(){
		return (
			<div className='Header__wraper'>
                <div className="col-md-12">
	                <div className="banner row">
	                	<div className="logo">
	                		<img src={logo_cusc} />
	                	</div>
	                	<div className="banner_right">
	                		<div className="content">
	                			<Menu />	
	                		</div>	                		
	                	</div>
	                </div>
	                <MenuBottom />
                </div>
            </div>
    	);
	}
}

export default Header;

if (document.getElementById('header')) {
    ReactDOM.render(<Header />, document.getElementById('header'));
}
