<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\OBS\Client;

class HomeController extends Controller
{
    /**
     * Show home page.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }
}
