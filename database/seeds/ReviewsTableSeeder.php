<?php

use App\Bookable;
use App\Review;
use Illuminate\Database\Seeder;

class ReviewsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Bookable::all()->each(function ($bookable) {
            $reviews = factory(Review::class, random_int(25, 50))->make();
            $bookable->reviews()->saveMany($reviews);
        });
    }
}
