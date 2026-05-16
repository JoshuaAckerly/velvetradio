import AdminLayout from '@/layouts/admin';
import { router } from '@inertiajs/react';
import React, { useRef, useState } from 'react';

interface ShowOption {
    id: number;
    title: string;
}

interface Episode {
    id: number;
    title: string;
    description: string | null;
    show_id: number;
    published_at: string;
    duration: number | null;
    audio_file: string | null;
}

interface EpisodeFormProps {
    episode: Episode | null;
    shows: ShowOption[];
}

const EpisodeForm: React.FC<EpisodeFormProps> = ({ episode, shows }) => {
    const editing = episode !== null;
    const [form, setForm] = useState({
        title:        episode?.title ?? '',
        description:  episode?.description ?? '',
        show_id:      episode?.show_id ?? (shows[0]?.id ?? ''),
        published_at: episode?.published_at ?? new Date().toISOString().slice(0, 10),
        duration:     episode?.duration?.toString() ?? '',
    });
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const fileRef = useRef<HTMLInputElement>(null);

    const set = (field: string, value: string | number) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const data = new FormData();
        Object.entries(form).forEach(([k, v]) => data.append(k, String(v)));
        if (audioFile) data.append('audio_file', audioFile);
        if (editing) data.append('_method', 'PUT');

        const url = editing ? `/admin/episodes/${episode.id}` : '/admin/episodes';

        router.post(url, data, {
            onError: (errs) => setErrors(errs),
        });
    };

    return (
        <AdminLayout title={editing ? 'Edit Episode' : 'New Episode'}>
            <h1 className="mb-6 text-2xl font-bold">{editing ? 'Edit Episode' : 'New Episode'}</h1>

            <form onSubmit={submit} className="max-w-lg space-y-4" encType="multipart/form-data">
                <div>
                    <label className="mb-1 block text-sm font-medium">Title</label>
                    <input type="text" value={form.title} onChange={(e) => set('title', e.target.value)} className="admin-input" required />
                    {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Show</label>
                    <select value={form.show_id} onChange={(e) => set('show_id', e.target.value)} className="admin-input" required>
                        {shows.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
                    </select>
                    {errors.show_id && <p className="mt-1 text-sm text-red-400">{errors.show_id}</p>}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Description</label>
                    <textarea value={form.description} onChange={(e) => set('description', e.target.value)} rows={3} className="admin-input" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium">Published Date</label>
                        <input type="date" value={form.published_at} onChange={(e) => set('published_at', e.target.value)} className="admin-input" required />
                        {errors.published_at && <p className="mt-1 text-sm text-red-400">{errors.published_at}</p>}
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium">Duration (seconds)</label>
                        <input type="number" value={form.duration} onChange={(e) => set('duration', e.target.value)} className="admin-input" min={0} placeholder="e.g. 3600" />
                    </div>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Audio File</label>
                    {episode?.audio_file && !audioFile && (
                        <p className="mb-1 text-xs text-[var(--muted-foreground,#888)]">
                            Current: <span className="font-mono">{episode.audio_file.split('/').pop()}</span>
                            <span className="ml-2 text-yellow-400">(upload a new file to replace)</span>
                        </p>
                    )}
                    <input
                        ref={fileRef}
                        type="file"
                        accept="audio/mpeg,audio/wav,audio/ogg,audio/aac,audio/mp4"
                        onChange={(e) => setAudioFile(e.target.files?.[0] ?? null)}
                        className="block w-full text-sm text-[var(--muted-foreground,#888)] file:mr-3 file:rounded file:border-0 file:bg-[#3a3a3a] file:px-3 file:py-1 file:text-sm file:text-white"
                    />
                    {audioFile && <p className="mt-1 text-xs text-green-400">Selected: {audioFile.name}</p>}
                    {errors.audio_file && <p className="mt-1 text-sm text-red-400">{errors.audio_file}</p>}
                </div>

                <div className="flex gap-3 pt-2">
                    <button type="submit" className="rounded bg-[#4a3d5c] px-6 py-2 font-medium text-white hover:bg-[#5c4a70]">
                        {editing ? 'Update Episode' : 'Create Episode'}
                    </button>
                    <button type="button" onClick={() => router.visit('/admin/episodes')} className="rounded border border-[#3a3a3a] px-6 py-2 text-sm hover:border-white">
                        Cancel
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
};

export default EpisodeForm;
