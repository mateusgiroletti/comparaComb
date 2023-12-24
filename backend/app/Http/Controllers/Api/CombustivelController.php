<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\MasterApiController;
use App\Combustivel;

class CombustivelController extends MasterApiController
{
    protected $model;

    public function __construct(Combustivel $combustivel, Request $request)
    {
        $this->model = $combustivel;
        $this->request = $request;
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

    public function promocao($id)
    {
        if (!$promocao = $this->model->with('promocao')->find($id)) {
            return response()->json(['error' => 'Nada foi encontrado!'], 404);
        } else {
            $data = ['data' => $promocao];
            return response()->json($data);
        }
    }
}
