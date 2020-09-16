<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\DiemDanh as DiemDanhResource;
use App\Models\CTDiemDanh;
use App\Models\DiemDanh;
use App\Models\DMSinhVien;
use App\Models\DMMonHoc;

class DiemDanhController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $diemDanh = DiemDanhResource::collection(DiemDanh::all());
        
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
        $soBuoi = DMMonHoc::where('MH_ID', $request->MH_ID)->first();
        $data = $request->all();
        $data['SO_BUOI'] = $soBuoi->MH_SOBUOI;
        $lopID = $request->LOP_ID;
        $listSV = DMSinhVien::where('LOP_ID', $lopID)->get();

        $diemDanh = DiemDanh::create($data);

        foreach($listSV as $key => $item) {
            
            $ctDiemDanh = new CTDiemDanh();
            // $ctDiemDanh->CTDD_ID = 'CTyyy'.$key;
            $ctDiemDanh->DD_ID = $request->DD_ID;
            $ctDiemDanh->SV_MSSV = $item->SV_MSSV;
            $ctDiemDanh->DIEM_DANH = '';
            $ctDiemDanh->KQDD = '';
            $ctDiemDanh->save();
        }
        return 'ok';
        // return response()->json(new DiemDanhResource($diemDanh), 201);
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
//     public function update(Request $request, $LHP_ID)
//     {
//         // $diemDanh = DiemDanh::where([['LHP_ID',$LHP_ID],['SV_MSSV','B11']]);
//         // return $diemDanh->update($request->all());

//         //$diemDanh = DiemDanh::where([['LHP_ID',$LHP_ID],['SV_MSSV','B22']]);
//             // return $diemDanh->get();
//         // if ( ($diemDanh->get('DIEM_DANH')[0]->DIEM_DANH == '') ){
//         //     //return $diemDanh->get('DIEM_DANH')[0]->DIEM_DANH;
//         //     return 'null';
//         // } else {
//         //     return $diemDanh->get('DIEM_DANH');

//         // }


//         // $data_req = $request->data;
//         // $data_req = $data_req;
//         // // loai bo []
//         // $data_req = substr( $data_req, 1, strlen($data_req)-2);
//         // // string->array
//         // $data_req = explode (', ' ,$data_req);

        
//         // foreach ($data_req as $key => $value) {
//         //     $index = 0;
//         //     for($i=0; $i<strlen($value); $i++){
//         //         //echo $i.'=';
//         //         if ($value[$i] == ":"){
//         //             $index = $i;
//         //         }
//         //     }
//         //     $number_day = substr($value, 1, $index-1);
//         //     $mssv= substr( $value, $index+1,strlen($value)-strlen($number_day)-3);
//         //     echo $number_day.'-';
//         //     echo $mssv.'-';
//         // }
//         // return 'ok';


//         $data_req = $request->data;
//         // loai bo []
//         //$data_req = substr( $data_req, 1, strlen($data_req)-2);
//         //return $data_req;
//         // string->array
//         $data_req = explode (',' ,$data_req);
//         foreach ($data_req as $key => $value)
//         {
//             $index = 0;
//             for($i=0; $i<strlen($value); $i++){
//                 if ($value[$i] == ":"){
//                     $index = $i;
//                 }
//             }

//             $day = substr($value, 0, $index);


//             //$SV_MSSV= substr( $value, $index+1, strlen($value)-strlen($day)-3);
//             $SV_MSSV= substr( $value, $index+1, strlen($value)-strlen($day)-1);
// //            return $SV_MSSV;

//             $diemDanh = DiemDanh::where([['LHP_ID',$LHP_ID],['SV_MSSV',$SV_MSSV]]);
//             // return $diemDanh->get();
//             //return $diemDanh->get('DIEM_DANH');
//             //return 'ok';
//             // neu da co gia tri cu cua diem danh
//             if ( ($diemDanh->get('DIEM_DANH')[0]->DIEM_DANH == '') )
//             {   
//                 //$data_req = implode(', ' ,$data_req);
                
//                 $new_value = $day.':true';
//                 // luu csdl
//                 $diemDanh->update(['DIEM_DANH'=>$new_value]);

//             } else 
//             {
//                 // gia tri diem danh cu cua sinh vien SV_MSSV trong LHP_ID
//                 $old_data = $diemDanh->get('DIEM_DANH')[0]->DIEM_DANH; 
//                 // convert data string -> array
//                 $old_data = explode (', ', $old_data);
                
//                 $data_will_update = $old_data;
//                 // duyet tung phan tu cu xem co cap nhat
//                 // result old_data da cap nhat
//                 $check = 0;
//                 foreach ($old_data as $old_k => $old_v){

//                     $index = 0;
//                     for($i=0; $i<strlen($old_v); $i++){
//                         if ($old_v[$i] == ":"){
//                             $index = $i;
//                         }
//                     }
//                     $old_day = substr($old_v, 0, $index);

//                     if ($old_day === $day){
//                         $check = 1;
//                         // neu diem danh co chinh sua
//                         // true->false, false->true
//                         if( $old_v[$index+1] == 't'){
                            
//                             $data_will_update[$old_k] = $day.':false';
//                             $diemDanh->update(['DIEM_DANH'=>implode(', ' ,$data_will_update)]);

//                         } else {

//                             $data_will_update[$old_k] = $day.':true';
//                             $diemDanh->update(['DIEM_DANH'=>implode(', ' ,$data_will_update)]);
//                         }
//                     } 
//                 }
//                 // neu check thi them moi
//                 if ($check == 0){

//                     $old_data = implode(', ' ,$old_data);
//                     $new_data = $old_data.', '.$day.':true';
//                     // luu csdl
//                     $diemDanh->update(['DIEM_DANH'=>$new_data]);
//                 }  
//             }
//         }
//         return 'ok';
//     }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($mssv, $lhp_id)
    {
        $diemDanh = DiemDanh::where([['SV_MSSV',$mssv],['LHP_ID',$lhp_id]]);
        $diemDanh->delete();

        return response()->json($diemDanh, 204);
    }
    
}
