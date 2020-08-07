<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\DMMonHoc as DMMonHocResource;
use App\Models\DMMonHoc;

class DMMonHocController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $dmMonHoc = DMMonHocResource::collection(DMMonHoc::all());
        
        return response()->json($dmMonHoc, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $dmMonHoc = DMMonHoc::create($request->all());

        return response()->json(new DMMonHocResource($dmMonHoc), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $dmMonHoc = DMMonHoc::find($id);
        
        return response()->json(new DMMonHocResource($dmMonHoc), 200);
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
        $dmMonHoc = DMMonHoc::findOrFail($id);
        $dmMonHoc->update($request->all());

        return response()->json($dmMonHoc, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dmMonHoc = DMMonHoc::findOrFail($id);
        $dmMonHoc->delete();

        return response()->json($dmMonHoc, 204);
    }
}
