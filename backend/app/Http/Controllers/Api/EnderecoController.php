<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\MasterApiController;
use App\API\ApiError;
use App\Endereco;

class EnderecoController extends MasterApiController
{
    protected $model;

    public function __construct(Endereco $endereco, Request $request)
    {
        $this->model = $endereco;
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

    /*public function index()
    {
        $data = ['data' => $this->endereco->all()];
        return response()->json($data);
    }

    public function store(Request $request)
    {
        $this->validate($request, $this->endereco->rules());

        $dataForm = $request->all();

        $data = $this->endereco->create($dataForm);

        return response()->json($data, 201);
    }

    public function show(Endereco $id)
    {

        $endereco = $this->endereco->find($id);

        if (!$endereco) return response()->json(['data' => ['msg' => 'Endereço não encontrado']], 404);
        $data = ['data' => $endereco];
        return response()->json($data);
    }

    
    public function update(Request $request, $id)
    {
        try {
            $enderecoData = $request->all();
            $endereco = $this->endereco->find($id);
            $endereco->update($enderecoData);

            $return = ['data' => ['msg' => 'Endereço atualizado com sucesso!']];
            return response()->json($return, 201);
        } catch (\Exception $e) {
            if (config(('app.debug'))) {
                return response()->json(ApiError::errorMessage($e->getMessage(), 1011));
            }
            return response()->json(ApiError::errorMessage('Houve um erro ao utilizar a operação atualizar', 1011));
        }
    }

    public function delete(Endereco $id)
    {
        try {
            $id->delete();
            return response()->json(['data' => ['msg' => 'Endereco removido com sucesso!']], 200);
        } catch (\Throwable $e) {
            if (config(('app.debug'))) {
                return response()->json(ApiError::errorMessage($e->getMessage(), 1012));
            }
            return response()->json(ApiError::errorMessage('Houve um erro ao utilizar a operação de deletar', 1012));
        }
    }

    public function postoCombustivel($id)
    {

        $endereco = $this->endereco->with('postos_combustiveis')->find($id);

        if (!$endereco) return response()->json(['data' => ['msg' => 'Endereço não encontrado']], 404);
        $data = ['data' => $endereco];
        return response()->json($data);
    }
*/
}
