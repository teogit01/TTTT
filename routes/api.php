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

Route::get('sv_of_lop/{LOP_ID}', 'Api\DMSinhVienController@sv_of_lop');
Route::get('sv_khac_lop/{LOP_ID}', 'Api\DMSinhVienController@sv_khac_lop');
Route::get('sv_of_ctdd/{DD_ID}', 'Api\DMSinhVienController@sv_of_ctdd');
Route::get('sv_khac_ctdd/{DD_ID}', 'Api\DMSinhVienController@sv_khac_ctdd');

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
Route::get('diemdanh_gv/{GV_MSGV}', 'Api\DiemDanhController@dd_of_gv');
Route::post('diemdanh', 'Api\DiemDanhController@store');
Route::put('diemdanh/{DD_ID}', 'Api\DiemDanhController@update');
Route::delete('diemdanh/{id}', 'Api\DiemDanhController@destroy');

// DOANH MỤC LỚP
Route::get('lop', 'Api\DMLopController@index');
// Route::get('lop/{GV_MSGV}', 'Api\DMLopController@show');
// Route::get('lop/{GV_MSGV}/{LHP_ID}', 'Api\DMLopController@showHocPhan');
// Route::post('lop', 'Api\DMLopController@store');
// Route::put('lop/{id}', 'Api\DMLopController@update');
// Route::delete('lop/{id}', 'Api\DMLopController@destroy');

// chi tiet ĐIỂM DANH
Route::get('ctdd', 'Api\CTDDController@index');
Route::get('ctdd_of_lop/{DD_ID}', 'Api\CTDDController@ctdd_of_lop');
//Route::get('diemdanh/{id}', 'Api\DiemDanhController@show');

// Lay ctdd theo mssv
Route::get('ctdd/sv/{DD_ID}/{SV_MSSV}', 'Api\CTDDController@ctdd_of_sv');
Route::post('ctdd/','Api\CTDDController@store');
Route::put('ctdd/{DD_ID}', 'Api\CTDDController@update');
Route::delete('ctdd/del/{DD_ID}/{SV_MSSV}', 'Api\CTDDController@delete_ctdd');
// delete ctdd cua lop
Route::delete('ctdd/lop/{id}', 'Api\CTDDController@delete_dd_lop');
