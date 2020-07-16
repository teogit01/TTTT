<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Http\Request;

class DMMonHoc extends BaseModel
{
    protected $table = 'APTECH_DMMONHOC';

    protected $primaryKey = 'MH_ID';

    protected $keyType = 'string';

    protected $fillable = [
        'MH_ID',
        'MH_TEN',
        'MH_DIENGIAI',
        'MH_NGAYTAO',
        'MH_NGAYCAPNHAT',
        'MH_UserName',
        'MH_TRANGTHAI',
        'MH_TTXETTOTNGHIEP', 
    ];

    public function __construct()
    {
        $this->fillable_list = $this->fillable;         // trường fillable sẽ truyền vào biến fillable_list
    }
}
