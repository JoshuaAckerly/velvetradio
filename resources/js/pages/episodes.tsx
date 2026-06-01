import AudioPlayer from '@/components/AudioPlayer';
import Main from '@/layouts/main';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';

interface Episode {
    id: number;
    title: string;
    show: string;
    host: string;
    duration: string;
    date: string;
    audio_url: string | null;
}

interface ActiveTrack {
    src: string;
    title: string;
    showName: string;
}

interface EpisodesProps {
    episodes: Episode[];
    shows: Record<number, string>;
    activeShow: string;
}

const Episodes: React.FC<EpisodesProps> = ({ episodes, shows, activeShow }) => {
    const [activeTrack, setActiveTrack] = useState<ActiveTrack | null>(null);

    const handlePlay = (episode: Episode) => {
        if (!episode.audio_url) return;
        setActiveTrack({
            src: episode.audio_url,
            title: episode.title,
            showName: episode.show,
        });
    };

    const handleFilter = (show: string) => {
        router.get('/episodes', show ? { show } : {}, { preserveScroll: true });
    };

    const showNames = ['', ...Object.values(shows)];

    return (
        <Main>
            <div className="min-h-screen bg-[#0f0f0f] pb-20 text-white">
                <section className="border-b border-gray-700 bg-[#2d3a1f] py-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold">Episodes</h1>
                    <p className="text-lg text-gray-300">Browse all episodes from every show</p>
                </section>

                <section className="px-6 py-8">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-6 flex flex-wrap gap-2">
                            {showNames.map((name) => (
                                <button
                                    key={name || '__all__'}
                                    onClick={() => handleFilter(name)}
                                    className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                                        activeShow === name ? 'bg-[#4a3d5c] text-white' : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a]'
                                    }`}
                                >
                                    {name || 'All Shows'}
                                </button>
                            ))}
                        </div>

                        <div className="space-y-4">
                            {episodes.length === 0 ? (
                                <p className="py-12 text-center text-gray-500">No episodes found.</p>
                            ) : (
                                episodes.map((episode: Episode) => (
                                    <div key={episode.id} className="flex items-center justify-between rounded-lg bg-[#1a1a1a] p-6">
                                        <div className="flex-1">
                                            <h3 className="mb-1 text-lg font-semibold">{episode.title}</h3>
                                            <p className="mb-2 text-sm text-[#a78bfa]">
                                                {episode.show} • {episode.host}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                {episode.date} • {episode.duration}
                                            </p>
                                        </div>
                                        <button
                                            className="ml-4 rounded-lg bg-[#4a3d5c] px-6 py-2 text-white hover:bg-[#5c4a70] disabled:cursor-not-allowed disabled:opacity-40"
                                            onClick={() => handlePlay(episode)}
                                            disabled={!episode.audio_url}
                                            aria-label={`Play ${episode.title}`}
                                        >
                                            Play
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </section>
            </div>

            {activeTrack && <AudioPlayer src={activeTrack.src} title={activeTrack.title} showName={activeTrack.showName} />}
        </Main>
    );
};

export default Episodes;
