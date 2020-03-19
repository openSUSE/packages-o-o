@extends('layouts.app')

@section('content')
<div id="package-view-root"></div>
<script>
    var binaries = {!! json_encode($binaries) !!};
    var name = "{!! $name !!}";
</script>
@endsection
