import React from "react";
import Main from "@/layouts/main";

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
            <div className="bg-[#0f0f0f] min-h-screen text-white">
                <section className="bg-[#2d3a1f] py-12 text-center border-b border-gray-700">
                    <h1 className="text-4xl font-bold mb-4">Hosts</h1>
                    <p className="text-lg text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                </section>

                <section className="px-6 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {hosts.map((host: Host) => (
                            <div key={host.id} className="bg-[#1a1a1a] rounded-lg p-6 text-center shadow-lg">
                                <div className="w-24 h-24 bg-[#4a3d5c] rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                                    {host.avatar}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{host.name}</h3>
                                <p className="text-[#4a3d5c] font-medium mb-4">Host of {host.show}</p>
                                <p className="text-gray-300 mb-6">{host.bio}</p>
                                <button className="bg-[#4a3d5c] hover:bg-[#5c4a70] px-6 py-2 rounded-lg text-white">
                                    View Profile
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </Main>
    );
};

export default Hosts;