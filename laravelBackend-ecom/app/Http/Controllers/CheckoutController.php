<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CheckoutController extends Controller
{
    public function placeorder(Request $request)
    {
        if (auth('sanctum')->check()) {
            $validator = Validator::make($request->all(), [
                'firstname' => 'required|max:191',
                'lastname' => 'required|max:191',
                'phonenumber' => 'required|max:191',
                'email' => 'required|max:191',
                'address' => 'required|max:191',
                'city' => 'required|max:191',
                'state' => 'required|max:191',
                'zipcode' => 'required|max:191',
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'validation_errors' => $validator->messages(),
                ]);
            } else {
                $user_id = auth('sanctum')->user()->id;
                $order = new Order();
                $order->user_id = $user_id;
                $order->firstname = $request->firstname;
                $order->lastname = $request->lastname;
                $order->phonenumber = $request->phonenumber;
                $order->email = $request->email;
                $order->address = $request->address;
                $order->city = $request->city;
                $order->state = $request->state;
                $order->zipcode = $request->zipcode;

                $order->payment_mode = 'COD';
                $order->tracking_no = 'oviecom' . rand(1111, 9999);

                $order->save();

                $cart = Cart::where('user_id', $user_id)->get();
                $orderitems = [];

                foreach ($cart as $item) {
                    $orderitems[] = [
                        'product_id' => $item->product_id,
                        'quantity' => $item->quantity,
                        'price' => $item->product->selling_price,
                    ];

                    $item->product->update([
                        'quantity' => $item->product->quantity - $item->quantity
                    ]);

                    $order->orderitems()->createMany($orderitems);
                    Cart::destroy($cart);
                }

                return response()->json([
                    'status' => 200,
                    'message' => 'Order Placed Succesfully'
                ]);
            }
        } else {
            return response()->json([
                'status' => 401,
                'message' => 'Login to Continue'
            ]);
        }
    }
}
