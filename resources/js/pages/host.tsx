import Main from '@/layouts/main';
import { Link } from '@inertiajs/react';
import React from 'react';

interface HostDetail {
    id: number;
    name: string;
    bio: string;
    avatar: string;
}

interface HostShow {
    title: string;
    slug: string;
}

interface HostProps {
    host: HostDetail;
    show: HostShow;
}

const Host: React.FC<HostProps> = ({ host, show }) => {
    return (
        <Main>
            <div className="min-h-screen bg-[#0f0f0f] text-white">
                <section className="border-b border-gray-700 bg-[#2d3a1f] py-12 text-center">
                    <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#4a3d5c] text-3xl font-bold">
                        {host.avatar || host.name.charAt(0)}
                    </div>
                    <h1 className="mb-2 text-4xl font-bold">{host.name}</h1>
                    <Link href={`/shows/${show.slug}`} className="text-[#8a6fa8] hover:underline">
                        Host of {show.title}
                    </Link>
                </section>

                <section className="px-6 py-12">
                    <div className="mx-auto max-w-2xl">
                        <h2 className="mb-4 text-xl font-semibold">About</h2>
                        <p className="leading-relaxed text-gray-300">{host.bio}</p>
                    </div>
                </section>
            </div>
        </Main>
    );
};

export default Host;
