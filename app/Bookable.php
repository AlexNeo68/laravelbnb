<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bookable extends Model
{
    protected $tables = 'bookables';

    public function bookings(){
        return $this->hasMany(Booking::class);
    }

    public function reviews(){
        return $this->hasMany(Review::class);
    }

    public function availableFor($for, $to):bool
    {
        return 0 === $this->bookings()->betweenDates($for, $to)->count();
    }
}
