<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Modles\Book;


class Publisher extends Model
{
    use HasFactory;
    
    
    protected $fillable = [
        'id',
        'name',

    ];


    public function books(){
        return $this->hasMany(Book::class);
    }
}
