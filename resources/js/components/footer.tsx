import React from 'react';

const Footer: React.FC = () => (
    <footer className="site-footer">
        <div className="container text-center">
            <p className="muted">&copy; {new Date().getFullYear()} Velvet Radio. All rights reserved.</p>
        </div>
    </footer>
);

export default Footer;