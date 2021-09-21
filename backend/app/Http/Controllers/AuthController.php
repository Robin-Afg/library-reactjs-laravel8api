<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\Respose;
use Illuminate\Support\Facades\Hash;


class AuthController extends Controller
{
    public function register(Request $request) {
        $user_data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed'
        ]);

        $user = User::create([
            'name' => $user_data['name'],
            'email' => $user_data['email'],
            'password' => bcrypt($user_data['password'])
        ]);

        $token = $user->createToken('myapptoke')->plainTextToken;

        $respone = [
            'user' => $user,
            'token' => $token,
        ];
        return $respone;

    }


    public function login(Request $request) {
        $user_data = $request->validate([
            
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        //check email
        $user = User::where('email', $user_data['email'])->first();
        //check password
        if(!$user || !Hash::check($user_data['password'], $user->password)){
            return response([
                'message' => 'bad credentials',
            ], 401);
        } else {
            $token = $user->createToken('myapptoke')->plainTextToken;
            $response = [
                'user' => $user,
                'token' => $token,
            ];
        }
        
        return $response;

    }

    public function logout(Request $request){
        auth()->user()->tokens()->delete();
        return response([
            'message' => 'Logged out',
            'status' =>200
        ], 200);
    }



}
