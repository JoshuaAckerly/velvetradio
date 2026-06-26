<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AddSecurityHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        /** @var Response $response */
        $response = $next($request);

        $isDev = app()->environment('local', 'testing');
        $devViteOrigin = 'http://velvetradio.graveyardjokes.local:8087';

        // Content Security Policy
        $csp = implode('; ', [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com".($isDev ? " http://localhost:* {$devViteOrigin}" : ''),
            "style-src 'self' 'unsafe-inline' https://fonts.bunny.net",
            "font-src 'self' https://fonts.bunny.net",
            "img-src 'self' data: https: http://d3fjkusrpksks7.cloudfront.net blob:",
            "connect-src 'self' https://graveyardjokes.com https://www.graveyardjokes.com https://www.google-analytics.com https://region1.google-analytics.com https://pagead2.googlesyndication.com".($isDev ? " http://localhost:* ws://localhost:* {$devViteOrigin} ws://velvetradio.graveyardjokes.local:8087 http://graveyardjokes.local http://velvetradio.graveyardjokes.local" : ''),
            'frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com',
            "frame-ancestors 'none'",
            "object-src 'none'",
            "base-uri 'self'",
            "form-action 'self'",
        ]);

        $response->headers->set('Content-Security-Policy', $csp);
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()');
        $response->headers->set('X-Permitted-Cross-Domain-Policies', 'none');
        $response->headers->set('Cross-Origin-Resource-Policy', 'same-origin');
        $response->headers->remove('X-Powered-By');

        // COOP and HSTS only make sense over HTTPS
        if (! $isDev) {
            $response->headers->set('Cross-Origin-Opener-Policy', 'same-origin');
            $response->headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
        }

        return $response;
    }
}
