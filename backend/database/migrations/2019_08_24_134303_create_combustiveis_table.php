<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCombustiveisTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('combustiveis', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nome');
            $table->float('preco', 10,2);
            $table->tinyInteger('aprovado')->nullable();
            $table->integer('postos_combustiveis_id')->unsigned();
            $table->foreign('postos_combustiveis_id')->references('id')->on('postos_combustiveis')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('promocoes_id')->unsigned()->nullable();
            $table->foreign('promocoes_id')->references('id')->on('promocoes')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('combustiveis');
    }
}
