<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\CTDiemDanh as CTDiemDanhResource;
use App\Models\CTDiemDanh;

class CTDiemDanhController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ctDiemDanh = CTDiemDanhResource::collection(CTDiemDanh::all());
        
        return response()->json($ctDiemDanh, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $ctDiemDanh = CTDiemDanh::create($request->all());

        return response()->json(new CTDiemDanhResource($ctDiemDanh), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $ctDiemDanh = CTDiemDanh::find($id);
        
        return response()->json(new CTDiemDanhResource($ctDiemDanh), 200);
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
        $ctDiemDanh = CTDiemDanh::findOrFail($id);
        $ctDiemDanh->update($request->all());

        return response()->json($ctDiemDanh, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ctDiemDanh = CTDiemDanh::findOrFail($id);
        $ctDiemDanh->delete();

        return response()->json($ctDiemDanh, 204);
    }

    public function getList()
    {
        # code...
    }
}
