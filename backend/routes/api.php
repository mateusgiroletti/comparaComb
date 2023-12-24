<?php

Route::post('login', 'Auth\AuthenticateController@authenticate');
Route::get('me', 'Auth\AuthenticateController@getAuthenticatedUser');

Route::get('postos-combustiveis/{id}/users', 'Api\PostoCombustivelController@user');
Route::get('postos-combustiveis/{id}/combustiveis', 'Api\PostoCombustivelController@combustiveis');
Route::get('postos-combustiveis/{id}/enderecos', 'Api\PostoCombustivelController@endereco');
Route::put('postos-combustiveis/{id}', 'Api\PostoCombustivelController@update');

Route::apiResource('postos-combustiveis', 'Api\PostoCombustivelController');

Route::get('enderecos/{id}/postos-combustiveis', 'Api\EnderecoController@postoCombustivel');
Route::apiResource('enderecos', 'Api\EnderecoController');

Route::get('promocoes/{id}/combustiveis', 'Api\PromocaoController@combustivel');
Route::apiResource('promocoes', 'Api\PromocaoController');

Route::get('combustiveis/{id}/promocoes', 'Api\CombustivelController@promocao');
Route::get('combustiveis/{id}/postos-combustiveis', 'Api\CombustivelController@postoCombustivel');
Route::apiResource('combustiveis', 'Api\CombustivelController');

Route::get('users/{id}/localizacao_users', 'Api\UserController@localizacaoUser');
Route::get('users/{id}/automoveis', 'Api\UserController@automovel');
Route::post('users', 'UserController@store');

Route::apiResource('users', 'Api\UserController');

Route::get('automoveis/{id}/users', 'Api\AutomovelController@user');
Route::put('automoveis/{id}', 'Api\AutomovelController@update');
Route::apiResource('automoveis', 'Api\AutomovelController');


Route::get('localizacao_users/{id}/users', 'Api\LocalizacaoUserController@user');
Route::apiResource('localizacao_users', 'Api\LocalizacaoUserController');