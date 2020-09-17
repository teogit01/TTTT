<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\CTDD as CTDDResource;
use App\Models\DiemDanh;
use App\Models\DMSinhVien;
use App\Models\CTDD;
use Illuminate\Support\Str;
use Illuminate\Support\Collection;

class CTDDController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$ctdd = CTDDResource::collection(CTDD::all());
        $ctdd = CTDD::all();
        
        return response()->json($ctdd, 200);
    }
    // ctdd cua lop
    public function ctdd_of_lop($DD_ID)
    {
        //$ctdd = CTDDResource::collection(CTDD::all());
        $ctdd = CTDD::where('DD_ID',$DD_ID)->get();
        return $ctdd;
        return response()->json($ctdd, 200);
    }
    //ctdd_of_sv
    public function ctdd_of_sv($DD_ID,$SV_MSSV)
    {
        //$ctdd = CTDDResource::collection(CTDD::all());
        $ctdd = CTDD::where([['DD_ID',$DD_ID],['SV_MSSV',$SV_MSSV]])->first();

        $data = $ctdd['DIEM_DANH'];
        $data = json_decode($data);
        return $data;
        

    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //return rand(10,100000);
        //$diemDanh = DiemDanh::create($request->all());      
        $ctdd = new CTDD();
        $ctdd->CTDD_ID = 'CT'.rand(10,100000);
        $ctdd->DD_ID = $request->DD_ID;
        $ctdd->SV_MSSV = $request->SV_MSSV;

        $data = [];
        for($i=0; $i<$request->SO_BUOI; $i++){
            $data[] = (object)[
                'day' => '',
                'buoi'=> $i+1,
                'value'=> false
            ];
        }

        $ctdd->DIEM_DANH = json_encode($data);
        $ctdd->KQ = false;  
        $ctdd->save();
        
        
        
        //return response()->json(new DiemDanhResource($diemDanh), 201);
        return 'ok';
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //$diemDanh = DiemDanh::where([['LHP_ID',$id],['SV_MSSV',$mssv]])->get();
        //all student of class id
        $diemDanh = DiemDanh::where('LHP_ID',$id)->with('dmSinhVien')->get();    
        
        // return $student = DMSinhVien::all();

        // $student = DMSinhVien::where('SV_MSSV','!=',);
        return response()->json(new DiemDanhResource($diemDanh), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($DD_ID, Request $request)
    {
        //return $request->data;
        $data = $request->all();
        foreach ($data as $d){
            $ctdd = CTDD::where([['DD_ID', $DD_ID],['SV_MSSV', $d['mssv']]])->update(['DIEM_DANH'=>$d['diemdanh']]);
        }
        //return $DD_ID;
        return 'ok';
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ctdd = CTDD::where('CTDD_ID',$id);
        $ctdd->delete();

        return response()->json($ctdd, 204);
    }
    public function delete_dd_lop($id)
    {

        $ctdd = CTDD::where('DD_ID',$id);
        $ctdd->delete();

        return response()->json($ctdd, 204);
    }
    //delete_ctdd
    public function delete_ctdd($DD_ID, $SV_MSSV)
    {
        
        $ctdd = CTDD::where([['DD_ID',$DD_ID],['SV_MSSV',$SV_MSSV]]);
        $ctdd->delete();

        return response()->json($ctdd, 204);
    }    

}
