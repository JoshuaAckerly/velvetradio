import AdminLayout from '@/layouts/admin';
import { router } from '@inertiajs/react';
import React from 'react';

interface Host {
    id: number;
    name: string;
    bio: string | null;
    avatar: string | null;
    show: { id: number; title: string } | null;
}

const HostsIndex: React.FC<{ hosts: Host[] }> = ({ hosts }) => {
    const destroy = (id: number) => {
        if (!confirm('Delete this host?')) return;
        router.delete(`/admin/hosts/${id}`);
    };

    return (
        <AdminLayout title="Hosts">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Hosts</h1>
                <button onClick={() => router.visit('/admin/hosts/create')} className="rounded bg-[#4a3d5c] px-4 py-2 text-sm font-medium text-white hover:bg-[#5c4a70]">
                    + New Host
                </button>
            </div>

            {hosts.length === 0 ? (
                <p className="text-[var(--muted-foreground,#888)]">No hosts yet.</p>
            ) : (
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-[#3a3a3a] text-left text-[var(--muted-foreground,#888)]">
                            <th className="pb-2 pr-4">Name</th>
                            <th className="pb-2 pr-4">Show</th>
                            <th className="pb-2 pr-4">Bio</th>
                            <th className="pb-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {hosts.map((host) => (
                            <tr key={host.id} className="border-b border-[#2a2a2a]">
                                <td className="py-3 pr-4 font-medium">
                                    <div className="flex items-center gap-2">
                                        {host.avatar && (
                                            <img src={host.avatar} alt={host.name} className="h-7 w-7 rounded-full object-cover" />
                                        )}
                                        {host.name}
                                    </div>
                                </td>
                                <td className="py-3 pr-4 text-[var(--muted-foreground,#888)]">{host.show?.title ?? '—'}</td>
                                <td className="max-w-xs py-3 pr-4 truncate text-[var(--muted-foreground,#888)]">{host.bio ?? '—'}</td>
                                <td className="py-3 text-right">
                                    <button onClick={() => router.visit(`/admin/hosts/${host.id}/edit`)} className="mr-3 text-[#4a3d5c] hover:text-white">Edit</button>
                                    <button onClick={() => destroy(host.id)} className="text-red-500 hover:text-red-300">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </AdminLayout>
    );
};

export default HostsIndex;
