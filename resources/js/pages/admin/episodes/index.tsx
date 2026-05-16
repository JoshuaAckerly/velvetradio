import AdminLayout from '@/layouts/admin';
import { router } from '@inertiajs/react';
import React from 'react';

interface Episode {
    id: number;
    title: string;
    duration: number | null;
    published_at: string;
    audio_file: string | null;
    show: { id: number; title: string } | null;
}

const EpisodesIndex: React.FC<{ episodes: Episode[] }> = ({ episodes }) => {
    const destroy = (id: number) => {
        if (!confirm('Delete this episode?')) return;
        router.delete(`/admin/episodes/${id}`);
    };

    const fmt = (seconds: number | null) => {
        if (!seconds) return '—';
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${String(s).padStart(2, '0')}`;
    };

    return (
        <AdminLayout title="Episodes">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Episodes</h1>
                <button
                    onClick={() => router.visit('/admin/episodes/create')}
                    className="rounded bg-[#4a3d5c] px-4 py-2 text-sm font-medium text-white hover:bg-[#5c4a70]"
                >
                    + New Episode
                </button>
            </div>

            {episodes.length === 0 ? (
                <p className="text-[var(--muted-foreground,#888)]">No episodes yet.</p>
            ) : (
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-[#3a3a3a] text-left text-[var(--muted-foreground,#888)]">
                            <th className="pr-4 pb-2">Title</th>
                            <th className="pr-4 pb-2">Show</th>
                            <th className="pr-4 pb-2">Duration</th>
                            <th className="pr-4 pb-2">Published</th>
                            <th className="pr-4 pb-2">Audio</th>
                            <th className="pb-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {episodes.map((ep) => (
                            <tr key={ep.id} className="border-b border-[#2a2a2a]">
                                <td className="py-3 pr-4 font-medium">{ep.title}</td>
                                <td className="py-3 pr-4 text-[var(--muted-foreground,#888)]">{ep.show?.title ?? '—'}</td>
                                <td className="py-3 pr-4">{fmt(ep.duration)}</td>
                                <td className="py-3 pr-4">{ep.published_at}</td>
                                <td className="py-3 pr-4">
                                    <span
                                        className={`rounded px-2 py-0.5 text-xs font-semibold ${ep.audio_file ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-400'}`}
                                    >
                                        {ep.audio_file ? '✓ File' : 'No file'}
                                    </span>
                                </td>
                                <td className="py-3 text-right">
                                    <button
                                        onClick={() => router.visit(`/admin/episodes/${ep.id}/edit`)}
                                        className="mr-3 text-[#4a3d5c] hover:text-white"
                                    >
                                        Edit
                                    </button>
                                    <button onClick={() => destroy(ep.id)} className="text-red-500 hover:text-red-300">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </AdminLayout>
    );
};

export default EpisodesIndex;
