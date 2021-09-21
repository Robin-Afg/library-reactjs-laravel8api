<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Book;

class Report extends Model
{
    use HasFactory;
    //one book can have multiple reports 
    //one report has one book
    //one to many relationship
    public function Book() {
        return $this->BelongsTo(Book::class);
    }

    
}
