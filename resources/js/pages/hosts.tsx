import Main from '@/layouts/main';
import React from 'react';

interface Host {
    id: number;
    name: string;
    show: string;
    bio: string;
    avatar: string;
}

interface HostsProps {
    hosts: Host[];
}

const Hosts: React.FC<HostsProps> = ({ hosts }) => {
    return (
        <Main>
            <div className="min-h-screen bg-[#0f0f0f] text-white">
                <section className="border-b border-gray-700 bg-[#2d3a1f] py-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold">Hosts</h1>
                    <p className="text-lg text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </section>

                <section className="px-6 py-12">
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {hosts.map((host: Host) => (
                            <div key={host.id} className="rounded-lg bg-[#1a1a1a] p-6 text-center shadow-lg">
                                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#4a3d5c] text-2xl font-bold">
                                    {host.avatar}
                                </div>
                                <h3 className="mb-2 text-xl font-semibold">{host.name}</h3>
                                <p className="mb-4 font-medium text-[#4a3d5c]">Host of {host.show}</p>
                                <p className="mb-6 text-gray-300">{host.bio}</p>
                                <button className="rounded-lg bg-[#4a3d5c] px-6 py-2 text-white hover:bg-[#5c4a70]">View Profile</button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </Main>
    );
};

export default Hosts;
