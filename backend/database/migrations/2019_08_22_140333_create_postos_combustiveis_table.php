<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostosCombustiveisTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('postos_combustiveis', function (Blueprint $table) {
      $table->increments('id');
      $table->integer('user_id')->unsigned();
      $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
      $table->string('nome');
      $table->string('bandeira');
      $table->decimal('combustivel_gasolina_comum', 10, 3)->nullable();
      $table->decimal('combustivel_gasolina_aditivada', 10, 3)->nullable();
      $table->decimal('combustivel_diesil_comum', 10, 3)->nullable();
      $table->decimal('combustivel_diesil_s10', 10, 3)->nullable();
      $table->decimal('combustivel_etanol', 10, 3)->nullable();
      $table->decimal('combustivel_gas_gnv', 10, 3)->nullable();
      $table->float('localizacao_latitude', 10, 6)->nullable();
      $table->float('localizacao_longitude', 10, 6)->nullable();
      $table->tinyInteger('aprovado')->nullable();
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
    Schema::dropIfExists('postos_combustiveis');
  }
}
