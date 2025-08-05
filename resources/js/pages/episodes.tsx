import React from "react";
import Main from "@/layouts/main";

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
            <div className="bg-[#0f0f0f] min-h-screen text-white">
                <section className="bg-[#2d3a1f] py-12 text-center border-b border-gray-700">
                    <h1 className="text-4xl font-bold mb-4">Episodes</h1>
                    <p className="text-lg text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </section>

                <section className="px-6 py-12">
                    <div className="max-w-4xl mx-auto space-y-4">
                        {episodes.map((episode: Episode) => (
                            <div key={episode.id} className="bg-[#1a1a1a] rounded-lg p-6 flex items-center justify-between">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold mb-1">{episode.title}</h3>
                                    <p className="text-[#4a3d5c] text-sm mb-2">{episode.show} • {episode.host}</p>
                                    <p className="text-gray-400 text-sm">{episode.date} • {episode.duration}</p>
                                </div>
                                <button className="bg-[#4a3d5c] hover:bg-[#5c4a70] px-6 py-2 rounded-lg text-white ml-4">
                                    Play
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </Main>
    );
};

export default Episodes;