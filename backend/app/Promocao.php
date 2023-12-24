<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Combustivel;

class Promocao extends Model
{
    protected $table = 'promocoes';

    protected $fillable = [
        'nome', 'descricao', 'preco', 'aprovado'
    ];

    public function rules()
    {
        return [
            'nome' => 'required',
            'descricao' => 'required',
            'preco' => 'required',
            'aprovado' => 'required',
        ];
    }

    public function combustivel()
    {
        return $this->hasMany(Combustivel::class, 'promocoes_id', 'id');
    }
}
