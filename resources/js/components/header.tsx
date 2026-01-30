
import React from 'react';
import { Link } from '@inertiajs/react';
import { getLoginUrl } from '../env';

const Header: React.FC = () => {
    return (
        <header className="site-header">
            <div className="container flex items-center gap-6 px-4 py-4">
                <div className="flex items-center gap-3">
                    <Link href="/" aria-label="Velvet Radio Home" className="text-2xl font-semibold">Velvet Radio</Link>
                </div>

                <nav className="flex-1" aria-label="Main navigation">
                    <ul className="flex gap-6 justify-end items-center text-base">
                        <li><Link href="/" className="hover:text-[#4a3d5c] transition-colors">Home</Link></li>
                        <li><Link href="/shows" className="hover:text-[#4a3d5c] transition-colors">Shows</Link></li>
                        <li><Link href="/hosts" className="hover:text-[#4a3d5c] transition-colors">Hosts</Link></li>
                        <li><Link href="/episodes" className="hover:text-[#4a3d5c] transition-colors">Episodes</Link></li>
                        <li><a href={getLoginUrl('velvetradio')} className="hover:text-[#4a3d5c] transition-colors">Login</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
