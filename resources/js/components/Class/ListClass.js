import React, { Component } from 'react';
import ReactDOM from 'react-dom';

//import '../../../sass/listClass.scss'
import './css/ListClass.scss'
import callApi from './../../apiCaller/apiCaller'

class ListClass extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
	  	list_class : []
	  }
	  this.del = this.del.bind(this)
	  this.detail = this.detail.bind(this)
	}

	async componentDidMount(){
		let list_class = await callApi('lhphan', 'GET', null)
		.then(res => list_class = res.data)
		this.setState({
			list_class : list_class
		})
		}
	del(id){
		return () => {

			// start xoa hoc sinh trong lop hoc phan id
		 	let del_student = callApi(`diemdanh/${id}`, 'GET', null)
			.then( res =>{ 
				del_student = res.data
				if (del_student.length > 0){
					// callApi(`diemdanh/${id}`, 'GET', null)
					del_student.forEach(el=>{
						callApi(`diemdanh/${el.SV_MSSV}/${id}`, 'DELETE', null)
					})
				} 
			})
			// end xoa hoc phan trong lop
			let { list_class } = this.state

			// start xoa lop hoc phan
			callApi(`lhphan/${id}`, 'DELETE' , null)
			.then(res => {
				if (res.status === 200){
					const index = findIndex(list_class, id)
					if (index != -1){
						list_class.slice(index,1)
						this.setState({
							list_class : list_class
						})
					}
				}
			})
			// end xoa lop hoc phan
			// start cap nhat state danh sach lop
			const index = list_class.reduce((result, current, currentIndex)=>{
				if (id === current.LHP_ID){
					result = currentIndex
				}
				return result
			}, 0)

			if (index != null){
				list_class.splice(index,1)
				this.setState({
					list_class : list_class
				})
			}
			// end cap nhat state danh sach lop
		}
	}

	detail(id, tongbuoi){
		return () => {
			const { history } = this.props
			const pathname = history.location.pathname
			history.push(`${pathname}/${id}`)
			history.tongbuoi = tongbuoi;			
			//this.props.tongbuoi = tongbuoi
		}
	}
	
	render(){
		const { list_class } = this.state
		return (
	        <div className='ListClass'>
	        	<table className='table table-hover'>
	        		<thead>
	        			<tr>
	        				<th>Stt</th>
	        				<th>Mã lớp</th>
	        				<th>Tên lớp</th>
	        				<th>Giáo viên</th>
	        				<th>Số buổi</th>
	        				<th>Action</th>
	        			</tr>
	        		</thead>
	        		<tbody>
	        			{
	        				list_class.map((item, index)=>{
	        					return (
	        						<tr key={index}>
	        							<td>{index+1}</td>
	        							<td>{item.LHP_MA}</td>
	        							<td>{item.LHP_TEN}</td>
	        							<td>{item.GV_MSGV}</td>
	        							<td>{item.LHP_TONGBUOI}</td>
	        							<td className='hover'>
	        								<span onClick={this.del(item.LHP_ID)}>Del</span>
	        								&nbsp;&nbsp;&nbsp;
	        								<span onClick={this.detail(item.LHP_ID, item.LHP_TONGBUOI)}>Detail</span>
	        							</td>
	        						</tr>
	        					)
	        				})
	        			}
	        		</tbody>
	        	</table>
	        </div>         
    	);
	}
}

export default ListClass;

