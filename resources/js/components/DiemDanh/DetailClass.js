import React from 'react';
import moment from 'moment'

import { Button, TextField, Tooltip, Switch } from '@material-ui/core';


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

			student_up : [],

			clickDay : -1,

			LOP_ID :'',
			MH_ID :'',
			MH_TEN :'',

			titles:[],
			token: '',

			date : moment().format('YYYY-MM-DD'),
			date_curent : moment().format('YYYY-MM-DD'),
			
			check : '',
			isLogin,
			checkedA: false,
    		checkedB: true,
			
		}
		this.handleChangeAddStudent = this.handleChangeAddStudent.bind(this)
		this.handleAddStudent = this.handleAddStudent.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleClickDay = this.handleClickDay.bind(this)
		this.handleChangeCheckBox = this.handleChangeCheckBox.bind(this)
		this.handleChangeDate = this.handleChangeDate.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}


	// handleChangeDate
	handleChangeDate(e){
		//console.log(e.target.value)
		this.setState({
			date : e.target.value
		})
	}
	async componentDidMount(){
		if (this.state.isLogin === false){
			return 
		}
		
		let msgv = localStorage.getItem('token')
		const { DD_ID } = this.props.match.params
		// load thong tin lop diem danh
		let sobuoi = 0;
		let MH_ID
		let LOP_ID
		await callApi(`diemdanh/${DD_ID}`, 'GET', null)
		.then(res => {
			sobuoi = res.data[0].SO_BUOI
			LOP_ID = res.data[0].LOP_ID
			MH_ID = res.data[0].MH_ID
		})
		// load tat ca sv cua lop diem danh
		let student_of_class = []
		let ctdd = []
		await callApi(`sv_of_ctdd/${DD_ID}`, 'GET', null)
		.then((res) => //student_of_class = res.data
				student_of_class = res.data
			)

		let titles = []
		//console.log(student_of_class)
		if (student_of_class.length > 0){
			student_of_class[0].dm_ctdd.map((el, index)=>{
				if (el.DD_ID == DD_ID){
				//console.log(typeof(el))
					JSON.parse(el.DIEM_DANH).map(item=>{
						//console.log(el)
						titles.push({
							// day : JSON.parse(el.DIEM_DANH)[index].day,
							// buoi : JSON.parse(el.DIEM_DANH)[index].buoi
							day : item.day,
							buoi : item.buoi
						})	
					})
				}
			})
		}
		
		//SV co the them vo lop
		let student_can_add  = await callApi(`sv_khac_ctdd/${DD_ID}`, 'GET', null)
		.then(res => student_can_add = res.data)
		this.setState({
			student_of_class : student_of_class,
			student_can_add : student_can_add,
			total : sobuoi,
			LOP_ID: LOP_ID,
			MH_ID: MH_ID,
			titles: titles,
			token : JSON.parse(msgv)
		})

	}
	// save sinhh vien diem danh
	handleSave(){
		let { DD_ID } = this.props.match.params
		let { student_up, student_of_class } = this.state
		let data = []

		student_of_class.map((el, index)=>{
			//console.log('el', el)				
			el.dm_ctdd.map((item, index_day)=>{

				if (item.DD_ID == DD_ID){
					data.push({
						'mssv' : el.SV_MSSV,
						'diemdanh' : el.dm_ctdd[index_day].DIEM_DANH
					})
				}
			})
		})

		callApi(`ctdd/${DD_ID}`, 'PUT', data)
		.then(res=>console.log('PUT', res.data))
		//console.log(data)

	}
	handleChangeAddStudent(value){
		this.setState({
			student_add	: value
			//student_of_class: student_of_class
		})
	}
	// Click button add
	async handleAddStudent(e){
		this.refs.sltStudent.select.clearValue()
		const { DD_ID } = this.props.match.params

		const { student_of_class, student_can_add, student_add, total } = this.state
		
		student_add.forEach(el=>{
			let data = {
				DD_ID : DD_ID,
				SV_MSSV : el.value,
				SO_BUOI : total
			}
			callApi('ctdd/', 'POST', data)
		})	
		// load tat ca sv cua lop diem danh
		let new_student_of_class = await callApi(`sv_of_ctdd/${DD_ID}`, 'GET', null)
		.then((res) => new_student_of_class = res.data)
		
		//console.log(JSON.parse(student_of_class[0].dm_ctdd[0].DIEM_DANH))
		//SV co the them vo lop
		
		let new_student_can_add  = await callApi(`sv_khac_ctdd/${DD_ID}`, 'GET', null)
		.then(res => new_student_can_add = res.data)
		
		this.setState({
			student_of_class : new_student_of_class,
			student_can_add : new_student_can_add,
		})
	}
	// function del student from class
	del(DD_ID, SV_MSSV){

		return () =>{	
			
			callApi(`ctdd/del/${DD_ID}/${SV_MSSV}`, 'DELETE', null)
			.then(async res=>{

				let student_can_add  = await callApi(`sv_khac_ctdd/${DD_ID}`, 'GET', null)
				.then(res => student_can_add = res.data)
				
				var student_of_class = await callApi(`sv_of_ctdd/${DD_ID}`, 'GET', null)
				.then((res) => student_of_class = res.data)
				
				this.setState({
					student_of_class : student_of_class,
					student_can_add : student_can_add
				})
			})
		}	
	}
	// handleUnDisable
	handleClickDay(title){
		return (e) => {
			if (title.title.day === ''){
				console.log('chaua co day')
				this.setState({
					date : moment().format('YYYY-MM-DD')
				})
			} else {
				console.log('else ',title.title.day)
				this.setState({
					date : title.title.day
				})
			}
			
		}
	}
	// handle Change check box
	handleChangeCheckBox(SV_MSSV, BUOI, DATE){
		const { DD_ID } = this.props.match.params
		return (e) => {
			//console.log(SV_MSSV, BUOI, DATE)
			let { student_of_class, student_up, total, titles } = this.state
			let student = ''
			let up_student_of_class = student_of_class
			//let up_student_of_class = []
			let new_titles = titles

			//set day 
			student_of_class.map((el, index)=>{
				
				el.dm_ctdd.map((item, index_day)=>{

				if (item.DD_ID == DD_ID){
						//console.log(JSON.parse(item.DIEM_DANH))
						let new_DIEM_DANH = JSON.parse(item.DIEM_DANH)
						JSON.parse(item.DIEM_DANH).map((ctdd, index_buoi)=>{
							new_DIEM_DANH[index_buoi] = {
								day : BUOI+1 === ctdd.buoi ? DATE : ctdd.day,
								buoi : ctdd.buoi,
								value : ctdd.value
							}
						})
						//console.log(index)
						up_student_of_class[index].dm_ctdd[index_day].DIEM_DANH = JSON.stringify(new_DIEM_DANH)
					}
				})
			})
			this.setState({
				student_of_class : up_student_of_class
			})
			//console.log(student_of_class)
			
			//console.log(student_up)
			let new_student_up = student_up
			student_of_class.map((el, index)=>{
				//console.log(el)
				if (el.SV_MSSV == SV_MSSV){					
					let new_ctdd = []
					el.dm_ctdd.map((item, index_day)=>{
						if (item.DD_ID == DD_ID){
							let new_DIEM_DANH = JSON.parse(item.DIEM_DANH)
							JSON.parse(item.DIEM_DANH).map((ctdd, index_buoi)=>{
								if (new_DIEM_DANH[index_buoi].buoi==BUOI+1){
									new_DIEM_DANH[index_buoi] = {
										day : DATE,
										buoi: ctdd.buoi,
										value : !ctdd.value
									}
								}
							})
							up_student_of_class[index].dm_ctdd[index_day].DIEM_DANH = JSON.stringify(new_DIEM_DANH)
						}
					})
				}
			})
			console.log(student_of_class)
			let uniqueSet = new Set(new_student_up)
			let student_will_up = [...uniqueSet]
			this.setState({
				//student_up : student_will_up,
				//student_up : new_student_up,
				student_of_class : up_student_of_class,
				new_titles : new_titles
			})
			console.log(up_student_of_class)
		}
	}
	handleChange(){
    	this.setState(
    		{[event.target.name]: event.target.checked });
  	};
	render(){
		const { match } = this.props
		const { DD_ID } = match.params
		const { student_add, 
				student_of_class, 
				student_can_add, student_up,
				total, date_curent, 
				clickDay, checkedB, yesterday,
				isLogin, date, titles, token,
				LOP_ID, MH_ID } = this.state
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
		//console.log(new Date(date).getTime())
		//console.log(new Date('2020-09-02').getTime())
		const isShow = JSON.parse(localStorage.getItem('token')).role == 1 ? 'show' : 'hide'
		// index of ctdd
		let index_ctdd =[]
		student_of_class.map(student=>{
			student.dm_ctdd.map((el, ctdd_index)=>{
				if (el.DD_ID == DD_ID){
					index_ctdd.push(ctdd_index)
				}
			})			
		})
		//console.log(index_ctdd)
		return (
			<div className='detail-class'>
			<div className='col-12'>
				<div className='col-4'>
					Batch: {LOP_ID}
				</div>	
				<div className='col-4'>
					Course / Module: {MH_ID}
				</div>	
				<div className = {isShow}>
					<Switch
			        	checked={this.state.checkedB}
			        	onChange={this.handleChange}
			        	color="primary"
			        	name="checkedB"
			        	inputProps={{ 'aria-label': 'primary checkbox' }}
			      	/>
			    </div>
			</div>
				<div className='col-12 info'>
					<div className='add-student col-9'>
						<h3><input 
							type='date' 
							value={date}
							min={JSON.parse(localStorage.getItem('token')).role == 1 ? '' : date_curent}
							onChange = {this.handleChangeDate}
							className='form-control' /></h3>
						<Select
							className={isShow+' col-11'}
							placeholder='Add new student'
						    closeMenuOnSelect={false}
						    //defaultValue={array[0]}
						    isMulti
						    options={list_student}
						    onChange={this.handleChangeAddStudent}
						    ref='sltStudent'
						/>
					  	<button className={isShow+' btn btn-success col-2'} onClick={this.handleAddStudent}>Thêm</button>
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
											<td>{ student.SV_HOTEN}</td>
											<td className='hover' onClick={this.del(DD_ID,student.SV_MSSV)}>x</td>
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
												<Tooltip key={index} title={title.day} placement="top-end">
													<th className='th' 
														name={index}
														onClick={this.handleClickDay({title})}
														>
														B{index+1}
													</th>
												</Tooltip>
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
												JSON.parse(student.dm_ctdd[index_ctdd[index]].DIEM_DANH).map((el, k)=>{
													//console.log(el.day)
													if (token.role == 1){
														return (
															<td key={k}>
																<input 
																	type='checkbox'
																	disabled={
																		checkedB ? true : false
																		//(new Date(el.day).getTime() < new Date(date).getTime) ?
																		//true : false
																	}
																	checked = { el.value }
																	onChange={this.handleChangeCheckBox(student.SV_MSSV,k,date)}
																/>
															</td>
														)	
													} else {
														return (
														<td key={k}>
															<input 
																type='checkbox'
																	disabled={
																	(new Date(el.day).getTime() < new Date(date).getTime()) ?
																		true : false 
																		//(new Date(el.day).getTime() < new Date(date).getTime) ?
																		//true : false
																	}
																	checked = { el.value }
																	onChange={this.handleChangeCheckBox(student.SV_MSSV,k,date)}
																/>
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
				<div>
					GV: LUU TIEN DAO
				</div>
				<div>Ngay:<input type='date' value={date_curent} className='form-control' /></div>
			</div>
		);
	}
}

export default DetailClass;

