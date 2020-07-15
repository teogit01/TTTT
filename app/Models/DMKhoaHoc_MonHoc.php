<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Http\Request;

class DMKhoaHoc_MonHoc extends BaseModel
{
    protected $table = 'APTECH_DMKHOAHOC_MONHOC';

    protected $primaryKey = 'KHOA_MH_ID';

    protected $keyType = 'string';

    protected $fillable = [
        'MD_ID',
        'KHOA_ID',
        'STT',
    ];

    public function __construct()
    {
        $this->fillable_list = $this->fillable;         // trường fillable sẽ truyền vào biến fillable_list
    }
}
