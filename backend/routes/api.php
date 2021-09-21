<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
//added by you
use App\Http\Controllers\ProductController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PublisherController;
use App\Http\Controllers\AuthorController;
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

//  **************************** Project Information ***************************
// Sanctum creates a token for every protected routes and is basically a middleware, so we protecteted
// our CRUD API with Sanctum we also created a login and register and logout 
// so the token should be created and deleted as necessary

//public routes
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('/products/search/{name}', [ProductController::class, 'search']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

//Book controller
Route::get('/books', [BookController::class, 'index']);


//protected routes by sanctum
Route::group(['middleware' => ['auth:sanctum']], function() {
  Route::post('/products', [ProductController::class, 'store']);
  Route::put('/products/{id}', [ProductController::class, 'update']); 
  Route::delete('/products/{id}', [ProductController::class, 'destroy']);  
  Route::post('logout', [AuthController::class, 'logout']);

  //Book controller routes
  Route::post('/books', [BookController::class, 'store']);

  //GET routes for book dependencies 
  Route::get('/categories', [CategoryController::class, 'index']);
  Route::get('/publishers', [PublisherController::class, 'index']);
  Route::get('/authors', [AuthorController::class, 'index']);
});




// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
