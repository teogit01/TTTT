<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DMKhoaHoc extends Model
{
    protected $table = 'APTECH_DMKHOAHOC';

    protected $primaryKey = 'KHOA_ID';

    protected $keyType = 'string';

    protected $fillable = [
        'KHOA_ID',
        'KHOA_TEN',
        'KHOA_DIENGIAI',
        'KHOA_CT',
    ];
    
    public $timestamps = false;
}
