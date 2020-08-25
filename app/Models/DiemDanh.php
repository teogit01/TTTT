<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\DMLopHocPhan;
use App\Models\DMSinhVien;

class DiemDanh extends Model
{
    protected $table = 'APTECH_DIEMDANH';

    protected $primaryKey = ['SV_MSSV', 'LHP_ID'];

    protected $keyType = ['string', 'interger'];

    protected $fillable = [
        'SV_MSSV',
        'LHP_ID',
        'DIEM_DANH',
        'SO_BUOI',
        'KQDD',
    ];

    public $incrementing = false;
    
    public $timestamps = false;

    public function dmLopHocPhan()
    {
        return $this->belongsTo(DMLopHocPhan::class, 'LHP_ID', 'LHP_ID');
    }

    public function dmSinhVien()
    {
        return $this->belongsTo(DMSinhVien::class, 'SV_MSSV', 'SV_MSSV');
    }
}
