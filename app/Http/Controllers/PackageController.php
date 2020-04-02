<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\OBS\Client;

class PackageController extends Controller
{
    /**
     * Show package.
     *
     * @param string $id
     * @param  Request  $request
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function show($id, Request $request)
    {
        $obs_client = new Client(config('obs.apiroot'), config('obs.username'), config('obs.password'));
        $obs_binaries = $obs_client->searchBinariesByPackageName($id, $request->cookie('distro'), $request->cookie('arch'));

        $pmbs_client = new Client(config('pmbs.apiroot'), config('pmbs.username'), config('pmbs.password'));
        $pmbs_binaries = $pmbs_client->searchBinariesByPackageName($id, $request->cookie('distro'), $request->cookie('arch'));

        return view('package')->with('name', $id)->with('binaries', array_merge($pmbs_binaries, $obs_binaries));
    }
}
