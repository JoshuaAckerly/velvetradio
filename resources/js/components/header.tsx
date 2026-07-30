import MobileMenu from '@/components/MobileMenu';
import NotificationBell from '@/components/NotificationBell';
import { Link } from '@inertiajs/react';
import React from 'react';
import { getLoginUrl } from '../env';

const Header: React.FC = () => {
    return (
        <header className="site-header">
            <div className="container flex items-center gap-6 px-4 py-4">
                <div className="flex items-center gap-3">
                    <Link href="/" aria-label="Velvet Radio Home" className="flex items-center gap-2.5 text-2xl font-semibold">
                        <svg viewBox="0 0 48 48" className="h-8 w-8 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path d="M10 34 Q24 8 38 34" stroke="#9b4dca" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                            <path d="M16 34 Q24 16 32 34" stroke="#9b4dca" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                            <circle cx="24" cy="34" r="3" fill="#9b4dca"/>
                        </svg>
                        Velvet Radio
                    </Link>
                </div>

                {/* Desktop nav */}
                <nav className="hidden flex-1 md:flex" aria-label="Main navigation">
                    <ul className="flex w-full items-center justify-end gap-6 text-base">
                        <li>
                            <Link href="/" className="transition-colors hover:text-[#4a3d5c]">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/shows" className="transition-colors hover:text-[#4a3d5c]">
                                Shows
                            </Link>
                        </li>
                        <li>
                            <Link href="/hosts" className="transition-colors hover:text-[#4a3d5c]">
                                Hosts
                            </Link>
                        </li>
                        <li>
                            <Link href="/episodes" className="transition-colors hover:text-[#4a3d5c]">
                                Episodes
                            </Link>
                        </li>
                        <li>
                            <Link href="/schedule" className="transition-colors hover:text-[#4a3d5c]">
                                Schedule
                            </Link>
                        </li>
                        <li>
                            <a href={getLoginUrl('velvetradio')} className="transition-colors hover:text-[#4a3d5c]">
                                Login
                            </a>
                        </li>
                        <li>
                            <NotificationBell />
                        </li>
                    </ul>
                </nav>

                {/* Mobile nav */}
                <div className="ml-auto md:hidden">
                    <MobileMenu />
                </div>
            </div>
        </header>
    );
};

export default Header;
