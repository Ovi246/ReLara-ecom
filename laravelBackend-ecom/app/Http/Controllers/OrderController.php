<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();

        return response()->json([
            'status' => 200,
            'orders' => $orders
        ]);
    }
}
