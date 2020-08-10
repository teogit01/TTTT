<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TCDThi extends Model
{
     protected $table = 'APTECH_TCDTHI';

    protected $primaryKey = ['SV_MSSV', 'KT_ID'];

    protected $keyType = ['string', 'integer'];

    protected $fillable = [
        'SV_MSSV',
        'KT_ID',
        'THI_DIEM',
        'THI_KQ',
        'THI_GHICHU',
        'LOP_ID',
        'TCDTHI_NGAYTAO',
        'TCDTHI_NGAYCAPNHAT',
        'TCDTHI_UserName',
        'TCDTHI_IsSendEmail',
        'TRANGTHAI_EMAIL_NGUOITHAN',
        'DAGUI_ZALO_HOCVIEN',
        'DAGUI_ZALO_NGUOITHAN',
        'TCDTHI_IsSendMailLichThi',
    ];

    public $timestamps = false;
}
