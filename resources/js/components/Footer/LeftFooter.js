import React from 'react';
import ReactDOM from 'react-dom';

class LeftFooter extends React.Component {
	render(){
		return (
			<div className='LeftFooter'>
                <div className="col-md-12">
	                <p>
	                	<b>&copy; Trung tâm công nghệ phần mềm Đại Học Cần Thơ</b>
	                	<br/>
	                	Địa chỉ: 01 Lý Tự Trọng, Quận Ninh Kiều, Tp.Cần Thơ
	                	<br/>
		                Fax: +84 292 373 1071
		                <br/>
		                Email: cusc@ctu.edu.vn
		                <br/>
		                Điện thoại: +84 292 383 5581
		            </p>
                </div>
            </div>
    	);
	}
}

export default LeftFooter;

