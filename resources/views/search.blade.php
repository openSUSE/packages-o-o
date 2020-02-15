@extends('layouts.app')

@section('content')
<div id="search-result-root"></div>
<script>
    var binaries = {!! json_encode($binaries) !!};
</script>
@endsection
