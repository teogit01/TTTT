<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DMLop;
use App\Http\Resources\DMLop as DMLopResource;

class DMLopController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $dmLop =DMLopResource::collection(DMLop::all());
        
        return response()->json($dmLop, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $dmLop = DMLop::create($request->all());

        return response()->json(new DMLopResource($dmLop), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $dmLop = DMLop::find($id);
        
        return response()->json(new DMLopResource($dmLop), 200);
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
        $dmLop = DMLop::findOrFail($id);
        $dmLop->update($request->all());

        return response()->json($dmLop, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dmLop = DMLop::findOrFail($id);
        $dmLop->delete();

        return response()->json($dmLop, 204);
    }
}
