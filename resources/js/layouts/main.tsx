import Footer from '@/components/footer';
import Header from '@/components/header';
import { router } from '@inertiajs/react';
import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const off1 = router.on('before', () => {
            if (overlayRef.current) gsap.fromTo(overlayRef.current, { opacity: 0, pointerEvents: 'none' }, { opacity: 1, pointerEvents: 'all', duration: 0.3, ease: 'power1.in' });
        });
        const off2 = router.on('finish', () => {
            if (overlayRef.current) gsap.to(overlayRef.current, { opacity: 0, pointerEvents: 'none', duration: 0.4, ease: 'power2.out', delay: 0.05 });
        });
        return () => { off1(); off2(); };
    }, []);

    return (
        <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--foreground)]">
            <div ref={overlayRef} className="pointer-events-none fixed inset-0 z-[9999] bg-[var(--background)] opacity-0" aria-hidden="true" />
            <Header />
            <main className="container flex-1 py-8">{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
