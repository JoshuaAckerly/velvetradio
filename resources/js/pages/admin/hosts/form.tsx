import AdminLayout from '@/layouts/admin';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';

interface ShowOption {
    id: number;
    title: string;
}

interface Host {
    id: number;
    name: string;
    bio: string | null;
    avatar: string | null;
    show_id: number;
}

interface HostFormProps {
    host: Host | null;
    shows: ShowOption[];
}

const HostForm: React.FC<HostFormProps> = ({ host, shows }) => {
    const editing = host !== null;
    const [form, setForm] = useState({
        name:    host?.name ?? '',
        bio:     host?.bio ?? '',
        avatar:  host?.avatar ?? '',
        show_id: host?.show_id ?? (shows[0]?.id ?? ''),
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const set = (field: string, value: string | number) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const options = {
            onError: (errs: Record<string, string>) => setErrors(errs),
        };

        if (editing) {
            router.put(`/admin/hosts/${host.id}`, form, options);
        } else {
            router.post('/admin/hosts', form, options);
        }
    };

    return (
        <AdminLayout title={editing ? 'Edit Host' : 'New Host'}>
            <h1 className="mb-6 text-2xl font-bold">{editing ? 'Edit Host' : 'New Host'}</h1>

            <form onSubmit={submit} className="max-w-lg space-y-4">
                <div>
                    <label className="mb-1 block text-sm font-medium">Name</label>
                    <input type="text" value={form.name} onChange={(e) => set('name', e.target.value)} className="admin-input" required />
                    {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Show</label>
                    <select value={form.show_id} onChange={(e) => set('show_id', e.target.value)} className="admin-input" required>
                        {shows.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
                    </select>
                    {errors.show_id && <p className="mt-1 text-sm text-red-400">{errors.show_id}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Bio</label>
                    <textarea value={form.bio} onChange={(e) => set('bio', e.target.value)} rows={3} className="admin-input" />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Avatar URL</label>
                    <input type="url" value={form.avatar} onChange={(e) => set('avatar', e.target.value)} className="admin-input" placeholder="https://…" />
                    {errors.avatar && <p className="mt-1 text-sm text-red-400">{errors.avatar}</p>}
                    {form.avatar && (
                        <img src={form.avatar} alt="Preview" className="mt-2 h-12 w-12 rounded-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                    )}
                </div>

                <div className="flex gap-3 pt-2">
                    <button type="submit" className="rounded bg-[#4a3d5c] px-6 py-2 font-medium text-white hover:bg-[#5c4a70]">
                        {editing ? 'Update Host' : 'Create Host'}
                    </button>
                    <button type="button" onClick={() => router.visit('/admin/hosts')} className="rounded border border-[#3a3a3a] px-6 py-2 text-sm hover:border-white">
                        Cancel
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
};

export default HostForm;
