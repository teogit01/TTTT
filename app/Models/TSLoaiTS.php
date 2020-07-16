<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Http\Request;

class TSLoaiTS extends BaseModel
{
     protected $table = 'TS_LOAI_TS';

    protected $primaryKey = 'LTS_ID';

    protected $keyType = 'string';

    protected $fillable = [
        'LTS_ID',
        'LTS_TEN',
        'PortalID',
    ];

    public function __construct()
    {
        $this->fillable_list = $this->fillable;         // trường fillable sẽ truyền vào biến fillable_list
    }
}
