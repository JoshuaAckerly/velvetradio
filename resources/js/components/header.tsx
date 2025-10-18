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
                        <li><a href="#" className="hover:underline">Episodes</a></li>
                        <li><a href="#" className="hover:underline">About</a></li>
                        <li><a href="#" className="hover:underline">Submit</a></li>
                        <li><a href="#" className="hover:underline">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
