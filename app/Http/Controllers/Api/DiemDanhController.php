<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\DiemDanh as DiemDanhResource;
use App\Models\DiemDanh;
use App\Models\DMSinhVien;
use App\Models\DMLop;
use App\Models\CTDD;
use Illuminate\Support\Str;

class DiemDanhController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //$diemDanh = DiemDanhResource::collection(DiemDanh::all());
        //$diemDanh = DiemDanh::all()->with('dm_lop');
        $diemDanh = DiemDanh::with(['dm_lop','dm_gv','dm_mon'])->get();
        return response()->json($diemDanh, 200);
    }
    public function dd_of_gv($GV_MSGV)
    {
        //$diemDanh = DiemDanhResource::collection(DiemDanh::all());
        //$diemDanh = DiemDanh::all()->with('dm_lop');
        $diemDanh = DiemDanh::where('GV_MSGV',$GV_MSGV)->with(['dm_lop','dm_gv','dm_mon'])->get();
        return $diemDanh;
        return response()->json($diemDanh, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //$data = [];
        // for($i=0; $i<$request->SO_BUOI; $i++){
        //     $data[] = (object)[
        //         'day' => 0, 
        //         'buoi'=> 0,
        //         'value'=> false
        //     ];
        // }
        // //return is_array($data);
        // foreach($data as $d){
        //     echo $d->buoi.'--';
        // }
        $diemDanh = DiemDanh::create($request->all());
        $dssv = DMSinhVien::where('LOP_ID',$request->LOP_ID)->get();

        //if ( isset($request->SO_BUOI) && ($request->SO_BUOI > 0) ){
            
            foreach($dssv as $value){
              //  echo $value->SV_MSSV;
                $ctdd = new CTDD();
                $ctdd->CTDD_ID = 'CT'.rand(10,100000);
                $ctdd->DD_ID = $request->DD_ID;
                $ctdd->SV_MSSV = $value->SV_MSSV;
                
                $data = [];
                for($i=0; $i<$request->SO_BUOI; $i++){
                    $data[] = (object)[
                        'day' => '  ',
                        'buoi'=> $i+1,
                        'value'=> false
                    ];
                }
                $ctdd->DIEM_DANH = json_encode($data);
                $ctdd->KQ = false;  
                $ctdd->save();
            }
        //}
        
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
        // $diemDanh = DiemDanh::where('DD_ID',$id)->with(''dmSinhVien'')->get();    
        $diemDanh = DiemDanh::where('DD_ID',$id)->with(['dm_ctdd','dm_lop','dm_mon'])->get();    
        //$diemDanh = DiemDanh::where('DD_ID',$id)->get();
        return $diemDanh;
        
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
    public function update($DD_ID)
    {
        $diemDanh = DiemDanh::where('DD_ID',$DD_ID);
        $TRANG_THAI = $diemDanh->get()[0]->TRANG_THAI;
        if ($TRANG_THAI == 1){
            $TRANG_THAI = 0;
        } else {
            $TRANG_THAI = 1;
        }
        $diemDanh->update(['TRANG_THAI'=>$TRANG_THAI]);
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
        $diemDanh = DiemDanh::where('DD_ID',$id);
        $diemDanh->delete();

        return response()->json($diemDanh, 204);
    }
    
}
