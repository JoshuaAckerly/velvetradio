import React from 'react';

interface SocialShareProps {
    url: string;
    title: string;
    description?: string;
}

const TwitterIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const FacebookIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const LinkIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
);

const SocialShare: React.FC<SocialShareProps> = ({ url, title, description = '' }) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);

    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(url);
        } catch {
            // fallback: select text in a temporary input
            const input = document.createElement('input');
            input.value = url;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
        }
    };

    return (
        <div className="flex items-center gap-3" aria-label="Share this episode">
            <span className="text-sm text-gray-400">Share:</span>
            <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                aria-label="Share on X (Twitter)"
                title="Share on X (Twitter)"
            >
                <TwitterIcon />
            </a>
            <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                aria-label="Share on Facebook"
                title="Share on Facebook"
            >
                <FacebookIcon />
            </a>
            <button
                type="button"
                onClick={copyLink}
                className="rounded p-1.5 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                aria-label="Copy link to clipboard"
                title="Copy link"
            >
                <LinkIcon />
            </button>
        </div>
    );
};

export default SocialShare;
