<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\DiemDanh as DiemDanhResource;
use App\Models\DiemDanh;

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
        $diemDanh = DiemDanh::create($request->all());

        return response()->json(new DiemDanhResource($diemDanh), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $diemDanh = DiemDanh::find($id);
        
        return response()->json(new DiemDanhResource($diemDanh), 200);
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
        $diemDanh = DiemDanh::findOrFail($id);
        $diemDanh->update($request->all());

        return response()->json($diemDanh, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $diemDanh = DiemDanh::findOrFail($id);
        $diemDanh->delete();

        return response()->json($diemDanh, 204);
    }
    
}
