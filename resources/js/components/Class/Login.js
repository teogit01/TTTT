import React from 'react';

import { Redirect } from 'react-router-dom'
import callApi from './../../apiCaller/apiCaller'
import './css/Login.scss'

//import { Button, TextField } from '@material-ui/core';

class Login extends React.Component {
	constructor(props) {
		super(props)
		const token = localStorage.getItem('token')
		let isLogin = true
		if ( token == null){
			isLogin = false
		}
		this.state = {
			username: '',
			password: '',
			isLogin
		}
	
		this.handleChange = this.handleChange.bind(this)		
		this.handleSubmit = this.handleSubmit.bind(this)
	}	

	handleChange(e){
		let target = e.target
		let name = target.name
		let value = target.value
		this.setState({
			[name] : value
		})

	}

	async handleSubmit(e){
		e.preventDefault()
		const { history } = this.props

		const { username, password } = this.state
		let dsgv = await callApi('giaovien', 'GET', null)
		.then(res=>dsgv = res.data)
		
		dsgv.forEach(item=>{
			if (item.GV_UserName === username){
				if ( item.GV_PassWord === password ){
					localStorage.setItem('token',item.GV_MSGV)
					this.setState({
						isLogin : true
					},window.location.reload())
				}
			}
		})
	}

	render(){
		const { username, password, isLogin } = this.state
		if ( isLogin === true ){
			return <Redirect to= '/class' />
		}
		return (
			<div className='login' onSubmit={this.handleSubmit}>
				<form>
					<h2>Đăng nhập</h2>
					
						<label>Tên Tài Khoản</label>
						<input 
									//label="Tài Khoản" 
									className='form-control' 
									variant="outlined" 
									size="small" 
									type="text"
									//name= "txtTongBuoi"
									//inputProps={inputProps}
									name = 'username'
									onChange={ this.handleChange }
								/>
					
					<label>Mật Khẩu</label>
					<input 
								//label="Mật Khẩu" 
								className='form-control' 
								variant="outlined" 
								size="small" 
								type="password"
								//name= "txtTongBuoi"
								//inputProps={inputProps}
								name = 'password'
								onChange={ this.handleChange }
							/>	

					<br />
					<button className='btn btn-primary btn-block'>Đăng Nhập</button>
				</form>

			</div>
		);
	}
}

export default Login;

