import AudioPlayer from '@/components/AudioPlayer';
import Main from '@/layouts/main';
import React from 'react';

const Listen: React.FC = () => {
    return (
        <Main>
            <div className="min-h-screen bg-[#0f0f0f] pb-24 text-white">
                <section className="border-b border-gray-700 bg-[#2d3a1f] py-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold">Live Radio</h1>
                    <p className="text-lg text-gray-300">Stream Velvet Radio live — broadcasting from the studio</p>
                </section>

                <section className="px-6 py-16 text-center">
                    <div className="mx-auto max-w-xl rounded-lg bg-[#1a1a1a] p-8">
                        <div className="mb-6 flex items-center justify-center gap-2">
                            <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-red-500"></span>
                            <span className="text-sm font-medium uppercase tracking-widest text-gray-300">On Air</span>
                        </div>
                        <h2 className="mb-2 text-2xl font-bold">Velvet Radio</h2>
                        <p className="mb-8 text-gray-400">Press play in the bar below to connect to the live stream</p>
                        <p className="text-xs text-gray-600">Stream powered by Icecast · 128 kbps MP3</p>
                    </div>
                </section>
            </div>

            <AudioPlayer streamUrl="/stream" title="Velvet Radio" showName="Live" />
        </Main>
    );
};

export default Listen;
