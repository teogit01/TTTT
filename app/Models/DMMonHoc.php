<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DMMonHoc extends Model
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

    public $timestamps = false;
}
