import Footer from '@/components/footer';
import Header from '@/components/header';
import React from 'react';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
            <Header />
            <main className="container flex-1 py-8">{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
