#!/usr/bin/liquidsoap
# Velvet Radio — Liquidsoap stream engine
# Version: 1.0
# Deploy path: /var/www/velvetradio/config/radio.liq
#
# Requires: liquidsoap >= 2.0
# Usage: liquidsoap /var/www/velvetradio/config/radio.liq
#        (or managed via systemd — see config/systemd/liquidsoap.service)

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
settings.log.file.set(true)
settings.log.file.path.set("/var/log/liquidsoap/velvetradio.log")
settings.log.level.set(3)

# ---------------------------------------------------------------------------
# Server
# ---------------------------------------------------------------------------
settings.server.telnet.set(false)

# ---------------------------------------------------------------------------
# Icecast connection settings
# Match these to /etc/icecast2/icecast.xml on the server
# ---------------------------------------------------------------------------
icecast_host     = "127.0.0.1"
icecast_port     = 8000
icecast_password = "CHANGE_ME_SOURCE_PASSWORD"   # must match <source-password> in icecast.xml

# ---------------------------------------------------------------------------
# Fallback playlist
# Place .mp3 files in storage/audio/fallback/ on the server.
# Liquidsoap randomises the order on each pass.
# ---------------------------------------------------------------------------
fallback_dir = "/var/www/velvetradio/storage/audio/fallback"

fallback_playlist = playlist(
    mode     = "randomize",
    reload   = 3600,          # re-scan directory every hour
    fallback_dir
)

# Wrap in mksafe to guarantee a signal even if the directory is empty
fallback_source = mksafe(fallback_playlist)

# ---------------------------------------------------------------------------
# Live input
# DJs connect using Mixxx / BUTT (or any Icecast source client) to:
#   Host: <server-ip>   Port: 8001   Password: <source-password>
# ---------------------------------------------------------------------------
live = input.harbor(
    "live",
    port     = 8001,
    password = icecast_password
)

# ---------------------------------------------------------------------------
# Priority source: prefer live DJ over fallback playlist
# track_sensitive=false means we switch immediately when live disconnects
# ---------------------------------------------------------------------------
radio = fallback(
    track_sensitive = false,
    [live, fallback_source]
)

# ---------------------------------------------------------------------------
# Output: primary /live mount
# Listeners connect here via /stream (proxied by Nginx — see docs/NGINX_STREAMING_SETUP.md)
# ---------------------------------------------------------------------------
output.icecast(
    %mp3(bitrate = 128),
    host        = icecast_host,
    port        = icecast_port,
    password    = icecast_password,
    mount       = "/live",
    name        = "Velvet Radio",
    description = "Velvet Radio — Broadcasting from the Studio",
    url         = "https://velvetradio.graveyardjokes.com",
    radio
)

# ---------------------------------------------------------------------------
# Output: /fallback mount (always-on scheduled programming)
# ---------------------------------------------------------------------------
output.icecast(
    %mp3(bitrate = 128),
    host        = icecast_host,
    port        = icecast_port,
    password    = icecast_password,
    mount       = "/fallback",
    name        = "Velvet Radio (Scheduled)",
    description = "Velvet Radio — Scheduled Programming",
    url         = "https://velvetradio.graveyardjokes.com",
    fallback_source
)
