<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name') }}</title>

    <!-- Chameleon Theme -->
    <link href="https://static.opensuse.org/chameleon/dist/css/chameleon.css" rel="stylesheet"/>
    <script src="https://static.opensuse.org/chameleon/dist/js/chameleon.js" defer></script>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <!-- Data -->
    <script>
        var distros = {!! json_encode(config('obs.distros')) !!};
        var archs = {!! json_encode(config('obs.archs')) !!};
    </script>
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md">
            <a class="navbar-brand" href="{{ url('/') }}">
                <img class="mr-2" src="{{ config('app.logo') }}"/>
                <span class="navbar-title"><span>{{ config('app.name') }}</span></span>
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->
                <form class="form-inline mr-auto" action="/">
                    <div id="distro-select-root" class="mr-md-2"></div>
                    <div id="arch-select-root" class="mr-md-2"></div>
                    <input class="form-control" type="search" name="q" value="{{ request('q') }}" placeholder="Search packages..." aria-label="Search">
                    <button class="btn btn-success my-2 my-sm-0" type="submit">Search</button>
                </form>

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto d-none">
                    <!-- Authentication Links -->
                    @guest
                        <li class="nav-item">
                            <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                        </li>
                        @if (Route::has('register'))
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                            </li>
                        @endif
                    @else
                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                {{ Auth::user()->name }} <span class="caret"></span>
                            </a>

                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="{{ route('logout') }}"
                                    onclick="event.preventDefault();
                                                    document.getElementById('logout-form').submit();">
                                    {{ __('Logout') }}
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    @csrf
                                </form>
                            </div>
                        </li>
                    @endguest
                </ul>
            </div>
        </nav>

        <main>
            @yield('content')
        </main>
    </div>
</body>
</html>
