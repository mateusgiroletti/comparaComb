<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class LocalizacaoUser extends Model
{
    protected $table = 'localizacao_users';

    protected $fillable = [
        'nome', 'descricao', 'latitude', 'longitude', 'user_id'
    ];

    public function rules()
    {
        return [
            'nome' => 'required',
            'descricao' => 'required',
            'latitude' => 'required',
            'longitude' => 'required',
            'user_id' => 'required'
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
