<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Promocao;

class Combustivel extends Model
{
    protected $table = 'combustiveis';

    protected $fillable = [
        'nome', 'preco', 'aprovado', 'postos_combustiveis_id', 'promocoes_id'
    ];

    public function rules(){
        return[
            'nome'=>'required',
            'preco'=>'required',
            'aprovado'=>'required',
            'postos_combustiveis_id'=>'required',
        ];
    }

    public function postoCombustivel()
    {
        return $this->belongsTo(PostoCombustivel::class, 'postos_combustiveis_id', 'id');
    }

    public function promocao()
    {
        return $this->belongsTo(Promocao::class, 'promocoes_id', 'id');
    }
}
