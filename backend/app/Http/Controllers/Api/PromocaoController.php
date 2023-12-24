<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\MasterApiController;
use App\Promocao;

class PromocaoController extends MasterApiController
{
    protected $model;

    public function __construct(Promocao $promocao, Request $request)
    {
        $this->model = $promocao;
        $this->request = $request;
    }

    public function combustivel($id)
    {
        if (!$combustivel = $this->model->with('combustivel')->find($id)) {
            return response()->json(['error' => 'Nada foi encontrado!'], 404);
        } else {
            $data = ['data' => $combustivel];
            return response()->json($data);
        }
    }
   
}
