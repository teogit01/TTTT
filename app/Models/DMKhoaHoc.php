<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Http\Request;

class DMKhoaHoc extends BaseModel
{
    protected $table = 'APTECH_DMKHOAHOC';

    protected $primaryKey = 'KHOA_ID';

    protected $keyType = 'string';

    protected $fillable = [
        'KHOA_ID',
        'KHOA_TEN',
        'KHOA_DIENGIAI',
        'KHOA_CT',
    ];

    public function __construct()
    {
        $this->fillable_list = $this->fillable;         // trường fillable sẽ truyền vào biến fillable_list
    }
}
