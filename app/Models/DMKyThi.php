<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class DMKyThi extends Model
{
    protected $table = 'APTECH_DMKYTHI';

    protected $primaryKey = 'KT_ID';

    protected $keyType = 'integer';

    protected $fillable = [
        'KT_ID',
        'MH_ID',
        'KT_NGAY',
        'KT_PHONG',
        'KT_BATDAU',
        'KT_KETTHUC',
        'KT_GHICHU',
        'KT_LANTHI',
        'KT_LOAITHI',
        'LOP_ID',
    ];

    public $timestamps = false;
}
