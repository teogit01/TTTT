<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\DiemDanh;
use App\Models\DMSinhVien;

class CTDD extends Model
{
    protected $table = 'APTECH_CTDD';

    protected $primaryKey = ['CTDD_ID'];

    protected $keyType = ['string'];

    protected $fillable = [
        'CTDD_ID',
        'DD_ID',
        'SV_MSSV',
        'DIEM_DANH',
        'KQ',
    ];

    public $incrementing = false;
    
    public $timestamps = false;
    public function dm_dd()
    {
        return $this->belongsTo(DiemDanh::class, 'DD_ID', 'DD_ID');
    }
    public function dm_sv()
    {
        return $this->belongsTo(DMSinhVien::class, 'SV_MSSV', 'SV_MSSV');
    }
}
