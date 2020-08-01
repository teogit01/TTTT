<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DMLoaiThi extends Model
{
    protected $table = 'APTECH_DM_LOAITHI';

    protected $primaryKey = 'LOAITHI_ID';

    protected $keyType = 'integer';

    protected $fillable = [
        'LOAITHI_ID',
        'LOAITHI_TEN',   
    ];

    public $timestamps = false;
}
