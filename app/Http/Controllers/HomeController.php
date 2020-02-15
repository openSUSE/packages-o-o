<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\OBS\Client;

class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $client = new Client(config('obs.apiroot'), config('obs.username'), config('obs.password'));
        $data = $client->searchBinaries(['retro', 'nes']);
        return view('home', ['data' => $data]);
    }
}
