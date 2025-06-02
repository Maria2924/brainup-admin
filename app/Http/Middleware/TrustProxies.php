<?php

namespace App\Http\Middleware;

use Illuminate\Http\Middleware\TrustProxies as Middleware;
use Illuminate\Http\Request;

class TrustProxies extends Middleware
{
    protected array|string|null $proxies = '*';
    protected int $headers = Request::HEADER_X_FORWARDED_ALL;
}
