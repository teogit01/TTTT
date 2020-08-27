<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\DMLopHocPhan as DMLopHocPhanResource;
use App\Models\DMLopHocPhan;

class DMLopHocPhanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $dmLopHocPhan = DMLopHocPhanResource::collection(DMLopHocPhan::all());
        
        return response()->json($dmLopHocPhan, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $dmLopHocPhan = DMLopHocPhan::create($request->all());

        return response()->json(new DMLopHocPhanResource($dmLopHocPhan), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($GV_MSGV)
    {   
        $dmLopHocPhan = DMLopHocPhan::where('GV_MSGV', $GV_MSGV)->get();
        
        return response()->json(new DMLopHocPhanResource($dmLopHocPhan), 200);
    }

    public function showHocPhan($GV_MSGV, $LHP_ID)
    {   

        $dmLopHocPhan = DMLopHocPhan::where([['GV_MSGV', $GV_MSGV],['LHP_ID',$LHP_ID]])->get();
        
        return response()->json(new DMLopHocPhanResource($dmLopHocPhan), 200);
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
        $dmLopHocPhan = DMLopHocPhan::findOrFail($id);
        $dmLopHocPhan->update($request->all());

        return response()->json($dmLopHocPhan, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dmLopHocPhan = DMLopHocPhan::findOrFail($id);
        $dmLopHocPhan->delete();

        return response()->json($dmLopHocPhan, 204);
    }
}
