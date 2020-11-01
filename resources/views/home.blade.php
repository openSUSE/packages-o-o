@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-sm-6 col-md-4">
            <div class="card my-3">
                <div class="card-header">Latest Updated</div>
                <div class="list-group list-group-flush">
                    @foreach ($latest_updated_packages as $package)
                        @include('components.package-item')
                    @endforeach
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-md-4">
            <div class="card my-3">
                <div class="card-header">Latest Added</div>
                <div class="list-group list-group-flush">
                    @foreach ($latest_added_packages as $package)
                        @include('components.package-item')
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
