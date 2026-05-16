import AdminLayout from '@/layouts/admin';
import { router } from '@inertiajs/react';
import React from 'react';

interface Show {
    id: number;
    title: string;
    slug: string;
    active: boolean;
    hosts_count: number;
    episodes_count: number;
}

const ShowsIndex: React.FC<{ shows: Show[] }> = ({ shows }) => {
    const destroy = (id: number) => {
        if (!confirm('Delete this show and all its episodes/hosts?')) return;
        router.delete(`/admin/shows/${id}`);
    };

    return (
        <AdminLayout title="Shows">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Shows</h1>
                <button onClick={() => router.visit('/admin/shows/create')} className="rounded bg-[#4a3d5c] px-4 py-2 text-sm font-medium text-white hover:bg-[#5c4a70]">
                    + New Show
                </button>
            </div>

            {shows.length === 0 ? (
                <p className="text-[var(--muted-foreground,#888)]">No shows yet.</p>
            ) : (
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-[#3a3a3a] text-left text-[var(--muted-foreground,#888)]">
                            <th className="pb-2 pr-4">Title</th>
                            <th className="pb-2 pr-4">Slug</th>
                            <th className="pb-2 pr-4">Hosts</th>
                            <th className="pb-2 pr-4">Episodes</th>
                            <th className="pb-2 pr-4">Active</th>
                            <th className="pb-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {shows.map((show) => (
                            <tr key={show.id} className="border-b border-[#2a2a2a]">
                                <td className="py-3 pr-4 font-medium">{show.title}</td>
                                <td className="py-3 pr-4 font-mono text-xs text-[var(--muted-foreground,#888)]">{show.slug}</td>
                                <td className="py-3 pr-4">{show.hosts_count}</td>
                                <td className="py-3 pr-4">{show.episodes_count}</td>
                                <td className="py-3 pr-4">
                                    <span className={`rounded px-2 py-0.5 text-xs font-semibold ${show.active ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-400'}`}>
                                        {show.active ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="py-3 text-right">
                                    <button onClick={() => router.visit(`/admin/shows/${show.id}/edit`)} className="mr-3 text-[#4a3d5c] hover:text-white">Edit</button>
                                    <button onClick={() => destroy(show.id)} className="text-red-500 hover:text-red-300">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </AdminLayout>
    );
};

export default ShowsIndex;
