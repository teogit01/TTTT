<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DMKhoaHoc_MonHoc extends Model
{
    protected $table = 'APTECH_DMKHOAHOC_MONHOC';

    protected $primaryKey = 'KHOA_MH_ID';

    protected $keyType = 'integer';

    protected $fillable = [
        'MD_ID',
        'KHOA_ID',
        'STT',
    ];

    public $timestamps = false;
}
