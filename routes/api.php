<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('reviews', 'ReviewsController@index');
 
// Route::get('reviews/{review}', 'ReviewsController@show');
 
// Route::post('reviews','ReviewsController@store');
 
// Route::put('reviews/{review}','ReviewsController@update');
 
// Route::delete('reviews/{review}', 'ReviewsController@delete');