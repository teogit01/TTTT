import React from 'react';
import ReactDOM from 'react-dom';

//import '../../../sass/listClass.scss'

class Class extends React.Component {
	constructor(props) {
	  super(props);

	  this.state = {
	  	students : [
	  		{id : '1', name : 'Student 1'},
	  		{id : '2', name : 'Student 2'},
	  		{id : '3', name : 'Student 3'},
	  		{id : '3', name : 'Student 4'},
	  		{id : '4', name : 'Student 5'},
	  		{id : '5', name : 'Student 6'},
	  		{id : '6', name : 'Student 7'},
	  		{id : '7', name : 'Student 8'},
	  		{id : '8', name : 'Student 9'},
	  		{id : '10', name : 'Student 10'}
	  	]
	  }

	}
	// componentDidMount() {
	// 	axios.get(`http://127.0.0.1:8001/api/films`)
	// 	.then(res => {
	// 		const data = res.data.data;
	// 		//console.log(res)
	// 		this.setState({ data: data });
	// 	})
	// 	.catch(error => console.log(error));
	// }

	render(){
		const { students } = this.state
		const { total } = this.props
		let days=[];
		for (var i = 0; i < total; i++) {
	        days.push(i)
	    }
		return (
	        <div className='Class'>
	        	<table className='table table-hover'>
	        		<thead>
	        			<tr>
	        				<th>Stt</th>
	        				<th>ID</th>
	        				<th>Name</th>
	        				{days.map((day, index)=>{
	        					return (
	        						<th key={day}>{day+1}</th>
	        						)
	        				})}
	        			</tr>
	        		</thead>
	        		<tbody>
	        			{students.map((student, index)=>{
	        				return (
	        					<tr key={student.name}>
	        						<td>{index}</td>
	        						<td>{student.id}</td>
	        						<td>{student.name}</td>
	        						{days.map((day, index)=>{
	        							return (
	        								<th key={day}><input type='checkbox'/></th>
	        								)
	        						})}
	        					</tr>
	        				)
	        			})}
	        		</tbody>
	        	</table>
	        </div>         
    	);
	}
}

export default Class;

