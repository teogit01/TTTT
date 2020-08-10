<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DMGiaoVien extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'GV_MSGV' => $this->GV_MSGV,
            'GV_HOTEN' => $this->GV_HOTEN,
            'GV_DIENTHOAI' => $this->GV_DIENTHOAI,
            'GV_EMAIL' => $this->GV_EMAIL
        ];
    }
}
