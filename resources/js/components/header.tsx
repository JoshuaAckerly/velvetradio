import React from 'react';


const Header: React.FC = () => {
    return (
        <div className=" bg-[#7d6b8d] font-serif text-black">
            {/* Header */}
            <header className="border-b border-black bg-[#a6ce39] px-6 py-4">
                <section className="flex items-center">
                    {/* Title */}
                    <h1 className="text-xl font-semibold">Velvet Radio</h1>

                    {/* Navigation */}
                    <nav className="flex-1">
                        <ul className="flex justify-evenly text-lg">
                            <li>
                                <a href="#" className="hover:underline">
                                    Episodes
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Submit
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </nav>
                </section>
            </header>

          
        </div>
    );
};

export default Header;
