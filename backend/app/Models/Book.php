<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Modles\Author;
use App\Modles\Publisher;
use App\Modles\User;
use App\Modles\Report;
use App\Modles\Category;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'isbn',
        'pages',
        'category',
        'publish_year',
        'publisher_id',
        'author_id',
        'desc',
        'amount',
        'file',
        
    ];
    //one book can have multiple authors
    //one author can have multiple books 
    //so its a many to many relationship
    public function authors() {
        return $this->belongsToMany(Author::Class);
    }

    //one book can have one publisher
    public function publisher(){
        return $this->hasOne(Publisher::class);
    }

    //one book can have multiple users(borrowers)
    //one borrower(user) can have multiple books
    //many to many relationship
    public function users() {
        return $this->belongsToMany(users::Class);
    }

    //one book can have multiple reports 
    //one report has one book
    //one to many relationship
    public function reports(){
        return $this->hasMany(Report::class);
    }

    public function category() {
        return $this->belongsTo(Category::Class);
    }

}
