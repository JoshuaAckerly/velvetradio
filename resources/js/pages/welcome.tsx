import React from "react";
import Main from "@/layouts/main";


const cdn = import.meta.env.VITE_ASSET_URL;

const Welcome: React.FC = () => {
    return (
        <Main>
            {/* Hero Section */}
            <section className="border-b border-black text-black bg-[#a6ce39] py-12 text-center">
                <h2 className="mb-2 text-4xl font-bold">Velvet Radio</h2>
                <p className="mb-6 text-lg">Broadcasting Stories from the other side of the signal</p>
                <button className="rounded-lg bg-[#7d6b8d] px-6 py-2 font-medium text-white">Listen Now</button>
            </section>

            {/* Featured Episode */}
            <section className="px-6 py-8">
                <h3 className="mb-2 text-2xl font-semibold lg:text-center">Episode 03: Signal Lost</h3>
                <p className="mb-4 lg:text-center">A journey through static and lost conversations.</p>

                {/* Audio Player Mockup */}
                <div className="flex h-8 w-full lg:mx-auto max-w-xl items-center rounded-full bg-[#a6ce39]">
                    <button className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#7d6b8d] text-white">▶</button>
                    <div className="mx-2 h-2 flex-1 rounded-full bg-[#7d6b8d]"></div>
                </div>
            </section>

            {/* Episodes + Image */}
            <section className="flex flex-col">
                {/* Left image */}
                <div className="flex-1 lg:w-1/2  p-2 lg:mx-auto">
                    <img
                        src={`${cdn}/images/velvetradio_LandingImage.webp`}
                        alt="Microphone"
                        className="h-auto w-full border-4 border-[#a6ce39]"
                    />
                </div>

                {/* Episode Cards */}
                <div className="flex-1 grid grid-cols-3 gap-6 p-2 m-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-2xl bg-[#d6b6e3] shadow-md">
                            <div className="h-24 rounded-t-xl bg-[#d6b6e3]"></div>
                            <div className="rounded-b-2xl bg-[#4a4e46] p-2 text-white">
                                <h4 className="font-semibold">Episode {i}</h4>
                                <p className="mb-4 text-xs">short teaser</p>
                                <button className="w-full rounded-lg bg-[#7d6b8d] py-2 text-white">Play</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Main>
    );
};

export default Welcome;