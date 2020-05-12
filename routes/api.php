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
Route::get('/customers', 'Api\CustomerController@index');
Route::post('/customers/create', 'Api\CustomerController@store');
Route::post('/customers/update/{id}', 'Api\CustomerController@update');
Route::post('/customers/delete', 'Api\CustomerController@destroy');
Route::post('/customers/search','Api\CustomerController@search');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
