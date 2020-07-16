<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Http\Request;

class DMPhongThi extends BaseModel
{
     protected $table = 'APTECH_DM_PHONGTHI';

    protected $primaryKey = 'PHONGTHI_MA';

    protected $keyType = 'string';

    protected $fillable = [
        'PHONGTHI_MA',
        'PHONGTHI_TEN',
        'PHONGTHI_GHICHU',
    ];

    public function __construct()
    {
        $this->fillable_list = $this->fillable;         // trường fillable sẽ truyền vào biến fillable_list
    }
}
