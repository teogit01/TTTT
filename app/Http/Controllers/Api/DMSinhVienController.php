<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\DMSinhVien as DMSinhVienResource;
use App\Models\DMSinhVien;

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
}
