import React from 'react';
import ReactDOM from 'react-dom';


class TopMenu extends React.Component {
	constructor(props) {
	  super(props);
		
	  this.state = {
	  	datas : [
	  		{ id: 1, name : 'Home', url : '#', isActive : true},
	  		{ id: 2, name : 'Giới thiệu', url : '#', isActive : false},
	  		{ id: 3, name : 'Liên hệ', url : '#', isActive : false},
	  		{ id: 4, name : 'Tham quan CUSC', url : '#', isActive : false},
	  		{ id: 5, name : 'Đăng nhập', url : '#', isActive : false},
	  	],
	  	hover : false,
	  	isDiemDanh : false
	  };
	  this.onClick = this.onClick.bind(this);
	}
	onClick(data){

	  	return ()=>{	
	  		if(data.id === 2){

	  		}
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
	 enterHover(){
	 	this.setState({
	 		hover : true
	 	})
	 }
	 leaveHover(){
	 	this.setState({
	 		hover : false
	 	})
	 }
	 diemDanh(){
	 	this.setState({
	 		isDiemDanh : !this.state.isDiemdanh
	 	})
	 }
	render(){
		const { datas, hover, isDiemDanh } = this.state		
		return (
	        <div className='TopMenu'>
	        	{/*<nav>
	        		<ul>
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
	            </nav>*/}
	            <div>
	            	<ul className='ul-lv1'>
	            		<li><a href='#'>Home</a></li>
	            		<li>
	            			{/*<a href='#'>Giới thiệu</a>*/}
	            			<ul 
	            				className={hover ? 'show-li':'ul-lv2'} 
	            				onMouseEnter={() => this.enterHover()}
	            				onMouseLeave={() => this.leaveHover()}
	            			>
	            				<li>Giáo viên</li>
	            				<li 
	            					onClick={() => this.diemDanh()}
	            				>Điểm danh
	            				</li>
	            				<li>Xét tốt nghiệp</li>
	            			</ul>
	            		</li>
	            		<li><a href='#'>Liên hệ</a></li>
	            		<li><a href='#'>Tham quan CUSC</a></li>
	            		<li><a href='#'>Đăng nhập</a></li>
	            	</ul>
	            </div>
	        </div>         
    	);
	}
}

export default TopMenu;

