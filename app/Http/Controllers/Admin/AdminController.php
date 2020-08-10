<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index(){
    	
    	return view('admin.index');
    }

    public function test(){

    	
    	$data = Http::get('http://127.0.0.1:8000/api/films')->json();
    	
    	return view('add',['data'=>$data]);

    }

    public function del(Request $request){
    	
    	Http::delete('http://127.0.0.1:8000/api/films/'.$request->id);
    	
    	return back();
    }
}
