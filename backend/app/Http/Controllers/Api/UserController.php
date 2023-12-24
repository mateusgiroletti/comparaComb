<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\MasterApiController;
use App\User;

class UserController extends MasterApiController
{
    protected $model;

    public function __construct(User $user, Request $request)
    {
        $this->model = $user;
        $this->request = $request;
    }

    public function store(Request $request)
    {
        $this->validate($request, $this->model->rules());

        $dataForm = $request->all();
        $dataForm['password'] = bcrypt($dataForm['password']);
        $data = $this->model->create($dataForm);

        return response()->json($data, 201);
    }

    public function automovel($id)
    {
        if (!$automovel = $this->model->with('automovel')->find($id)) {
            return response()->json(['error' => 'Nada foi encontrado!'], 404);
        } else {
            $data = ['data' => $automovel];
            return response()->json($data);
        }
    }

    public function localizacaoUser($id)
    {
        if (!$localizacao_user = $this->model->with('localizacaoUser')->find($id)) {
            return response()->json(['error' => 'Nada foi encontrado!'], 404);
        } else {
            $data = ['data' => $localizacao_user];
            return response()->json($data);
        }
    }

    public function postoCombustivel($id)
    {
        if (!$postoCombustivel = $this->model->with('postoCombustivel')->find($id)) {
            return response()->json(['error' => 'Nada foi encontrado!'], 404);
        } else {
            $data = ['data' => $postoCombustivel];
            return response()->json($data);
        }
    }
}
