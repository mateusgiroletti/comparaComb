<?php

use Illuminate\Database\Seeder;
use App\Automovel;

class AutomoveisTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Automovel::create([
            'nome' => 'onix',
            'tipo' => 'carro',
            'capacidade_tanque' => '54',
            'consumo_medio' => '12',
            'user_id' => '1'
        ]);
    }
}
