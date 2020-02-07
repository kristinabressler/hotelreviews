<?php

namespace App\Http\Controllers;

use App\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
   // apply auth middleware so only authenticated users have access
	public function __construct() {
		$this->middleware('auth');
    }

    public function index(Request $request, Review $review) {
		// get all the reviews based on current user id
		$allReviews = $review->whereIn('user_id', $request->user())->with('user');
		$reviews = $allReviews->orderBy('created_at', 'desc')->take(20)->get();
		// return json response
		return response()->json([
			'reviews' => $reviews,
		]);
    }
    
    
    public function create()
    {
        //
        
    }

    public function store(Request $request)
    {
        //
        // validate
		$this->validate($request, [
			'name' => 'required|max:255',
		]);
		// create a new review based on user reviews relationship
		$review = $request->user()->reviews()->create([
			'name' => $request->name,
		]);
		// return review with user object
		return response()->json($review->with('user')->find($review->id));
    }

    
    public function show($id)
    {
        //
        
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
        $input = $request->all();
		$review = Review::findOrFail($id);
		$review->update($input);
		return response()->json($review->with('user')->find($review->id));
    }

    public function destroy($id)
    {
        //
    }
}
