<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Book;

class Author extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'id',
        'name',

    ];

    //one book can have multiple authors
    //one author can have multiple books 
    //so its a many to many relationship
    public function Books() {
        return $this->belongsToMany(Book::Class);
    }
    
}
