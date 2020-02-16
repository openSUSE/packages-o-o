<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\OBS\Client;

class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @param  Request  $request
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        if ($request->q) {
            $keywords = preg_split("/[\s,-_.]+/", $request->q);
            if ($keywords) {
                $client = new Client(config('obs.apiroot'), config('obs.username'), config('obs.password'));
                $binaries = $client->searchBinaries($keywords, $request->cookie('distro'));
                return view('search')->with('binaries', $binaries);
            }
        }
        return view('home');
    }
}
