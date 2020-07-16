<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Http\Request;

class TCDThi extends BaseModel
{
     protected $table = 'APTECH_TCDTHI';

    protected $primaryKey = 'SV_MSSV';

    protected $keyType = 'string';

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

    public function __construct()
    {
        $this->fillable_list = $this->fillable;         // trường fillable sẽ truyền vào biến fillable_list
    }
}
