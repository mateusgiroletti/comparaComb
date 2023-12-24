<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Endereco;
use App\Combustivel;
use App\User;

class PostoCombustivel extends Model
{
    protected $table = 'postos_combustiveis';

    protected $fillable = [
        'nome', 'bandeira',
        'combustivel_gasolina_comum',
        'combustivel_gasolina_aditivada',
        'combustivel_diesil_comum',
        'combustivel_diesil_s10',
        'combustivel_etanol',
        'combustivel_gas_gnv',
        'localizacao_latitude',
        'localizacao_longitude',
        'aprovado',
        'user_id'
    ];

    public function rules()
    {
        return [
            'nome' => 'required',
            'bandeira' => 'required',
            'user_id' => 'required'
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function combustivel()
    {
        return $this->hasMany(Combustivel::class, 'postos_combustiveis_id', 'id');
    }

    public function endereco()
    {
        return $this->hasOne(Endereco::class, 'postos_combustiveis_id', 'id');
    }
}
