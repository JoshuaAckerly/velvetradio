import { Link } from '@inertiajs/react';
import React, { MouseEvent, useState } from 'react';
import { getLoginUrl } from '../env';

const MobileMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            {/* Hamburger Button */}
            <button onClick={toggleMenu} aria-label="Toggle Menu" aria-expanded={isOpen} className="relative z-[9999] focus:outline-none">
                <div className="space-y-2">
                    <span className={`block h-0.5 w-7 bg-current transition-transform ${isOpen ? 'translate-y-[10px] rotate-45' : ''}`} />
                    <span className={`block h-0.5 w-7 bg-current transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                    <span className={`block h-0.5 w-7 bg-current transition-transform ${isOpen ? '-translate-y-[10px] -rotate-45' : ''}`} />
                </div>
            </button>

            {/* Fullscreen Modal Menu */}
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-[9990] bg-[var(--background)] opacity-90 backdrop-blur-md" onClick={() => setIsOpen(false)} />

                    {/* Menu */}
                    <nav className="fixed inset-0 z-[9995] flex items-center justify-center" aria-label="Mobile navigation">
                        <ul className="flex flex-col space-y-4 text-center text-lg font-semibold">
                            <li>
                                <Link className="transition-colors hover:text-[#4a3d5c]" href="/" onClick={() => setIsOpen(false)}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link className="transition-colors hover:text-[#4a3d5c]" href="/shows" onClick={() => setIsOpen(false)}>
                                    Shows
                                </Link>
                            </li>
                            <li>
                                <Link className="transition-colors hover:text-[#4a3d5c]" href="/hosts" onClick={() => setIsOpen(false)}>
                                    Hosts
                                </Link>
                            </li>
                            <li>
                                <Link className="transition-colors hover:text-[#4a3d5c]" href="/episodes" onClick={() => setIsOpen(false)}>
                                    Episodes
                                </Link>
                            </li>
                            <li>
                                <a
                                    className="transition-colors hover:text-[#4a3d5c]"
                                    href={getLoginUrl('velvetradio')}
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </a>
                            </li>
                        </ul>
                    </nav>
                </>
            )}
        </div>
    );
};

export default MobileMenu;
