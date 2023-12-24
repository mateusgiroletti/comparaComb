<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'nome' => 'teste',
            'sobrenome' => 'teste',
            'email' => 'teste@teste.com',
            'password' => bcrypt('12345678'),
            'reputacao' => '0',
            'admin' => '1'
        ]);
    }
}
