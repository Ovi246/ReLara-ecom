<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class FrontendController extends Controller
{
    public function categories()
    {
        $categories = Category::all();

        return response()->json([
            'status' => 200,
            'categories' => $categories
        ]);
    }

    public function fetchProducts($slug)
    {
        $category = Category::where('slug', $slug)->first();
        if ($category) {
            $products = Product::where('category_id', $category->id)->get();
            if ($products) {
                return response()->json([
                    'status' => 200,
                    'products_data' => [
                        'products' => $products,
                        'category' => $category
                    ]
                ]);
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => "No Product Available"
                ]);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Such Category Found'
            ]);
        }
    }

    public function viewProduct($category_slug, $product_slug)
    {
        $category = Category::where('slug', $category_slug)->first();
        if ($category) {
            $product = Product::where('category_id', $category->id)->where('slug', $product_slug)->first();
            if ($product) {
                return response()->json([
                    'status' => 200,
                    'product' => $product
                ]);
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => "No Product Available"
                ]);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Such Category Found'
            ]);
        }
    }
}
