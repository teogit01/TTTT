<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\DMLopHocPhan;

class DMGiaoVien extends Model
{
    protected $table = 'APTECH_DMGIAOVIEN';

    protected $primaryKey = 'GV_MSGV';

    protected $keyType = 'string';

    protected $fillable = [
        'GV_MSGV',
        'GV_UserName',
        'GV_PassWord',
        'GV_HOTEN',
        'GV_DIENTHOAI',
        'GV_EMAIL',
    ];

    public $timestamps = false;

    public function dmLopHocPhan()
    {
        return $this->hasMany(DMLopHocPhan::class, 'GV_MSGV');
    }
}
