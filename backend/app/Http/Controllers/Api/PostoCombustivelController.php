<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\MasterApiController;
use App\PostoCombustivel;

class PostoCombustivelController extends MasterApiController
{
    protected $model;
    public function __construct(PostoCombustivel $postoCombustivels, Request $request)
    {
        $this->model = $postoCombustivels;
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

    public function combustiveis($id)
    {
        if (!$Combustivel = $this->model->with('combustivel')->find($id)) {
            return response()->json(['error' => 'Nada foi encontrado!'], 404);
        } else {
            $data = ['data' => $Combustivel];
            return response()->json($data);
        }
    }

    public function update(Request $request, $id)
    {
        if (!$data = $this->model->find($id))
            return response()->json(['error' => 'Nada foi encontrado'], 404);

        $dataForm = $request->all();

        $data->update($dataForm);

        return response()->json($data);
    }
}
