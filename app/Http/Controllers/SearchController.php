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

        $obs_client = new Client(config('obs.apiroot'), config('obs.username'), config('obs.password'));
        $obs_binaries = $obs_client->searchBinariesByKeywords($keywords, $request->cookie('distro'), $request->cookie('arch'));

        $pmbs_client = new Client(config('pmbs.apiroot'), config('pmbs.username'), config('pmbs.password'));
        $pmbs_binaries = $pmbs_client->searchBinariesByKeywords($keywords, $request->cookie('distro'), $request->cookie('arch'));

        return view('search')->with('binaries', array_merge($pmbs_binaries, $obs_binaries));
    }
}
