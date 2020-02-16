<?php

return [
    'apiroot' => env('OBS_APIROOT', 'https://api.opensuse.org'),
    'username' => env('OBS_USERNAME', ''),
    'password' => env('OBS_PASSWORD', ''),
    'distros' => [
        'openSUSE:Factory' => 'openSUSE Tumbleweed',
        'openSUSE:Leap:15.2' => 'openSUSE Leap 15.2',
        'openSUSE:Leap:15.1' => 'openSUSE Leap 15.1',
        'openSUSE:Leap:15.0' => 'openSUSE Leap 15.0',
    ],
    'archs' => [
        'x86_64', 'i686', 'aarch64', 'armv7hl', 'ppc64le'
    ]
];
