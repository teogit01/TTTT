<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Http\Request;

class DMLop extends BaseModel
{
    protected $table = 'APTECH_DMLOP';

    protected $primaryKey = 'LOP_ID';

    protected $keyType = 'string';

    protected $fillable = [
        'LOP_ID',
        'LOP_TEN',
        'KHOA_ID',
        'LOP_SISO',
        'LOP_GHICHU',
        'LH_NGAYTAO',
        'LH_NGAYCAPNHAT',
        'LH_UserName',
        'LH_TRANGTHAI',
    ];

    public function __construct()
    {
        $this->fillable_list = $this->fillable;         // trường fillable sẽ truyền vào biến fillable_list
    }
}
