import React, { Component } from 'react';
import * as env from '../../env'
import ReactDOM from 'react-dom';
import { Switch } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

//import '../../../sass/listClass.scss'
import './css/ListDiemDanh.scss'
import callApi from './../../apiCaller/apiCaller'

import DetailClass from './DetailClass'

class ListDiemDanh extends Component {

	constructor(props) {
	  super(props)
	  const token = localStorage.getItem('token')
	  let isLogin = true
	  if ( token == null){
	  	isLogin = false
	  }
	  this.state = {
	  	list_class_origin : [],
	  	list_class : [],
	  	list_render: [],
	  	index_begin: [],
	  	index_end: [],
	  	isLogin,
	  	token : token,
	  	detail : '',
	  	status: 1,

	  	sortLop: 1,
	  	sortMon: 1,
	  	sortGv: 1,
	  	sortTT: 1,

	  	length: 0,
	  	page: 1,
	  	checkedA: true,

	  	keySearch : '',

	  }
	  this.del = this.del.bind(this)
	  this.detail = this.detail.bind(this)
	  this.handleSort = this.handleSort.bind(this)
	  this.handleChangePagination = this.handleChangePagination.bind(this)
	  this.handleSearch = this.handleSearch.bind(this)
	  this.handleFilter = this.handleFilter.bind(this)
	  this.handleChangeSwitch = this.handleChangeSwitch.bind(this)
	}

	async componentDidMount(){
		if (this.state.isLogin === false){
			return 
		} 

		let { token, status } = this.state
		
		let msgv = JSON.parse(token).msgv
		let role = JSON.parse(token).role
		
		if (role ==1 ){
			let list_class = []
			await callApi('diemdanh', 'GET', null)
			.then(res => {
				//list_class = res.data
				let list_class_origin = res.data
				res.data.map(item=>{
					if (item.TRANG_THAI === status){
						return list_class.push(item)
					}
				})
				//console.log(list_class)

				let i = 0
				let index_begin = []
				let index_end = []
				while(i<res.data.length){
					index_begin.push(i)
					i = i + env.pagination
					index_end.push(i)
				}
				let list_render = list_class.slice(index_begin[0], index_end[0])
				this.setState({
					list_class_origin : list_class_origin,
					list_class : list_class,
					length : Math.ceil(list_class.length/env.pagination),
					index_begin: index_begin,
					index_end: index_end,
					list_render : list_render
				})
			})
		} else {
			let list_class  = []
			await callApi(`diemdanh_gv/${msgv}`, 'GET', null)
			.then(res => {
				
				let list_class_origin = res.data
				res.data.map(item=>{
					if (item.TRANG_THAI === status){
						return list_class.push(item)
					}
				})

				let i = 0
				let index_begin = []
				let index_end = []
				while(i<res.data.length){
					index_begin.push(i)
					i = i + env.pagination
					index_end.push(i)
				}
				let list_render = list_class.slice(index_begin[0], index_end[0])
				this.setState({
					list_class_origin : list_class_origin,
					list_class : list_class,
					length : Math.ceil(list_class.length/env.pagination),
					index_begin: index_begin,
					index_end: index_end,
					list_render : list_render
				})
			})
		}
	}
	handlePageChange(pageNumber) {
		console.log(`active page is ${pageNumber}`);
		this.setState({activePage: pageNumber});
	}
	findIndex(arr, id){
		let result = -1;
		arr.map((item, index)=>{
			if (item.DD_ID == id){
				result = index;
			}
		})
		return result
	}
	del(DD_ID){
		return () => {
			//console.log(DD_ID)

			// start xoa Diem danh
		 	callApi(`diemdanh/${DD_ID}`, 'DELETE', null)
			.then( res =>callApi(`ctdd/lop/${DD_ID}`, 'DELETE', null))			
			// // start xoa Diem danh
			let { list_class } = this.state

			//console.log(list_class)

			// start cap nhat state
			const index = this.findIndex(list_class, DD_ID)
			let newList = list_class;
			if (index != -1){
				newList.splice(index,1)


				let i = 0
				let index_begin = []
				let index_end = []
				while(i<newList.length){
					index_begin.push(i)
					i = i + env.pagination
					index_end.push(i)
				}
				let render = newList.slice(index_begin[0], index_end[0])

				this.setState({
					//list_render : new_list_render
					list_class : newList,
					list_render : render,

					index_begin: index_begin,
					index_end: index_end,
					page : 1,

					length: Math.ceil(newList.length/env.pagination),
				})
			}
		}
	}
	detail(DD_ID){
		return () => {
			const { history } = this.props
			//console.log(history)
			let path = `detail/${DD_ID}`
			history.replace(path)
		}
	}
	handleSort(type){
		const { list_class, sortLop, sortMon, sortGv, sortTT, list_render } = this.state
		return ()=>{
			let new_list_class = list_render

			//console.log(new_list_class)
			let new_sortLop = new_list_class.sort((a, b)=>{
				if (type == 'lop'){
					if (a.LOP_ID > b.LOP_ID) return sortLop;
					else if (a.LOP_ID < b.LOP_ID) return -sortLop;
					else return 0;
				}
			})
			let new_sortMon = new_list_class.sort((a, b)=>{
				if (type == 'mon'){
					if (a.dm_mon.MH_TEN > b.dm_mon.MH_TEN) return sortMon;
					else if (a.dm_mon.MH_TEN < b.dm_mon.MH_TEN) return -sortMon;
					else return 0;
				}
			})
			let new_sortGv = new_list_class.sort((a, b)=>{
				if (type == 'gv'){
					if (a.dm_gv.GV_HOTEN > b.dm_gv.GV_HOTEN) return sortGv;
					else if (a.dm_gv.GV_HOTEN < b.dm_gv.GV_HOTEN) return -sortGv;
					else return 0;
				}
			})
			let new_sortTT = new_list_class.sort((a, b)=>{
				if (type == 'tt'){
					if (a.TRANG_THAI > b.TRANG_THAI ) return sortTT;
					else if (a.TRANG_THAI < b.TRANG_THAI) return -sortTT;
					else return 0;
				}
			})
	
			if (type == 'lop'){
				this.setState({
					list_render : new_sortLop,
					sortLop : sortLop == -1 ? 1 : -1
				})	
			} else {
				if (type == 'mon' ){
					this.setState({
						list_render : new_sortMon,
						sortMon : sortMon == -1 ? 1 : -1
					})	
				} else {
					if (type == 'gv'){
						this.setState({
							list_render : new_sortGv,
							sortGv : sortGv == -1 ? 1 : -1
						})	
					} else {
						this.setState({
							list_render : new_sortTT,
							sortTT : sortTT == -1 ? 1 : -1
						})				
					}
				}
			}
			
		}
	}
	handleChangePagination(e, value){
		const { list_class, index_begin, index_end } = this.state
		
		let list_render = list_class.slice(index_begin[value-1], index_end[value-1])
		//console.log(list_render)
		this.setState({
			page : value,
			list_render : list_render
		})
	}	
	handleSearch(e){
		let text = e.target.value
		let { list_render, list_class_origin, list_class, page, status } = this.state
		let new_list_render
		let list_origin = []
		if(status == 2){
			list_origin = list_class_origin
		}else{
			list_class_origin.map(item=>{
				if (item.TRANG_THAI == status)
					list_origin.push(item)
			})
		}
		if (text){
			new_list_render = list_origin.filter(el=>{
				if (el.LOP_ID.toLowerCase().indexOf(text) !== -1){
					return el
				}
			})
		} else {
			let i = 0
			let index_begin = []
			let index_end = []
			while(i<list_origin.length){
				index_begin.push(i)
				i = i + env.pagination
				index_end.push(i)
			}
			let render = list_origin.slice(index_begin[0], index_end[0])
			console.log(render)
			this.setState({
				//list_render : new_list_render
				list_class : list_class_origin,
				list_render : render,

				index_begin: index_begin,
				index_end: index_end,
				page : 1,

				length: Math.ceil(list_class_origin.length/env.pagination),
			})
			return 
		}
		//console.log(new_list_render)
		if (new_list_render){
			let i = 0
			let index_begin = []
			let index_end = []
			while(i<new_list_render.length){
				index_begin.push(i)
				i = i + env.pagination
				index_end.push(i)
			}
			let render = new_list_render.slice(index_begin[0], index_end[0])
			this.setState({
				//list_render : new_list_render
				list_class : new_list_render,
				list_render : render,

				index_begin: index_begin,
				index_end: index_end,
				page : 1,
				length: Math.ceil(new_list_render.length/env.pagination),
			})
		} else {
			let i = 0
			let index_begin = []
			let index_end = []
			while(i<list_class_origin.length){
				index_begin.push(i)
				i = i + env.pagination
				index_end.push(i)
			}
			let render = list_class_origin.slice(index_begin[page], index_end[page])
			this.setState({
				//list_render : new_list_render
				list_class : list_class_origin,
				list_render : render,

				index_begin: index_begin,
				index_end: index_end,

				page : 1,
				length: Math.ceil(list_class_origin.length/env.pagination),
			})
		}
	}
	handleFilter(e){
		let { list_class_origin, status } = this.state
		let type = e.target.value

		if (type == 1){
			// dang hoat dong
			let list_class = []
				list_class_origin.map(item=>{
					if (item.TRANG_THAI == 1){
						list_class.push(item)
					}
					let i = 0
					let index_begin = []
					let index_end = []
					while(i<list_class.length){
						index_begin.push(i)
						i = i + env.pagination
						index_end.push(i)
					}
					let list_render = list_class.slice(index_begin[0], index_end[0])
					this.setState({
						list_class : list_class,
						length : Math.ceil(list_class.length/env.pagination),
						index_begin: index_begin,
						index_end: index_end,
						list_render : list_render,
						status : 1,
					})
				})
		} else {
			if (type == 2){
				let list_class = []
				list_class_origin.map(item=>{
					if (item.TRANG_THAI != 1){
						list_class.push(item)
					}
					let i = 0
					let index_begin = []
					let index_end = []
					while(i<list_class.length){
						index_begin.push(i)
						i = i + env.pagination
						index_end.push(i)
					}
					let list_render = list_class.slice(index_begin[0], index_end[0])
					this.setState({
						list_class : list_class,
						length : Math.ceil(list_class.length/env.pagination),
						index_begin: index_begin,
						index_end: index_end,
						list_render : list_render,
						status : 2,
					})
				})
			} else {
				if (type == 0){
					let list_class = list_class_origin
					let i = 0
					let index_begin = []
					let index_end = []
					while(i<list_class.length){
						index_begin.push(i)
						i = i + env.pagination
						index_end.push(i)
					}
					let list_render = list_class.slice(index_begin[0], index_end[0])
					this.setState({
						list_class : list_class,
						length : Math.ceil(list_class.length/env.pagination),
						index_begin: index_begin,
						index_end: index_end,
						list_render : list_render,
						status : 0,
					})
				}
			}
		}
		//console.log(e.target.value)
		
	}
	handleChangeSwitch(diemdanh, index){
		const { list_render } = this.state
		let new_list_render = list_render
		return ()=>{
			callApi(`diemdanh/${diemdanh.DD_ID}`, 'PUT', null)
			new_list_render[index].TRANG_THAI = new_list_render[index].TRANG_THAI == 1 ? 2 : 1
			this.setState({
				list_render : new_list_render
			})
		}
	}
	render(){
		//console.log(env.pagination)
		const { list_class_origin, list_class, isLogin, msgv, detail, token, length, page, list_render, keySearch } = this.state
		const role = JSON.parse(token).role
		let isShow = role == 1 ? '' : 'hide'
		
		if ( isLogin === false ){
			return <Redirect to='/login' />
		}	
		//console.log(keySearch)
		return (
	        <div className='ListDiemDanh'>
	        	{/*<Route path='/diemdanh/id' exact component={ DetailClass } />*/}
	        	<div className='giao_vien'>
	        		<label>Giáo viên: { list_class_origin[0] ? list_class_origin[0].dm_gv.GV_HOTEN : ''}</label>
	        	</div>
	        	<div className='list-control'>
	        		<input type='text' 
	        			className='form-control input' 
	        			onChange={this.handleSearch}
	        			placeholder='Tìm kiếm...' />
	        		<select className='form-control select' onChange={this.handleFilter}>
	        			<option value='1'>Đang hoạt động</option>
	        			<option value='2'>Đã kết thúc</option>
	        			<option value='0'>Tất cả</option>
	        		</select>
	        	</div>
	        	
	        	<table className='table table-hover'>
	        		<thead>
	        			<tr>
	        				<th>Stt</th>
	        				<th className='hover' onClick={this.handleSort('lop')}>Tên lớp</th>
	        				<th className='hover' onClick={this.handleSort('mon')}>Tên môn</th>
	        				<th className={isShow+' hover'} onClick={this.handleSort('gv')}>Giáo viên</th>
	        				<th>Số buổi</th>
	        				<th className='hover' onClick={this.handleSort('tt')}>Hành động</th>
	        			</tr>
	        		</thead>
	        		<tbody>
	        			{
	        				list_render.map((item, index)=>{
	        					let isBlock = item.TRANG_THAI != 1 ? 'block' : ''
	        					return (
	        						<tr key={index} className={isBlock}>
	        							<td>{index+1}</td>
	        							<td>{item.dm_lop.LOP_TEN}</td>
	        							<td>{item.dm_mon.MH_TEN}</td>
	        							<td className={isShow}>{item.dm_gv.GV_HOTEN}</td>
	        							<td>{item.SO_BUOI}</td>
	        							<td className='hover'>
	        								<span className={isShow} onClick={this.del(item.DD_ID)}>Xoá</span>
	        								&nbsp;&nbsp;&nbsp;
	        								<span onClick={this.detail(item.DD_ID)}>Chi tiết</span>
	        								<Switch
	        									className='switch'
		        								//checked={this.state.checkedB}
		        								checked={item.TRANG_THAI === 1 ? true : false}
		        								onChange={this.handleChangeSwitch(item, index)}
		        								size="small"
		        								color="primary"
		        								name="checkedB"
		        								inputProps={{ 'aria-label': 'primary checkbox' }}
		        							/>
	        							</td>
	        						</tr>
	        					)
	        				})
	        			}
	        		</tbody>
	        	</table>	       
	        	<div>
		        	
		        	<Pagination 
		        		count={length} 
		        		color="primary" 
		        		className='pagination' 
		        		page={page}
		        		onChange={this.handleChangePagination}
		        	/>
		        	
	        	</div> 	
	        </div>         
    	);
	}
}

export default ListDiemDanh;

