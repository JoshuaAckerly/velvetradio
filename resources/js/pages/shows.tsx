import React from "react";
import Main from "@/layouts/main";

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
            <div className="bg-[#0f0f0f] min-h-screen text-white">
                <section className="bg-[#2d3a1f] py-12 text-center border-b border-gray-700">
                    <h1 className="text-4xl font-bold mb-4">Shows</h1>
                    <p className="text-lg text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </section>

                <section className="px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {shows.map((show: Show) => (
                            <div key={show.id} className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg">
                                <div className="h-48 bg-[#3d2a4a]"></div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{show.title}</h3>
                                    <p className="text-[#4a3d5c] font-medium mb-2">Hosted by {show.host}</p>
                                    <p className="text-gray-300 mb-4">{show.description}</p>
                                    <p className="text-sm text-gray-400 mb-4">{show.episodes} episodes</p>
                                    <button className="w-full bg-[#4a3d5c] hover:bg-[#5c4a70] py-2 rounded-lg text-white">
                                        View Show
                                    </button>
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