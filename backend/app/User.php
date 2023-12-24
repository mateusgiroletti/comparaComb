<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Automovel;
use App\LocalizacaoUser;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\PostoCombustivel;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nome', 'email', 'sobrenome', 'password', 'reputacao', 'admin'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function rules()
    {
        return [
            'nome' => 'required',
            'email' => 'required',
            'sobrenome' => 'required',
            'password' => 'required',

        ];
    }
    public function automovel()
    {
        return $this->hasMany(Automovel::class, 'user_id', 'id');
    }

    public function localizacaoUser()
    {
        return $this->hasMany(LocalizacaoUser::class, 'user_id', 'id');
    }

    public function postoCombustivel()
    {
        return $this->hasOne(PostoCombustivel::class, 'user_id', 'id');
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }
}
