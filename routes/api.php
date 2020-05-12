<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */
Route::get('/customers', 'CustomerController@index');
Route::post('/customers/create', 'CustomerController@store');
Route::post('/customers/update/{id}', 'CustomerController@update');
Route::get('/customers/delete/{id}', 'CustomerController@destroy');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
