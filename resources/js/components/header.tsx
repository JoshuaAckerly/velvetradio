import React from 'react';


const Header: React.FC = () => {
    return (
        <header className="site-header">
            <div className="container flex items-center gap-6 px-4 py-4">
                <div className="flex items-center gap-3">
                    <a href="/" aria-label="Velvet Radio Home" className="text-2xl font-semibold">Velvet Radio</a>
                </div>

                <nav className="flex-1" aria-label="Main navigation">
                    <ul className="flex gap-6 justify-end items-center text-base">
                        <li><a href="/" className="hover:text-[#4a3d5c] transition-colors">Home</a></li>
                        <li><a href="/shows" className="hover:text-[#4a3d5c] transition-colors">Shows</a></li>
                        <li><a href="/hosts" className="hover:text-[#4a3d5c] transition-colors">Hosts</a></li>
                        <li><a href="/episodes" className="hover:text-[#4a3d5c] transition-colors">Episodes</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
