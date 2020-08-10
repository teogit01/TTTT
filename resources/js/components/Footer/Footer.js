import React from 'react';
import ReactDOM from 'react-dom';

import Left from './LeftFooter'
import Right from './RightFooter'

class Footer extends React.Component {
	render(){
		return (
			<div className='Footer__wraper'>
                <div className="col-md-12" style={{display: 'flex'}}>
	                <Left />
					<Right />
                </div>
            </div>
    	);
	}
}

export default Footer;

if (document.getElementById('footer')) {
    ReactDOM.render(<Footer />, document.getElementById('footer'));
}
