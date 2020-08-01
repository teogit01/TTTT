<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DiemDanh extends Model
{
    protected $table = 'DIEMDANH';

    protected $primaryKey = ['SV_MSSV', 'LOP_ID'];

    protected $keyType = ['string', 'integer'];

    protected $fillable = [
        'SV_MSSV',
        'LOP_ID',
        'DIEM_DANH',
        'SO_BUOI',
    ];
    
    public $timestamps = false;
}
