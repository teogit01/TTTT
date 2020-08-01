<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TSLichTS extends Model
{
    protected $table = 'TS_LICH_TS';

    protected $primaryKey = 'LITS_ID';

    protected $keyType = 'integer';

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

    public $timestamps = false;
}
