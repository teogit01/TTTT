<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\DMGiaoVien as DMGiaoVienResource;
use App\Models\DMGiaoVien;

class DMGiaoVienController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        //$dmGiaoVien = DMGiaoVienResource::collection(DMGiaoVien::all());

        $dmGiaoVien = DMGiaoVien::all();
        return response()->json($dmGiaoVien, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $dmGiaoVien = DMGiaoVien::create($request->all());

        return response()->json(new DMGiaoVienResource($dmGiaoVien), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $dmGiaoVien = DMGiaoVien::find($id);
        
        return response()->json(new DMGiaoVienResource($dmGiaoVien), 200);
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
        $dmGiaoVien = DMGiaoVien::findOrFail($id);
        $dmGiaoVien->update($request->all());

        return response()->json($dmGiaoVien, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dmGiaoVien = DMGiaoVien::findOrFail($id);
        $dmGiaoVien->delete();

        return response()->json($dmGiaoVien, 204);
    }
}
