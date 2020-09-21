<?php

namespace App;

use Carbon\Carbon;
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

    public function priceFor($from, $to):array
    {
        $days = (new Carbon($to))->diffInDays((new Carbon($from)));
        return [
            'total' => $days * $this->price,
            'breakdown' => [
                $days => $this->price
            ]
        ];
    }
}
