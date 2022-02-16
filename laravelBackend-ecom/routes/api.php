<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductsController;
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

Route::post('register', [AuthController::class, 'register'])->name('register');
Route::post('login', [AuthController::class, 'login'])->name('login');
Route::get('allcategories', [FrontendController::class, 'categories']);
Route::get('fetchProducts/{slug}', [FrontendController::class, 'fetchProducts']);
Route::get('view-product/{category_slug}/{product_slug}', [FrontendController::class, 'viewProduct']);
Route::post('add-to-cart', [CartController::class, 'addtocart']);
Route::get('cart', [CartController::class, 'viewCart']);
Route::put('cart-updateQuantity/{cart_id}/{scope}', [CartController::class, 'updateCartQuantity']);
Route::delete('delete-cartitem/{cart_id}', [CartController::class, 'deleteCartItem']);
Route::post('place-order', [CheckoutController::class, 'placeorder']);

Route::middleware(['auth:sanctum',])->group(function () {

    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
});

Route::middleware(['auth:sanctum', 'isApiAdmin'])->group(function () {
    Route::get('/checkAuth', function () {
        return response()->json(['message' => 'Access Granted', 'status' => 200], 200);
    });
    Route::get('categories', [CategoryController::class, 'index']);
    Route::post('add-category', [CategoryController::class, 'store']);
    Route::get('edit-category/{id}', [CategoryController::class, 'edit']);
    Route::put('update-category/{id}', [CategoryController::class, 'update']);
    Route::delete('delete-category/{id}', [CategoryController::class, 'destroy']);
    Route::get('products', [ProductsController::class, 'index']);
    Route::post('add-product', [ProductsController::class, 'store']);
    Route::get('edit-product/{id}', [ProductsController::class, 'edit']);
    Route::post('update-product/{id}', [ProductsController::class, 'update']);
    Route::delete('delete-product/{id}', [ProductsController::class, 'destroy']);
    Route::get('orders', [OrderController::class, 'index']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
