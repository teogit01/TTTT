<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\DiemDanh;
use App\Models\DMMonHoc;
use App\Models\DMGiaoVien;


class DMLopHocPhan extends Model
{
    protected $table = 'APTECH_DMLOPHOCPHAN';

    protected $primaryKey = 'LHP_ID';

    protected $keyType = 'integer';

    protected $fillable = [
        'LHP_ID',
        'GV_MSGV',
        'MH_ID',
        'LHP_MA',
        'LHP_TEN',
        'LHP_TONGBUOI',
    ];

    public $timestamps = false;

    public function diemDanh()
    {
        return $this->HasMany(DiemDanh::class, 'LHP_ID');
    }

    public function dmMonHoc()
    {
        return $this->belongsTo(DMMonHoc::class, 'MH_ID', 'MH_ID');
    }

    public function dmGiaoVien()
    {
        return $this->belongsTo(DMGiaoVien::class, 'GV_MSGV', 'GV_MSGV');
    }
}
