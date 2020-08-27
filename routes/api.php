<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Response;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// DOANH MỤC MÔN HỌC
Route::get('monhoc', 'Api\DMMonHocController@index');
Route::get('monhoc/{id}', 'Api\DMMonHocController@show');
//Route::get('monhoc/{id}', 'Api\DMMonHocController@show');
Route::post('monhoc', 'Api\DMMonHocController@store');
Route::put('monhoc/{id}', 'Api\DMMonHocController@update');
Route::delete('monhoc/{id}', 'Api\DMMonHocController@destroy');

// DOANH MỤC GIÁO VIÊN
Route::get('giaovien', 'Api\DMGiaoVienController@index');
Route::get('giaovien/{id}', 'Api\DMGiaoVienController@show');
Route::post('giaovien', 'Api\DMGiaoVienController@store');
Route::put('giaovien/{id}', 'Api\DMGiaoVienController@update');
Route::delete('giaovien/{id}', 'Api\DMGiaoVienController@destroy');

// DOANH MỤC SINH VIÊN
Route::get('sinhvien', 'Api\DMSinhVienController@index');
Route::get('sinhvien/{id}', 'Api\DMSinhVienController@show');
Route::post('sinhvien', 'Api\DMGiaoSinhController@store');
Route::put('sinhvien/{id}', 'Api\DMSinhVienController@update');
Route::delete('sinhvien/{id}', 'Api\DMSinhVienController@destroy');

// DOANH MỤC LỚP HỌC PHẦN
Route::get('lhphan', 'Api\DMLopHocPhanController@index');
Route::get('lhphan/{GV_MSGV}', 'Api\DMLopHocPhanController@show');
Route::get('lhphan/{GV_MSGV}/{LHP_ID}', 'Api\DMLopHocPhanController@showHocPhan');
Route::post('lhphan', 'Api\DMLopHocPhanController@store');
Route::put('lhphan/{id}', 'Api\DMLopHocPhanController@update');
Route::delete('lhphan/{id}', 'Api\DMLopHocPhanController@destroy');

// ĐIỂM DANH
Route::get('diemdanh', 'Api\DiemDanhController@index');
Route::get('diemdanh/{id}', 'Api\DiemDanhController@show');
Route::post('diemdanh', 'Api\DiemDanhController@store');
Route::put('diemdanh/{LHP_ID}', 'Api\DiemDanhController@update');
Route::delete('diemdanh/{mssv}/{lhp_id}', 'Api\DiemDanhController@destroy');
