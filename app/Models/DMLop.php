<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DMLop extends Model
{
    protected $table = 'APTECH_DMLOP';

    protected $primaryKey = 'LOP_ID';

    protected $keyType = 'string';

    protected $fillable = [
        'LOP_ID',
        'LOP_TEN',
        'KHOA_ID',
        'LOP_SISO',
        'LOP_GHICHU',
        'LH_NGAYTAO',
        'LH_NGAYCAPNHAT',
        'LH_UserName',
        'LH_TRANGTHAI',
    ];

    public $timestamps = false;
}
