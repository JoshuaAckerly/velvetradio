import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface AudioPlayerProps {
    src?: string | null;
    title: string;
    showName: string;
    streamUrl?: string;
}

const formatTime = (seconds: number): string => {
    if (!isFinite(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src = null, title, showName, streamUrl }) => {
    const isLive = !!streamUrl;
    const audioSrc = streamUrl ?? src;
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);

    // Episode mode: reset and auto-play on src change. Live streams are user-initiated only.
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || isLive) return;
        setCurrentTime(0);
        setDuration(0);
        if (src) {
            audio.load();
            audio
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => setIsPlaying(false));
        } else {
            setIsPlaying(false);
        }
    }, [src, streamUrl]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio || !audioSrc) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(() => {});
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;
        const time = parseFloat(e.target.value);
        audio.currentTime = time;
        setCurrentTime(time);
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;
        const v = parseFloat(e.target.value);
        setVolume(v);
        audio.volume = v;
        setIsMuted(v === 0);
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;
        const muting = !isMuted;
        setIsMuted(muting);
        audio.muted = muting;
    };

    if (!audioSrc) return null;

    return (
        <div className="fixed right-0 bottom-0 left-0 z-50 border-t border-[#3a3a3a] bg-[#1a1a1a] px-4 py-3 shadow-2xl">
            <audio
                ref={audioRef}
                src={audioSrc}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime ?? 0)}
                onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
                onEnded={() => setIsPlaying(false)}
            />

            <div className="mx-auto flex max-w-4xl items-center gap-4">
                {/* Play / Pause */}
                <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                    className="shrink-0 rounded-full bg-[#4a3d5c] p-2 text-white hover:bg-[#5c4a70] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                </button>

                {/* Track info */}
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{title}</p>
                    <p className="truncate text-xs text-gray-400">{showName}</p>
                </div>

                {/* Seek bar + timestamps (episode mode) / LIVE badge (stream mode) */}
                <div className="hidden flex-1 items-center gap-2 sm:flex">
                    {isLive ? (
                        <span className="rounded bg-red-600 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                            Live
                        </span>
                    ) : (
                        <>
                            <span className="shrink-0 text-xs text-gray-400 tabular-nums">{formatTime(currentTime)}</span>
                            <input
                                type="range"
                                min={0}
                                max={duration || 0}
                                step={1}
                                value={currentTime}
                                onChange={handleSeek}
                                aria-label="Seek"
                                className="h-1 w-full cursor-pointer accent-[#4a3d5c]"
                            />
                            <span className="shrink-0 text-xs text-gray-400 tabular-nums">{formatTime(duration)}</span>
                        </>
                    )}
                </div>

                {/* Volume */}
                <div className="hidden items-center gap-2 sm:flex">
                    <button
                        type="button"
                        onClick={toggleMute}
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                        className="shrink-0 text-gray-400 hover:text-white"
                    >
                        {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        aria-label="Volume"
                        className="h-1 w-20 cursor-pointer accent-[#4a3d5c]"
                    />
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
