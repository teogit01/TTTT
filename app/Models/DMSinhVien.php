<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\DiemDanh;
use App\Models\CTDD;

class DMSinhVien extends Model
{
     protected $table = 'APTECH_DMSINHVIEN';

    protected $primaryKey = 'SV_MSSV';

    protected $keyType = 'string';

    protected $fillable = [
        'SV_MSSV',
        'SV_HOTEN',
        'SV_NGAY',
        'SV_THANG',
        'SV_NAM',
        'SV_GIOITINH',
        'SV_PORTALID',
        'SV_DIENTHOAI',
        'SV_DIACHI',
        'SV_EMAIL',
        'SV_GHICHU',
        'SV_NGUOITHAN',
        'SV_EMAILNGUOITHAN',
        'SV_DIENTHOAINGUOITHAN',
        'SV_SOCMND',
        'SV_NOICAP',
        'SV_NGAYCAP',
        'SV_MOIQUANHE',
        'SV_SDTZALONGUOITHAN',
        'SV_ZALO',
    ];

    public $timestamps = false;

    public function diemDanh()
    {
        return $this->hasMany(DiemDanh::class, 'SV_MSSV');
    }
    public function dm_ctdd()
    {
        return $this->hasMany(CTDD::class, 'SV_MSSV','SV_MSSV');
    }
}
