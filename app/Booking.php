<?php

namespace App;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Booking extends Model
{

    protected $fillable = ['from', 'to', 'bookable_id', 'price', 'address_id'];

    public function bookable(){
        return $this->belongsTo(Bookable::class);
    }

    public function review(){
        return $this->hasOne(Review::class);
    }

    public function address(){
        return $this->belongsTo(Address::class);
    }

    public function scopeBetweenDates(Builder $query, $from, $to){
        return $query->where('to', '>=', $from)->where('from', '<=', $to);
    }

    public static function getBookingByReview($review_key) : ?Booking
    {
        return static::where('review_key', $review_key)->with('bookable')->get()->first();
    }

    protected static function boot(){
        parent::boot();

        static::creating(function($booking){
            $booking->review_key = Str::uuid();
        });
    }
}
