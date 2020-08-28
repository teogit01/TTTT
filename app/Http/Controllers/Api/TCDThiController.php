<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\TCDThi as TCDThiResource;
use App\Models\TCDThi;

class TCDThiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tcdThi = TCDThiResource::collection(TCDThi::all());
        
        return response()->json($tcdThi, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $tcdThi = TCDThi::create($request->all());

        return response()->json(new TCDThiResource($tcdThi), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $tcdThi = TCDThi::find($id);
        
        return response()->json(new TCDThiResource($tcdThi), 200);
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
        $tcdThi = TCDThi::findOrFail($id);
        $tcdThi->update($request->all());

        return response()->json($tcdThi, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tcdThi = TCDThi::findOrFail($id);
        $tcdThi->delete();

        return response()->json($tcdThi, 204);
    }
}
