<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TSLoaiTS extends Model
{
     protected $table = 'TS_LOAI_TS';

    protected $primaryKey = 'LTS_ID';

    protected $keyType = 'integer';

    protected $fillable = [
        'LTS_ID',
        'LTS_TEN',
        'PortalID',
    ];

    public $timestamps = false;
}
