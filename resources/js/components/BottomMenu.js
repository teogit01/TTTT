import React from 'react';
import ReactDOM from 'react-dom';


class BottomMenu extends React.Component {
	constructor(props) {
	  super(props);
		
	  this.state = {
	  	datas : [
	  		{ id: 1, name : 'Tuyển sinh', url : '#', isActive : false},
	  		{ id: 2, name : 'Việc làm', url : '#', isActive : false},
	  		{ id: 3, name : 'Đào tạo quốc tế', url : '#', isActive : false},
	  		{ id: 4, name : 'Đào tạo ngắn hạn', url : '#', isActive : false},
	  		{ id: 5, name : 'Đào tạo sơ cấp nghề', url : '#', isActive : false},
	  		{ id: 6, name : 'Đào tạo theo yêu cầu', url : '#', isActive : false},
	  		{ id: 7, name : 'Giảng viên', url : '#', isActive : false},
	  		{ id: 8, name : 'Giáo vụ', url : '#', isActive : false},
	  		{ id: 9, name : 'Gương tiêu biểu', url : '#', isActive : false},
	  	]
	  };
	  this.onClick = this.onClick.bind(this);
	}
	onClick(data){
	  	return ()=>{	
	  		let datas = this.state.datas.map((data)=>data.isActive = false)
	  		datas = [
	  			...this.state.datas.slice(0,this.state.datas.indexOf(data)),
	  			{
	  				...data,
	  				isActive : data.id === 5 ? false : true
	  			},
	  			...this.state.datas.slice(this.state.datas.indexOf(data)+1)   
	  		];
	  		this.setState({
	  			datas : datas
	  		})
	  	}
	 }
	render(){
		const { datas } = this.state;
		return (
	        <div className='BottomMenu'>
	        	<nav>
	        		<ul className='ul-lv1'>
	        			{datas.map((data,index)=>{
	        				return <li
	        							className={data.isActive ? 'active' : ''}
	        							key={ index }
	        							onClick = { this.onClick(data) }
	        						>
	        						<a href={ data.url }>{data.name}</a>
	        					</li>
	        			})}
	            	</ul>
	            	<div className='sub-content'>
		            	<marquee direction="left" width="98%">
		            		This is a sample scrolling text that has scrolls texts to left.
		            	</marquee>
	            	</div>
	            </nav>
	        </div>         
    	);
	}
}

export default BottomMenu;

