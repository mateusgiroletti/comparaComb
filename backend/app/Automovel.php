<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Automovel extends Model
{
    protected $table = 'automoveis';

    protected $fillable = [
        'nome', 'tipo', 'consumo_medio', 'user_id', 'capacidade_tanque'
    ];

    public function rules()
    {
        return [
            'nome' => 'required',
            'tipo' => 'required',
            'consumo_medio' => 'required',
            'user_id' => 'required',
            'capacidade_tanque' => 'required'
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
