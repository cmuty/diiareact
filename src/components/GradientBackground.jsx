import React from 'react';

export default function GradientBackground({ children }) {
    // No JS state needed for CSS-only animations now
    return (
        <>
            <div className="gradient-background">
                <div className="gradient-blob blob-1" />
                <div className="gradient-blob blob-2" />
                <div className="gradient-blob blob-3" />
                <div className="gradient-blob blob-4" />
            </div>
            {children}
        </>
    );
}
