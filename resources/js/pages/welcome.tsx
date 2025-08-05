import React from "react";
import Main from "@/layouts/main";


const cdn = import.meta.env.VITE_ASSET_URL;

const Welcome: React.FC = () => {
    return (
        <Main>
            {/* Hero Section */}
            <section className="relative border-b border-gray-700 text-white overflow-hidden">
                {/* Hero Image Background */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src={`${cdn}/images/velvetradio_LandingImage.webp?v=${Date.now()}`}
                        alt="Velvet Radio Hero"
                        className="w-full h-full object-cover opacity-40"
                        onError={(e) => console.error('Failed to load hero image:', e)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#2d3a1f]/80 to-[#2d3a1f]/60"></div>
                </div>
                {/* Hero Content */}
                <div className="relative z-10 py-24 text-center px-4">
                    <h2 className="mb-2 text-5xl font-bold drop-shadow-lg">Velvet Radio</h2>
                    <p className="mb-6 text-lg drop-shadow-md max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
                    <button className="rounded-lg bg-[#4a3d5c] px-6 py-3 font-medium text-white hover:bg-[#5c4a70] shadow-lg transition-all hover:shadow-xl">Listen Now</button>
                </div>
            </section>

            {/* Featured Episode */}
            <section className="px-6 py-8 bg-[#1a1a1a] text-white">
                <h3 className="mb-2 text-2xl font-semibold lg:text-center">Episode 03: Lorem Ipsum</h3>
                <p className="mb-4 lg:text-center text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                {/* Audio Player Mockup */}
                <div className="flex h-8 w-full lg:mx-auto max-w-xl items-center rounded-full bg-[#2d3a1f]">
                    <button className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#4a3d5c] text-white hover:bg-[#5c4a70]">▶</button>
                    <div className="mx-2 h-2 flex-1 rounded-full bg-[#4a3d5c]"></div>
                </div>
            </section>

            {/* Episode Cards */}
            <section className="bg-[#0f0f0f] px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-2xl bg-[#3d2a4a] shadow-md">
                            <div className="h-24 rounded-t-xl bg-[#3d2a4a]"></div>
                            <div className="rounded-b-2xl bg-[#1a1a1a] p-4 text-white">
                                <h4 className="font-semibold">Episode {i}</h4>
                                <p className="mb-4 text-xs text-gray-300">Lorem ipsum dolor sit amet consectetur.</p>
                                <button className="w-full rounded-lg bg-[#4a3d5c] py-2 text-white hover:bg-[#5c4a70]">Play</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Main>
    );
};

export default Welcome;