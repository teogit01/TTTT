import React from 'react';

import { Button, TextField } from '@material-ui/core';
import { Redirect } from 'react-router-dom'
import Select from 'react-select';
import callApi from './../../apiCaller/apiCaller'

import './css/DetailClass.scss'

class DetailClass extends React.Component {
	constructor(props) {
		super(props)
		const token = localStorage.getItem('token')
		let isLogin = true
		if ( token == null){
			isLogin = false
		}
		this.state = {
			
			student_of_class : [],
			student_can_add : [],

			student_add : [],
			total : 0,

			student_diemdanh : [],
			clickDay : -1,

			status : [],
			days : [],
			isLogin
			
		}
		this.handleChangeAddStudent = this.handleChangeAddStudent.bind(this)
		this.handleAddStudent = this.handleAddStudent.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleCheck = this.handleCheck.bind(this)
		this.handleClickDay = this.handleClickDay.bind(this)
		this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this)
	}

	async componentDidMount(){
		if (this.state.isLogin === false){
			return 
		}
		
		let msgv = localStorage.getItem('token')
		const { LHP_ID } = this.props.match.params
		
		// load tong so buoi hoc
		let so_buoi = await callApi(`lhphan/${msgv}/${LHP_ID}`, 'GET', null)
		.then((res)=> so_buoi = res.data[0].LHP_TONGBUOI)
		
		// load all student
		let all_students = await callApi('sinhvien', 'GET', null)
		.then((res)=> all_students = res.data)

		// load student of class
		let student_of_class = await callApi(`diemdanh/${LHP_ID}`, 'GET', null)
		.then((res) => student_of_class = res.data)

		// SV co the them vo lop
		let student_can_add = all_students;
		student_of_class.forEach(el=>{
			all_students.forEach((stu, index)=>{
				if(stu.SV_MSSV === el.SV_MSSV){
					student_can_add.splice(index,1)
				}
			})
		})
		// lay tat ca sv co diem danh
		// luu tranh thai check
		let status = []
		student_of_class.forEach((el, index)=>{
			
			if ( this.convert(el.DIEM_DANH, el.SV_MSSV) ){

				this.convert(el.DIEM_DANH, el.SV_MSSV).forEach(item=>{
					status.push({
						mssv : item.mssv,
						day : item.day,
						value : item.value
					})
				})
			}
		})

		// render checed of student
		let days = []
			student_of_class.forEach((item, index)=>{

				for(let i = 1; i<=so_buoi+1; i++){
						let data = {
							mssv : item.SV_MSSV,
							day : i,
							value: false,
							kq : i == so_buoi+1 ? true : false
						}
					status.forEach(el=>{
						if (el.day == i && el.mssv == item.SV_MSSV){
							data = {
								mssv : item.SV_MSSV,
								day : i,
								value: el.value == 'true' ? true : false
							}	
						}
						if (i == so_buoi){

						}	
					})
		
					days.push(data)
				}

			})

		this.setState({
			student_of_class : student_of_class,
			student_can_add : student_can_add,
			total : so_buoi,
			status : status,
			days : days
		})

	}
	convert(str, mssv){
		if(str != null){
			let count = 0
			let result = []
			for(let i=0; i<str.length; i++){
				if(str[i]==',' && (str[i+1]== ' '))
					count++
			}
			const words = str.split(', ');
			for(let i = 0; i<=count; i++){
				let index = 0;
				let day = words[i][0]
				for(let j=0; j<words[i].length; j++){
					if (words[i][j]==':'){
						index = j
						day = words[i].substr(0, index)
					}
				}
				result.push({
					mssv : mssv,
					// day : parseInt(words[i][0]),
					day : parseInt(day),
					value : words[i].slice(index+1, words[i].length)
				})
			}
			return result;
		}
	}
	handleCheck(mssv, day){
		// danh sach sv duoc diem danh cu
		const { student_diemdanh } = this.state

		// kiem tra uncheck
		let new_student_diemdanh = student_diemdanh

		let kiemtra = false

		return () => {
			console.log(mssv, day)
			if (new_student_diemdanh.length > 0){
				new_student_diemdanh.forEach((el, index)=>{
					if (mssv === el.mssv){
						new_student_diemdanh.splice(index,1)						
						kiemtra = true
					}
				})
			}
			if (kiemtra){
				this.setState({
					student_diemdanh : new_student_diemdanh
				})
			} else {
				this.setState({
					student_diemdanh : [...student_diemdanh, {mssv : mssv, day:day}]
				})
			}	
		}
	}

	// save sinhh vien diem danh
	handleSave(){
		const { student_diemdanh } = this.state
		let msgv = localStorage.getItem('token')
		const { LHP_ID } = this.props.match.params
		
		let data = student_diemdanh
		data = data.map(item=>{
			return `${item.day}:${item.mssv}`
			//return item.mssv;
		})

		//console.log(data)
		if (data.length != 0){
			callApi(`diemdanh/${LHP_ID}`, 'PUT', {data : data.toString()})
			.then(res=>this.setState({
				student_diemdanh : []
			}))	
		}
		
	}
	handleChangeAddStudent(value){
		this.setState({
			student_add	: value
			//student_of_class: student_of_class
		})
	}

	// Click button add
	async handleAddStudent(e){

		let msgv = localStorage.getItem('token')
		const { LHP_ID } = this.props.match.params
		// clear value select
		this.refs.sltStudent.select.clearValue()

		const { student_add, total, student_of_class, student_can_add, student_diemdanh, days } = this.state
		
		// start lay danh sach sinh vien duoc chon & them vao db
		let new_student = []
		student_add.forEach(el=>{
			let data = {
				SV_MSSV : el.student.SV_MSSV,
				LHP_ID : parseInt(LHP_ID),
				DIEM_DANH : '',
				SO_BUOI : total,
				KQDD : 0
			}
			callApi('diemdanh/', 'POST', data)
			.then(res=>{
				let new_student_can_add = student_can_add
				student_can_add.forEach((item, index)=>{
					if (item.SV_MSSV === el.student.SV_MSSV){
						new_student_can_add.splice(index,1)
					}
				})
				this.setState({
					student_can_add : new_student_can_add
				})
			})
		})
		// end lay danh sach sinh vien duoc chon & them vao db
		// start cap nhat danh sach sinh vien trong lop
		let new_student_of_class = await callApi(`diemdanh/${LHP_ID}`, 'GET', null)
		.then(res=> new_student_of_class = res.data)
		
		// end cap nhat danh sach sinh vien trong lop
		// start cap nhat danh sach input check box
		let newDays = days
		//let new_student_of_class = student_of_class
		student_add.forEach((item, index)=>{

			for(let i = 1; i<=total+1; i++){
				let data = {
					mssv : item.value,
					day : i,
					value: false,
					kq : i == total+1 ? true : false
				}
				newDays.push(data)
			}
		})
		this.setState({
			days : newDays,
			student_diemdanh: [],
			student_of_class : new_student_of_class
		})
		// end cap nhat danh sach input check box
	}

	// function del student from class
	del(mssv){
		const { student_of_class, student_can_add } = this.state
		const { LHP_ID } = this.props.match.params
		return () => {
			let new_student_of_class = student_of_class
			let new_student_can_add = student_can_add
			// start xoa sinh vien trong lop (mssv, lhp_id), neu thanh cong thi them vua xoa vao student_can_add
			callApi(`diemdanh/${mssv}/${LHP_ID}`, 'DELETE', null)
			.then(res=>{
				// start them sv vua xoa vao student_can_add
				student_of_class.forEach((el, index)=>{
					if(el.SV_MSSV === mssv){
						new_student_can_add.push({
							SV_MSSV : el.SV_MSSV, SV_HOTEN : el.dm_sinh_vien.SV_HOTEN
						})
						new_student_of_class.splice(index,1)
						return 
					}
				})
				// cap nhat danh state
				this.setState({
					student_of_class : new_student_of_class,
					student_can_add : new_student_can_add
				})
				// end them sv vua xoa vao student_can_add
			})
		}	// end xoa sinh vien trong lop (mssv, lhp_id), neu thanh cong thi them vua xoa vao student_can_add
	}

	// handleUnDisable
	handleClickDay(title){
		return (e) => {
			this.setState({
				clickDay : title.title
			})
		}
	}
	// handle Change check box
	handleChangeCheckBox(mssv, day){
		return () => {
			//console.log(day)
			const { days, student_diemdanh } = this.state
			let newDays = days
			newDays.map(item=>{
				if ( item.mssv == mssv && item.day == day)
					return item.value = !item.value
			})

			let new_student_diemdanh = student_diemdanh
			let check = false
			student_diemdanh.forEach((item, index)=>{
				if (item.mssv == mssv && item.day == day){
					check = true
					new_student_diemdanh.splice(index, 1)
				}
			})
			if (check == false){
				new_student_diemdanh.push({mssv : mssv, day : day, value: true})
			}
			//console.log(new_student_diemdanh)
			this.setState({
				days : newDays,
				student_diemdanh : new_student_diemdanh
			})
		}
	}
	render(){
		// const { match } = this.props
		const { student_add, 
				student_of_class, 
				student_can_add, 
				total, 
				clickDay, 
				status, 
				student_diemdanh,
				days,
				isLogin } = this.state
		if ( isLogin === false ){
			return <Redirect to='/login' />
		}	
		// start tao danh sach student_can_add dung format
		const list_student = student_can_add.reduce((newSV, studentCurrent)=>{
			newSV.push(
				{ 	'value' : studentCurrent.SV_MSSV,
					'student' : studentCurrent,
					'label' : `${studentCurrent.SV_MSSV} - ${studentCurrent.SV_HOTEN}`,
				})
			return newSV
		},[] )
		// end tao danh sach student_can_add dung format
		// tao diem danh
		let titles = []
		for(let i=1; i<=total+1; i++){
			titles.push(i)
		}
		
		return (
			<div className='detail-class'>
				<div className='col-12 info'>
					<div className='col-2 label'>
						<h3>20/30</h3>
					</div>
					<div className='add-student col-9'>
						<Select
							className='col-11'
							placeholder='Add new student'
						    closeMenuOnSelect={false}
						    //defaultValue={array[0]}
						    isMulti
						    options={list_student}
						    onChange={this.handleChangeAddStudent}
						    ref='sltStudent'
						/>
					  	<button className='btn btn-success col-2' onClick={this.handleAddStudent}>Thêm</button>
					</div>
				</div>
				<div className='wrap_table'> 
					<div className='table_1'>
						<table className='table table-hover'>
						<thead>
							<tr>
								<th>Stt</th>
								<th>Họ Tên</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{
								student_of_class.map((student, index)=>{
									return (
										<tr key={ index }>
											<td>{ index + 1 }</td>
											<td>{ student.dm_sinh_vien.SV_HOTEN}</td>
											<td className='hover' onClick={this.del(student.SV_MSSV)}>x</td>
										</tr>
									)
								})
							}
						</tbody>
						</table>
					</div>
					<div className='table_2'>
						<table 
							className='table table-hover'
							>
							<thead>
								<tr>
									{
										titles.map((title, index)=>{	
											return (
												<th className='th' 
													key={index} 
													name={index}
													onClick={this.handleClickDay({title})}
												>
													{index+1}
												</th>
											)
										})
									}
								</tr>
							</thead>
							<tbody>
							{
								student_of_class.map((student, index)=>{
																		
										return (
											<tr key={index}>
											{
												days.map((day, index)=>{
													if (day.mssv == student.SV_MSSV){
														return (
															<td key={index}>
															
																{day.kq == true ? 
																	<div>KQ</div> : 
																	<input 
																		type='checkbox' 
																		name='check' 
																		disabled= { (day.day != this.state.clickDay) ? true : false }																checked = { day.value }
																		checked = { day.value }
																		onChange={this.handleChangeCheckBox(day.mssv, day.day)}
																		/>
																}
																
															</td>
														)
													}
												})
											}
											</tr>
										)
									})
							}
							</tbody>
						</table>
					</div>
				</div>
				<hr />

				<div className='save'>
					<button className='btn btn-info' onClick={this.handleSave}>Lưu lại</button>
				</div>
			</div>
		);
	}
}

export default DetailClass;

