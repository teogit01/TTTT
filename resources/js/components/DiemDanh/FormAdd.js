import React from 'react';
import ReactDOM from 'react-dom';
import randomId from 'randomstring';
import { Redirect } from 'react-router-dom'

import { Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Select from 'react-select'
import callApi from './../../apiCaller/apiCaller'
import './css/FormAdd.scss'

class FormAdd extends React.Component {
	constructor(props) {
		super(props)
		const token = localStorage.getItem('token')
		let isLogin = true
		if ( token == null){
			isLogin = false
		}
		this.state = {
			monhoc : [],
			giaovien : [],
			lop : [],
			txtTen : '',
			txtTongBuoi : 0,
			code : '',
			sltMon : '',
			sobuoi : 0,
			sltGv : '',
			sltLop : '',
			txtBuoi: 0,

			isLogin

		}

		this.onSubmit = this.onSubmit.bind(this)
		this.handleChangTen = this.handleChangTen.bind(this)
		this.handleChangMon = this.handleChangMon.bind(this)
		this.handleChangBuoi = this.handleChangBuoi.bind(this)
		this.handleChangGv = this.handleChangGv.bind(this)
		this.handleChangLop = this.handleChangLop.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.reset = this.reset.bind(this)
		
	}
	async componentDidMount() {
		if (this.state.isLogin === false){
			return 
		}
		
		let newGiaovien = []

		let msgv = localStorage.getItem('token')
		
		let monhoc = await callApi('monhoc', 'GET', null)
		.then(res => monhoc = res.data )
		// let giaovien = await callApi('giaovien', 'GET', null)
		// .then(res => giaovien = res.data )
		
		let giaovien = await callApi(`giaovien`, 'GET', null)
		.then(res => giaovien = res.data )

		let lop = await callApi(`lop`, 'GET', null)
		.then(res => lop = res.data )

		if(monhoc && giaovien){
			this.setState({
				monhoc : monhoc,
				giaovien : giaovien,
				lop : lop
			})
		}
		// console.log('mon hoc',monhoc[monhoc.length-1].MH_ID)
	}
	handleChangTen(e){
		let target = e.target
		let name = target.name
		let value = target.value
		this.setState({
			[name] : value
		})
	}

	handleChangBuoi(e){
		let target = e.target
		let value = target.value
		this.setState({
			sobuoi : parseInt(value)
		})
	}
	handleChangLop(value){
		if (value != null){
			this.setState({
				sltLop : value.value
			})
		}	
	}
	handleChangMon(value){
		if (value != null){
			this.setState({
				sltMon : value.value,
				sobuoi : value.sobuoi
			})
		}	
	}
	handleChangGv(value){
		if (value != null){
			this.setState({
				sltGv : value.value
			})
		}
	}
	async onSubmit(e){
		e.preventDefault()

		const { history } = this.props

		
		const code = randomId.generate(5)

		
		const { sltGv, sltMon, txtTen, sobuoi, sltLop} = this.state

		const data = {
			DD_ID : code,
			//GV_MSGV : sltGv,
			LOP_ID : sltLop,
			GV_MSGV : sltGv,
			MH_ID: sltMon,
			SO_BUOI: sobuoi,
			TRANG_THAI : 1
		}
		//console.log(data)
		callApi('diemdanh/', 'POST', data)
		.then(res=>history.goBack())
		this.reset();
		
	}

	// reset from
	reset(){
		this.setState({
			txtTen : '',
			txtTongBuoi: '',	
		})
		this.refs.sltLop.select.clearValue()
		this.refs.sltMon.select.clearValue()
		this.refs.sltGv.select.clearValue()
	}
	render(){
		const { monhoc, giaovien, 
				lop, txtTen, sltMon, 
				sltGv, txtTongBuoi, sobuoi,
				code, idClassCurrent, isLogin, } = this.state
		if ( isLogin === false ){
			return <Redirect to='/login' />
		}	
		const lop_options = lop.reduce((newLop, l)=>{
			newLop.push({'value' : l.LOP_ID, 'label' : l.LOP_TEN})
			return newLop
		}, [])

		const mon_options = monhoc.reduce((newMon, mon)=>{
			newMon.push({'value' : mon.MH_ID, 'label' : mon.MH_TEN, 'sobuoi' : mon.MH_SOBUOI})
			return newMon
		}, [])

		const giaovien_options = giaovien.reduce((newGV, gv)=>{
			newGV.push({'value' : gv.GV_MSGV, 'label' : gv.GV_HOTEN})
			return newGV
		}, [])
		const inputProps = {
			min: 0,
		};
		return (
			<div className='form-wrapper row'>           
				<form onSubmit = { this.onSubmit }>
				
					<label>Chọn lớp</label>
					<Select 
						options={lop_options}
						//value = {giaovien_options}
						
						name= "sltLop"
						onChange = {this.handleChangLop}
						ref='sltLop'
					/>
					<label>Chọn môn</label>
					<label className='f-right'>Số buổi</label>
					<div className='mon-hoc'>
						<Select 
							options={mon_options} 
							name='ok'
							onChange = {this.handleChangMon}
							ref='sltMon'
							className='w-80'
						/>	
					<input type='number' 
						className='w-20 form-control' 
						name='sobuoi' value={sobuoi} 
						onChange={this.handleChangBuoi}
					/>
					</div>
					<label>Giáo viên</label>
					<Select 
						options={giaovien_options}
						//value = {giaovien_options}
						
						name= "sltGv"
						onChange = {this.handleChangGv}
						ref='sltGv'
					/>		
					<br />
							
					<div className='control-button'>
						<button type='submit' className='btn btn-success'>Thêm</button>
						<span onClick={this.reset} className='btn btn-primary'>Hủy</span>
					</div>
				</form>  
			</div>
		);
	}
}

export default FormAdd;

