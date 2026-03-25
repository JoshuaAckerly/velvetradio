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
                    <Link href="/" aria-label="Velvet Radio Home" className="text-2xl font-semibold">
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
