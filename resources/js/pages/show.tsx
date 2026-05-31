import AudioPlayer from '@/components/AudioPlayer';
import Main from '@/layouts/main';
import { Link } from '@inertiajs/react';
import React, { useState } from 'react';

interface ShowHost {
    id: number;
    name: string;
    bio: string;
    avatar: string;
}

interface ShowEpisode {
    id: number;
    title: string;
    duration: string;
    date: string;
    audio_url: string | null;
}

interface ShowDetail {
    id: number;
    title: string;
    description: string;
    slug: string;
    episode_count: number;
}

interface ActiveTrack {
    src: string;
    title: string;
    showName: string;
}

interface ShowProps {
    show: ShowDetail;
    hosts: ShowHost[];
    episodes: ShowEpisode[];
}

const Show: React.FC<ShowProps> = ({ show, hosts, episodes }) => {
    const [activeTrack, setActiveTrack] = useState<ActiveTrack | null>(null);

    const handlePlay = (episode: ShowEpisode) => {
        if (!episode.audio_url) return;
        setActiveTrack({
            src: episode.audio_url,
            title: episode.title,
            showName: show.title,
        });
    };

    return (
        <Main>
            <div className="min-h-screen bg-[#0f0f0f] pb-20 text-white">
                <section className="border-b border-gray-700 bg-[#2d3a1f] py-12 text-center">
                    <h1 className="mb-2 text-4xl font-bold">{show.title}</h1>
                    <p className="mb-4 text-lg text-gray-300">{show.description}</p>
                    <span className="inline-block rounded-full bg-[#4a3d5c] px-3 py-1 text-sm">{show.episode_count} episodes</span>
                </section>

                {hosts.length > 0 && (
                    <section className="px-6 py-10">
                        <div className="mx-auto max-w-4xl">
                            <h2 className="mb-6 text-2xl font-semibold">Hosts</h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {hosts.map((host) => (
                                    <Link
                                        key={host.id}
                                        href={`/hosts/${host.id}`}
                                        className="flex items-center gap-4 rounded-lg bg-[#1a1a1a] p-4 hover:bg-[#222]"
                                    >
                                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#4a3d5c] text-lg font-bold">
                                            {host.avatar || host.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold">{host.name}</p>
                                            <p className="line-clamp-2 text-sm text-gray-400">{host.bio}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                <section className="px-6 py-10">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-6 text-2xl font-semibold">Episodes</h2>
                        <div className="space-y-4">
                            {episodes.map((episode) => (
                                <div key={episode.id} className="flex items-center justify-between rounded-lg bg-[#1a1a1a] p-6">
                                    <div className="flex-1">
                                        <h3 className="mb-1 text-lg font-semibold">{episode.title}</h3>
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
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            {activeTrack && <AudioPlayer src={activeTrack.src} title={activeTrack.title} showName={activeTrack.showName} />}
        </Main>
    );
};

export default Show;
