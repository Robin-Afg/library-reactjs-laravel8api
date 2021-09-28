<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        return Category::all();
       
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $cat = new Category;
        $cat->name = $request->name;
        $cat->save();

        return response([
            'message' => ' Successfully added new category.',
            'status' =>200
        ], 200);

    }

    public function search($name)
    {
        $result = Category::where('name', $name)->first();
        $result = $result->name;
        return response([
            'message' =>  $result,
            'status' => 200
        ], 200);
    }




}
