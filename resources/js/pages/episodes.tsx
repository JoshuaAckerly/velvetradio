import Main from '@/layouts/main';
import React from 'react';

interface Episode {
    id: number;
    title: string;
    show: string;
    host: string;
    duration: string;
    date: string;
}

interface EpisodesProps {
    episodes: Episode[];
}

const Episodes: React.FC<EpisodesProps> = ({ episodes }) => {
    return (
        <Main>
            <div className="min-h-screen bg-[#0f0f0f] text-white">
                <section className="border-b border-gray-700 bg-[#2d3a1f] py-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold">Episodes</h1>
                    <p className="text-lg text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </section>

                <section className="px-6 py-12">
                    <div className="mx-auto max-w-4xl space-y-4">
                        {episodes.map((episode: Episode) => (
                            <div key={episode.id} className="flex items-center justify-between rounded-lg bg-[#1a1a1a] p-6">
                                <div className="flex-1">
                                    <h3 className="mb-1 text-lg font-semibold">{episode.title}</h3>
                                    <p className="mb-2 text-sm text-[#4a3d5c]">
                                        {episode.show} • {episode.host}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {episode.date} • {episode.duration}
                                    </p>
                                </div>
                                <button className="ml-4 rounded-lg bg-[#4a3d5c] px-6 py-2 text-white hover:bg-[#5c4a70]">Play</button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </Main>
    );
};

export default Episodes;
