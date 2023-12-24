<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\MasterApiController;
use App\LocalizacaoUser;

class LocalizacaoUserController extends MasterApiController
{
    protected $model;

    public function __construct(LocalizacaoUser $localizacao_user, Request $request)
    {
        $this->model = $localizacao_user;
        $this->request = $request;
    }

    public function user($id)
    {
        if (!$user = $this->model->with('user')->find($id)) {
            return response()->json(['error' => 'Nada foi encontrado!'], 404);
        } else {
            $data = ['data' => $user];
            return response()->json($data);
        }
    }
}
