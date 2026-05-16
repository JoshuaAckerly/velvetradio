import AdminLayout from '@/layouts/admin';
import { router } from '@inertiajs/react';
import React from 'react';

interface Counts {
    shows: number;
    episodes: number;
    hosts: number;
}

const AdminIndex: React.FC<{ counts: Counts }> = ({ counts }) => (
    <AdminLayout title="Dashboard">
        <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>
        <div className="grid gap-4 sm:grid-cols-3">
            {[
                { label: 'Shows', count: counts.shows, href: '/admin/shows' },
                { label: 'Episodes', count: counts.episodes, href: '/admin/episodes' },
                { label: 'Hosts', count: counts.hosts, href: '/admin/hosts' },
            ].map(({ label, count, href }) => (
                <button
                    key={label}
                    onClick={() => router.visit(href)}
                    className="rounded-lg border border-[#3a3a3a] bg-[#1a1a1a] p-6 text-left transition-colors hover:border-[#4a3d5c]"
                >
                    <p className="text-4xl font-bold">{count}</p>
                    <p className="mt-1 text-[var(--muted-foreground,#888)]">{label}</p>
                </button>
            ))}
        </div>
    </AdminLayout>
);

export default AdminIndex;
