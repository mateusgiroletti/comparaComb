<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\MasterApiController;
use App\Automovel;

class AutomovelController extends MasterApiController
{
    protected $model;

    public function __construct(Automovel $automovel, Request $request)
    {
        $this->model = $automovel;
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


    public function update(Request $request, $id)
    {
        if (!$data = $this->model->find($id))
            return response()->json(['error' => 'Nada foi encontrado'], 404);

        $dataForm = $request->all();

        $data->update($dataForm);

        return response()->json($data);
    }
}
