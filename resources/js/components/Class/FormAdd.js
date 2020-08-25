import React from 'react';
import ReactDOM from 'react-dom';
import randomId from 'randomstring';

import { Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Select from 'react-select'
import callApi from './../../apiCaller/apiCaller'
import './css/FormAdd.scss'

class FormAdd extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			monhoc : [],
			giaovien : [],
			txtTen : '',
			txtTongBuoi : 0,
			code : '',
			sltMon : '',
			sltGv : '',

			idClassCurrent : ''
		}

		this.onSubmit = this.onSubmit.bind(this)
		this.handleChangTen = this.handleChangTen.bind(this)
		this.handleChangMon = this.handleChangMon.bind(this)
		this.handleChangGv = this.handleChangGv.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.reset = this.reset.bind(this)
		
	}
	async componentDidMount() {

		let monhoc = await callApi('monhoc', 'GET', null)
		.then(res => monhoc = res.data )
		let giaovien = await callApi('giaovien', 'GET', null)
		.then(res => giaovien = res.data )

		if(monhoc && giaovien){
			this.setState({
				monhoc : monhoc,
				giaovien : giaovien,
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
	handleChangMon(value){
		if (value != null){
			this.setState({
				sltMon : value.value
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

		// Lay LHP_ID hien tai trong csld 
		let idClass = await callApi('lhphan', 'GET', null)
		.then(res => res.data[res.data.length-1])
		
		this.setState({
			code : randomId.generate(5),
			idClassCurrent : idClass.LHP_ID

		})
		const { sltGv, sltMon, txtTen, txtTongBuoi, code, idClassCurrent } = this.state
		const data = {
			LHP_ID : idClassCurrent + 1,
			GV_MSGV : sltGv,
			MH_ID : sltMon,
			LHP_MA : code,
			LHP_TEN : txtTen,
			LHP_TONGBUOI : txtTongBuoi,
		}
		callApi('lhphan/', 'POST', data)
		.then(res => {
			history.goBack()
		})
			
	}

	// reset from
	reset(){
		this.setState({
			txtTen : '',
			txtTongBuoi: '',	
		})
		this.refs.sltMon.select.clearValue()
		this.refs.sltGv.select.clearValue()
	}
	render(){
		const { monhoc, giaovien, txtTen, sltMon, sltGv, txtTongBuoi, code, idClassCurrent } = this.state

		const mon_options = monhoc.reduce((newMon, mon)=>{
			newMon.push({'value' : mon.MH_ID, 'label' : mon.MH_TEN})
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
			<div className='form-wrapper'>
{/*				<form>
					<label>Tên lớp</label>
					<TextField label="Tên lớp" className='form-control' variant="outlined" size="small" />

					<label>Chọn môn</label>
						<Autocomplete
							freeSolo
							options={monhoc}
							getOptionLabel={(mon) => mon.MH_TEN}
							style={{ width: '100%' }}
							renderInput={(params) => 
								<TextField {...params} 
									label="Môn học" 
									className='form-control' 
									variant="outlined" 
									size="small" 
								/>}
						/>
					<label>Giáo viên</label>
						<Autocomplete
							freeSolo
							options={giaovien}
							getOptionLabel={(gv) => gv.GV_HOTEN}
							style={{ width: '100%' }}
							renderInput={(params) => 
								<TextField {...params} 
									label="Giáo viên" 
									className='form-control' 
									variant="outlined" 
									size="small" 
								/>}
							/>
							
							<br />
							<Select options={options} />
							<br />
					<button type='submit' className='btn btn-success'>Thêm</button>
				</form>  */}             
				<form onSubmit = { this.onSubmit }>
					<div className='row'>
						<div className='col-sm-10'>
							<label>Tên lớp</label>
							<TextField 
								label="Tên lớp" 
								className='form-control' 
								variant="outlined" 
								size="small" 
								type="text"
								value={ txtTen }
								name= "txtTen"
								onChange={ this.handleChangTen }
								//inputRef='txtTen'
								ref='txtTen'
							/>
						</div>
						<div className='col-sm-2'>
							<label>Tổng buổi</label>
							<TextField 
								label="Tổng buổi" 
								className='form-control' 
								variant="outlined" 
								size="small" 
								type="number"
								value={ txtTongBuoi }
								name= "txtTongBuoi"
								inputProps={inputProps}
								onChange={ this.handleChangTen }
							/>
						</div>
					</div>
					
					<label>Chọn môn</label>
					<Select 
						options={mon_options} 
						name='ok'
						onChange = {this.handleChangMon}
						ref='sltMon'
					/>	
						
					<label>Giáo viên</label>
					<Select 
						options={giaovien_options} 
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

