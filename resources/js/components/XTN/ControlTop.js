import React from 'react';
import ReactDOM from 'react-dom';
import { Button, TextField } from '@material-ui/core';
import Select from 'react-select'

import './css/controltop.scss'
import callApi from './../../apiCaller/apiCaller'

class ControlTop extends React.Component {

	constructor(props) {
	  super(props)

	  const token = localStorage.getItem('token')
	  let isLogin = true
	  if ( token == null){
	  	isLogin = false
	  }

	  this.state = {
	  	students : [],
	  	mssv : '',
	  	student_current : '',
	  	isLogin
	  }


	  this.handleSearch = this.handleSearch.bind(this)
	  this.handleChange = this.handleChange.bind(this)
	}
	
	async componentDidMount(){

		let sinhvien = await callApi('sinhvien', 'GET', null)
		.then(res=> sinhvien = res.data)
		this.setState({
			students : sinhvien
		})
	}

	async handleSearch(){
		const { mssv } = this.state
		let sinhvien = await callApi(`sinhvien/${mssv}`, 'GET', null)
		.then(res => {
			this.setState({
				student_current : res.data
			})
		})
	}
	handleChange(value){
		if (value != null){
			this.setState({
				mssv : value.value
			})
		}	
		//console.log(value)
	}
	render(){
		const { students, student_current } = this.state
		const sinhvien_options = students.reduce((newSV, sv)=>{
			newSV.push({'value' : sv.SV_MSSV, 'label' : `${sv.SV_MSSV}-${sv.SV_HOTEN}`})
			return newSV
		}, [])

		return (

			<div className='control_top'>
				<div className='content'>
					<div className='row'>
						<Select 
							className='col-10'
							options={sinhvien_options}
							name= "sltSv"
							onChange = {this.handleChange}
							//ref='sltGv'
						/>	
						<button className='btn btn-info' onClick={this.handleSearch}>Tìm kiếm</button>
					</div>

					
					<br />

					<table className=''>
						<tbody>
							<tr>
								<th>Họ và tên:</th>
								<td>{student_current != '' ? student_current.SV_HOTEN : '' }</td>
							</tr>
							<tr>
								<th>MSSV:</th>
								<td>{student_current != '' ? student_current.SV_MSSV : '' }</td>
							</tr>
							<tr>
								<th>PortalId:</th>
							</tr>
							<tr>
								<th>Lớp:</th>
							</tr>
							<tr>
								<th>Môn học:</th>
								<td>
									<select className='form-control'>
										<option>Tất cả</option>
									</select>
								</td>
							</tr>
							</tbody>
					</table>
				</div>
					
			        
			</div>
    	);
	}
}

export default ControlTop;

