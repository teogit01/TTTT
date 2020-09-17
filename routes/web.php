<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });

route::prefix('/class')->group(function(){
	route::get('/',function(){
		return view('src/index');
		//return DB::table('APTECH_DMDIEMTHI')->get();
	});	
	route::get('/{msgv}', function(){
		return view('src/index');
	});
	route::get('/{msgv}/{id}',function(){
		return view('src/index');
		//return DB::table('APTECH_DMDIEMTHI')->get();
	});
});
route::get('/diemdanh/all',function(){
	return view('src/index');
		//return DB::table('APTECH_DMDIEMTHI')->get();
});
route::get('/login',function(){
	return view('src/index');
		//return DB::table('APTECH_DMDIEMTHI')->get();
});
route::get('/logout',function(){
	return view('src/index');
		//return DB::table('APTECH_DMDIEMTHI')->get();
});
route::get('/diemdanh/add',function(){
	return view('src/index');
		//return DB::table('APTECH_DMDIEMTHI')->get();
});
route::get('/diemdanh',function(){
	return view('src/index');
		//return DB::table('APTECH_DMDIEMTHI')->get();
});
route::get('/diemdanh/detail/{id}',function(){
	return view('src/index');
		//return DB::table('APTECH_DMDIEMTHI')->get();
});
route::get('/diemdanh/{id}',function(){
	return view('src/index');
		//return DB::table('APTECH_DMDIEMTHI')->get();
});

route::get('/xtn',function(){
	return view('src/totnghiep');
		//return DB::table('APTECH_DMDIEMTHI')->get();
});
use App\Models\DiemDanh;
use App\Models\DMSinhVien;
route::get('test',function(){
		$diemDanh = DiemDanh::where('LHP_ID',6)->get();
		return view('src/test',['diemdanh'=>$diemDanh]);
		//return DB::table('APTECH_DMDIEMTHI')->get();
	});
route::prefix('admin')->group(function(){
	route::get('/','Admin\AdminController@index')->name('admin.index');
	// route::get('/',function(){
	// 	return 'ok';
	// });
});



