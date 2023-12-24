<?php

use Illuminate\Database\Seeder;
use App\PostoCombustivel;

class PostoCombustivelTable extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PostoCombustivel::create([
            'nome' => 'Scariot',
            'bandeira' => 'BR',
            'combustivel_gasolina_comum' => '4.658',
            'combustivel_gasolina_aditivada' => '4.896',
            'combustivel_diesil_comum' => '3.331',
            'combustivel_diesil_s10' => '3.234',
            'combustivel_etanol' => '2.655',
            'combustivel_gas_gnv' => '3.998',
            'localizacao_latitude' => '-27.0110071',
            'localizacao_longitude' => '-51.1549287',
            'aprovado' => '0',
            'user_id' => '1',
        ]);

        PostoCombustivel::create([
            'nome' => 'Dom Domenico',
            'bandeira' => 'Ipiranga',
            'combustivel_gasolina_comum' => '4.575',
            'combustivel_gasolina_aditivada' => '4.897',
            'combustivel_diesil_comum' => '3.568',
            'combustivel_diesil_s10' => '3.569',
            'combustivel_etanol' => '2.896',
            'combustivel_gas_gnv' => '3.456',
            'localizacao_latitude' => '-26.9991887',
            'localizacao_longitude' => '-51.1636507',
            'aprovado' => '0',
            'user_id' => '1',

        ]);

        PostoCombustivel::create([
            'nome' => 'Imperial',
            'bandeira' => 'Maxsul',
            'combustivel_gasolina_comum' => '4.213',
            'combustivel_gasolina_aditivada' => '4.315',
            'combustivel_diesil_comum' => '3.253',
            'combustivel_diesil_s10' => '3.356',
            'combustivel_etanol' => '2.789',
            'combustivel_gas_gnv' => null,
            'localizacao_latitude' => '-27.0032823',
            'localizacao_longitude' => '-51.1489024',
            'aprovado' => '0',
            'user_id' => '1',

        ]);

        PostoCombustivel::create([
            'nome' => 'Autoposto Canada',
            'bandeira' => 'Rede Petroeste',
            'combustivel_gasolina_comum' => '4.536',
            'combustivel_gasolina_aditivada' => '4.689',
            'combustivel_diesil_comum' => '3.547',
            'combustivel_diesil_s10' => '3.896',
            'combustivel_etanol' => '3.231',
            'combustivel_gas_gnv' => null,
            'localizacao_latitude' => '-27.0074656',
            'localizacao_longitude' => '-51.1505866',
            'aprovado' => '0',
            'user_id' => '1',

        ]);
    }
}
