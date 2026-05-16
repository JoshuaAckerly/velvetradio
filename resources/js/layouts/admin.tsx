import MainLayout from '@/layouts/main';
import { router } from '@inertiajs/react';
import React from 'react';

interface AdminLayoutProps {
    title: string;
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ title, children }) => (
    <MainLayout>
        <div className="mx-auto max-w-5xl">
            <div className="mb-6 flex items-center gap-2 text-sm text-[var(--muted-foreground,#888)]">
                <button
                    onClick={() => router.visit('/admin')}
                    className="transition-colors hover:text-white"
                >
                    Admin
                </button>
                <span>/</span>
                <span className="text-white">{title}</span>
            </div>
            {children}
        </div>
    </MainLayout>
);

export default AdminLayout;
