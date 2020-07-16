<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Http\Request;

class DMKyThi extends BaseModel
{
    protected $table = 'APTECH_DMKYTHI';

    protected $primaryKey = 'KT_ID';

    protected $keyType = 'string';

    protected $fillable = [
        'KT_ID',
        'MH_ID',
        'KT_NGAY',
        'KT_PHONG',
        'KT_BATDAU',
        'KT_KETTHUC',
        'KT_GHICHU',
        'KT_LANTHI',
        'KT_LOAITHI',
        'LOP_ID',
    ];

    public function __construct()
    {
        $this->fillable_list = $this->fillable;         // trường fillable sẽ truyền vào biến fillable_list
    }
}
