<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\DMKyThi as DMKyThiResource;
use App\Models\DMKyThi;

class DMKyThiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $dmKyThi = DMKyThiResource::collection(DMKyThi::all());
        
        return response()->json($dmKyThi, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $dmKyThi = DMKyThi::create($request->all());

        return response()->json(new DMKyThiResource($dmKyThi), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $dmKyThi = DMKyThi::find($id);
        
        return response()->json(new DMKyThiResource($dmKyThi), 200);
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
        $dmKyThi = DMKyThi::findOrFail($id);
        $dmKyThi->update($request->all());

        return response()->json($dmKyThi, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dmKyThi = DMKyThi::findOrFail($id);
        $dmKyThi->delete();

        return response()->json($dmKyThi, 204);
    }
}
