<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\DMLopHocPhan;
use App\Models\DMSinhVien;
use App\Models\DMGiaoVien;
use App\Models\DMLop;
use App\Models\CTDD;
use App\Models\DMMonHoc;

class DiemDanh extends Model
{
    protected $table = 'APTECH_DIEMDANH';

    protected $primaryKey = ['SV_MSSV', 'LHP_ID'];

    protected $keyType = ['string', 'interger'];

    protected $fillable = [
        'DD_ID',
        'LOP_ID',
        'MH_ID',
        'GV_MSGV',
        'SO_BUOI',
        'TRANG_THAI'
    ];

    public $incrementing = false;
    
    public $timestamps = false;


    public function dm_ctdd()
    {
        return $this->HasMany(CTDD::class, 'DD_ID', 'DD_ID');
    }
    public function dm_lop()
    {
        return $this->belongsTo(DMLop::class, 'LOP_ID', 'LOP_ID');
    }
    public function dm_mon()
    {
        return $this->belongsTo(DMMonHoc::class, 'MH_ID', 'MH_ID');
    }
    public function dm_gv()
    {
        return $this->belongsTo(DMGiaoVien::class, 'GV_MSGV', 'GV_MSGV');
    }
}
