<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\OBS\Client;

class SearchController extends Controller
{
    /**
     * Show search result.
     *
     * @param  Request  $request
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        $request->validate([
            'q' => 'required'
        ]);
        $keywords = preg_split("/[\s,-_.]+/", $request->q);
        $client = new Client(config('obs.apiroot'), config('obs.username'), config('obs.password'));
        $binaries = $client->searchBinariesByKeywords($keywords, $request->cookie('distro'), $request->cookie('arch'));
        return view('search')->with('binaries', $binaries);
    }
}
