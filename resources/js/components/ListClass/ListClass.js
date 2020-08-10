import React from 'react';
import ReactDOM from 'react-dom';

import '../../../sass/listClass.scss'
import Class from './Class'

import callApi from './../../apiCaller/apiCaller'

class ListClass extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = {
	  	classes : [
	  		{id : '1', name : 'Lập trình căn bản', total : '15',},
	  		{id : '2', name : 'Lập trình web', total : '20'},
	  		{id : '3', name : 'Toán rời rạc', total : '15'}
	  	],
	  	sltClass : 15,
	  	dataLoad : []
	  }

	  this.onChange = this.onChange.bind(this)
	}
	componentDidMount() {
		callApi('films', 'GET', null)
		.then(res => this.setState({
			dataLoad : res.data
		}))
	}
	onChange(e){
		const newValue = e.target.value
		this.setState({
			sltClass :  newValue
		})
	}
	render(){
		const { classes, sltClass, dataLoad } = this.state
		if (dataLoad){
			var data = dataLoad.map((film, index)=>{
				return (
					<tr key={index}>
						<td>{index+1}</td>
						<td>{film.code}</td>
						<td>{film.name}</td>
					</tr>
				)
			})
		}
		return (
	        <div className='ListClass'>

		        <div>
		        	<table className='table'>
		        		<thead>
		        			<tr>
		        				<th>stt</th>
		        				<th>code</th>
		        				<th>name</th>
		        			</tr>
		        		</thead>
		        		<tbody>
		        			{ data }
		        		</tbody>
		        	</table>
		        </div>
	        	<div className='control-class'>
	        		<div><label>Chọn Lớp: &nbsp;</label></div>
		        	<select 
		        		className='form-control select-classes'
		        		onChange={this.onChange}
		        		>
		        		{classes.map((item, index)=>{
		        			return(
		        					<option 
		        						key={item.id}
		        						value={item.total}
		        					>{item.name}
		        					</option>	
		        				)
		        		})}
		        	</select>
	        	</div>

	        	<br />
	        	<Class total={sltClass}/>
	        </div>         
    	);
	}
}

export default ListClass;

if (document.getElementById('listClass')) {
    ReactDOM.render(<ListClass />, document.getElementById('listClass'));
}
