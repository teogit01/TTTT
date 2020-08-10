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

Route::get('/', function () {
    return view('welcome');
});

route::prefix('diemdanh')->group(function(){
	route::get('/',function(){
		return view('src/index',['data'=>'dataTest']);
		//return DB::table('APTECH_DMDIEMTHI')->get();
	});
});

route::prefix('admin')->group(function(){
	route::get('/','Admin\AdminController@index')->name('admin.index');
	// route::get('/',function(){
	// 	return 'ok';
	// });
});


route::get('/testfilm','Admin\AdminController@test');
route::get('/del/{id}','Admin\AdminController@del')->name('del');



route::get('/film', function (){
	//return Http::get('http://127.0.0.1:8001/api/films');
	$data = Http::get('http://127.0.0.1:8000/api/films');
	return $data;
	//return view('add',['data' => $data]);
});


route::get('/film/{id}', function (Request $request){

	return Http::get('http://127.0.0.1:8001/api/films/'.$request->id)->json();
});

route::get('/film/add', function (){
	return view('add');
});
route::post('/film/add', function (Request $request){
	return Http::post('http://127.0.0.1:8001/api/films',[$request]);
})->name('add');

route::delete('/film', function(Request $request){
	return Http::delete('http://127.0.0.1:8001/api/films/'.$request->id);
});
