<?php

namespace App\Models;

use App\Models\Base\BaseModel;
use Illuminate\Http\Request;

class TSLichTS extends BaseModel
{
    protected $table = 'TS_LICH_TS';

    protected $primaryKey = 'LITS_ID';

    protected $keyType = 'string';

    protected $fillable = [
        'LITS_ID',
        'LITS_TEN',
        'LITS_THIDAUVAO',
        'LITS_NGAYTHI',
        'LITS_NGAYKG',
        'LITS_BDDK',
        'LITS_KTDK',
        'LITS_TGHOC',
        'LITS_TTKHAC',
        'LTS_ID',
        'PortalID',
        'TT_NGAYGHIDANH',
    ];

    public function __construct()
    {
        $this->fillable_list = $this->fillable;         // trường fillable sẽ truyền vào biến fillable_list
    }
}
