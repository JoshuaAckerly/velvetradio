import AdminLayout from '@/layouts/admin';
import { router } from '@inertiajs/react';
import React, { useState } from 'react';

interface Show {
    id: number;
    title: string;
    description: string;
    slug: string;
    active: boolean;
}

interface ShowFormProps {
    show: Show | null;
}

const ShowForm: React.FC<ShowFormProps> = ({ show }) => {
    const editing = show !== null;
    const [form, setForm] = useState({
        title: show?.title ?? '',
        description: show?.description ?? '',
        slug: show?.slug ?? '',
        active: show?.active ?? true,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const set = (field: string, value: string | boolean) => setForm((prev) => ({ ...prev, [field]: value }));

    const autoSlug = async (title: string) => {
        if (editing) return; // don't overwrite on edit
        const res = await fetch('/admin/shows/slug', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content ?? '',
            },
            body: JSON.stringify({ title }),
        });
        const data = (await res.json()) as { slug: string };
        set('slug', data.slug);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const options = {
            onError: (errs: Record<string, string>) => setErrors(errs),
        };

        if (editing) {
            router.put(`/admin/shows/${show.id}`, form, options);
        } else {
            router.post('/admin/shows', form, options);
        }
    };

    return (
        <AdminLayout title={editing ? 'Edit Show' : 'New Show'}>
            <h1 className="mb-6 text-2xl font-bold">{editing ? 'Edit Show' : 'New Show'}</h1>

            <form onSubmit={submit} className="max-w-lg space-y-4">
                <div>
                    <label className="mb-1 block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => {
                            set('title', e.target.value);
                            void autoSlug(e.target.value);
                        }}
                        className="admin-input"
                        required
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Slug</label>
                    <input type="text" value={form.slug} onChange={(e) => set('slug', e.target.value)} className="admin-input font-mono" required />
                    {errors.slug && <p className="mt-1 text-sm text-red-400">{errors.slug}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Description</label>
                    <textarea
                        value={form.description}
                        onChange={(e) => set('description', e.target.value)}
                        rows={4}
                        className="admin-input"
                        required
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
                </div>

                <div className="flex items-center gap-2">
                    <input id="active" type="checkbox" checked={form.active} onChange={(e) => set('active', e.target.checked)} className="h-4 w-4" />
                    <label htmlFor="active" className="text-sm font-medium">
                        Active
                    </label>
                </div>

                <div className="flex gap-3 pt-2">
                    <button type="submit" className="rounded bg-[#4a3d5c] px-6 py-2 font-medium text-white hover:bg-[#5c4a70]">
                        {editing ? 'Update Show' : 'Create Show'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.visit('/admin/shows')}
                        className="rounded border border-[#3a3a3a] px-6 py-2 text-sm hover:border-white"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
};

export default ShowForm;
