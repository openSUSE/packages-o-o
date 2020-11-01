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
        $obs_client = new Client(config('obs.apiroot'), config('obs.username'), config('obs.password'));
        $latest_updated_packages = $obs_client->fetchLatestUpdatedPackages();
        $latest_added_packages = $obs_client->fetchLatestAddedPackages();
        return view('home')->with('latest_updated_packages', $latest_updated_packages)
                           ->with('latest_added_packages', $latest_added_packages);
    }
}
