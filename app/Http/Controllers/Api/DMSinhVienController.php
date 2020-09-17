<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\DMSinhVien as DMSinhVienResource;
use App\Models\DMSinhVien;
use App\Models\CTDD;

class DMSinhVienController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $dmSinhVien = DMSinhVienResource::collection(DMSinhVien::all());
        
        return response()->json($dmSinhVien, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $dmSinhVien = DMSinhVien::create($request->all());

        return response()->json(new DMSinhVienResource($dmSinhVien), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {


        $dmSinhVien = DMSinhVien::find($id);
        
        return response()->json(new DMSinhVienResource($dmSinhVien), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $dmSinhVien = DMSinhVien::findOrFail($id);
        $dmSinhVien->update($request->all());

        return response()->json($dmSinhVien, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dmSinhVien = DMSinhVien::findOrFail($id);
        $dmSinhVien->delete();

        return response()->json($dmSinhVien, 204);
    }
    public function sv_of_lop($LOP_ID)
    {
        $dssv = DMSinhVien::where('LOP_ID',$LOP_ID)->get();
        return $dssv;

        //return response()->json($dmSinhVien, 204);
    }
    //get tat ca sv k thuoc lop
    public function sv_khac_lop($LOP_ID)
    {
        $dssv = DMSinhVien::where('LOP_ID','!=',$LOP_ID)->get();
        return $dssv;

        //return response()->json($dmSinhVien, 204);
    }   

    //get tat ca ctdd
    public function sv_of_ctdd($DD_ID)
    {

        $ctdd = CTDD::where('DD_ID',$DD_ID)->with('dm_sv')->get();

        //return $ctdd;
        $dssv =[];
        foreach ($ctdd as $item){
            $dssv[] = DMSinhVien::where('SV_MSSV',$item->SV_MSSV)->with('dm_ctdd')->first();   
            //$dssv[] = DMSinhVien::where('SV_MSSV',$item->SV_MSSV)->first();   
            //$dssv[] = $item->dm_sv;

        }
        return $dssv;
        //$dssv = DMSinhVien::where('DD_ID',$DD_ID)->get();
        $result_dssv=[];
        foreach ($dssv as $k => $item){
            //echo $item->dm_ctdd[0]->DD_ID.'--';
            echo $item->dm_ctdd.'--';
            //return $item->dm_ctdd[0]->DD_ID;
            // if($item->dm_ctdd[]->DD_DD == $DD_ID){
            //     $result_dssv[] = $item;
            // }
        }
        return $result_dssv;

        //return response()->json($dmSinhVien, 204);
    }
    public function sv_khac_ctdd($DD_ID)
    {
        $dssv = DMSinhVien::all();

        $ctdd = CTDD::where('DD_ID',$DD_ID)->get();

        foreach ($ctdd as $item){
            $dssv_ctdd[] = DMSinhVien::where('SV_MSSV',$item->SV_MSSV)->first();   
       }
       //return $dssv_ctdd;
        $diff = $dssv->diff($dssv_ctdd);
        
        return $diff;

        //return response()->json($dmSinhVien, 204);
    }
}
