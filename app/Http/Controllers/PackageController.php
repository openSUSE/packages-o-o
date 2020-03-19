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
        $client = new Client(config('obs.apiroot'), config('obs.username'), config('obs.password'));
        $binaries = $client->searchBinariesByPackageName($id, $request->cookie('distro'), $request->cookie('arch'));
        return view('package')->with('name', $id)->with('binaries', $binaries);
    }
}
