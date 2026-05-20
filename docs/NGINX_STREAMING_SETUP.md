# Velvet Radio — Nginx Streaming Setup

Nginx acts as a reverse proxy between browser listeners and the Icecast server.
Listeners hit `https://velvetradio.graveyardjokes.com/stream` and Nginx proxies internally to Icecast on port 8000.

---

## Why Proxy Through Nginx?

- Icecast binds to `127.0.0.1:8000` (not publicly exposed)
- All traffic goes through the single HTTPS termination point (port 443)
- Consistent domain + TLS for listeners — no mixed-content issues
- Nginx handles `Connection: close` → Icecast's streaming chunked transfer correctly

---

## Nginx Server Block Addition

Add the following `location` block inside the existing `velvetradio.graveyardjokes.com` server block in `/etc/nginx/sites-available/velvetradio`:

```nginx
# Live audio stream — proxies to Icecast /live mount
location /stream {
    proxy_pass         http://127.0.0.1:8000/live;
    proxy_http_version 1.0;

    # Required for streaming: disable buffering so audio flows continuously
    proxy_buffering        off;
    proxy_cache            off;

    # Pass standard headers
    proxy_set_header Host              $host;
    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # Allow large/infinite response bodies (audio streams have no Content-Length)
    proxy_read_timeout  3600s;
    proxy_send_timeout  3600s;

    # CORS — allow the frontend origin to load the stream
    add_header Access-Control-Allow-Origin "https://velvetradio.graveyardjokes.com" always;
    add_header Access-Control-Allow-Methods "GET, OPTIONS" always;

    # Icecast streams are audio/mpeg — pass through the Content-Type from Icecast
    # Do NOT override it here
}
```

---

## Apply the Change

```bash
# Test config syntax
sudo nginx -t

# Reload Nginx (zero downtime)
sudo systemctl reload nginx
```

---

## Verify

```bash
# Should return: Content-Type: audio/mpeg (or audio/ogg) with Transfer-Encoding: chunked
curl -I https://velvetradio.graveyardjokes.com/stream
```

---

## Icecast Admin

The Icecast admin UI is available at `http://127.0.0.1:8000/admin/` (internal only — do not expose publicly).
Access via SSH tunnel:

```bash
ssh -L 8000:127.0.0.1:8000 user@velvetradio.graveyardjokes.com
# Then open: http://localhost:8000/admin/
```

---

## Service Management

```bash
# Start / stop / restart
sudo systemctl start icecast2
sudo systemctl stop icecast2
sudo systemctl restart liquidsoap-velvetradio

# View live logs
journalctl -u icecast2 -f
journalctl -u liquidsoap-velvetradio -f

# Enable auto-start on boot
sudo systemctl enable icecast2
sudo systemctl enable liquidsoap-velvetradio
```
