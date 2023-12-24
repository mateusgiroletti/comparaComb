<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\PostoCombustivel;

class Endereco extends Model
{
    protected $fillable = [
        'rua', 'bairro', 'cidade', 'postos_combustiveis_id'
    ];

    public function rules(){
        return[
            'rua'=>'required',
            'bairro'=>'required',
            'cidade'=>'required',
            'postos_combustiveis_id'=>'required',
        ];
    }

    public function postoCombustivel()
    {
        return $this->belongsTo(PostoCombustivel::class, 'postos_combustiveis_id', 'id');
    }
}
