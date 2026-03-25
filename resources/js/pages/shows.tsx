import Main from '@/layouts/main';
import React from 'react';

interface Show {
    id: number;
    title: string;
    host: string;
    description: string;
    episodes: number;
}

interface ShowsProps {
    shows: Show[];
}

const Shows: React.FC<ShowsProps> = ({ shows }) => {
    return (
        <Main>
            <div className="min-h-screen bg-[#0f0f0f] text-white">
                <section className="border-b border-gray-700 bg-[#2d3a1f] py-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold">Shows</h1>
                    <p className="text-lg text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </section>

                <section className="px-6 py-12">
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {shows.map((show: Show) => (
                            <div key={show.id} className="overflow-hidden rounded-lg bg-[#1a1a1a] shadow-lg">
                                <div className="h-48 bg-[#3d2a4a]"></div>
                                <div className="p-6">
                                    <h3 className="mb-2 text-xl font-semibold">{show.title}</h3>
                                    <p className="mb-2 font-medium text-[#4a3d5c]">Hosted by {show.host}</p>
                                    <p className="mb-4 text-gray-300">{show.description}</p>
                                    <p className="mb-4 text-sm text-gray-400">{show.episodes} episodes</p>
                                    <button className="w-full rounded-lg bg-[#4a3d5c] py-2 text-white hover:bg-[#5c4a70]">View Show</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </Main>
    );
};

export default Shows;
