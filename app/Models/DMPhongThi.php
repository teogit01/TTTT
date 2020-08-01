<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DMPhongThi extends Model
{
     protected $table = 'APTECH_DM_PHONGTHI';

    protected $primaryKey = 'PHONGTHI_MA';

    protected $keyType = 'string';

    protected $fillable = [
        'PHONGTHI_MA',
        'PHONGTHI_TEN',
        'PHONGTHI_GHICHU',
    ];

    public $timestamps = false;
}
