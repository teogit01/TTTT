<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Http\Request;

class DMLoaiThi extends BaseModel
{
    protected $table = 'APTECH_DM_LOAITHI';

    protected $primaryKey = 'LOAITHI_ID';

    protected $keyType = 'string';

    protected $fillable = [
        'LOAITHI_ID',
        'LOAITHI_TEN',   
    ];

    public function __construct()
    {
        $this->fillable_list = $this->fillable;         // trường fillable sẽ truyền vào biến fillable_list
    }
}
