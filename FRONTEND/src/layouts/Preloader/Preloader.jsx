import React, { useState, useEffect } from 'react';
import './preloader.css'; // Assuming you put the CSS into a separate file named Preloader.css

const Preloader = () => {
    const [loading, setLoading] = useState(true);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const handleLoad = () => {
            setTimeout(() => {
                setFade(true);
                setTimeout(() => {
                    setLoading(false);
                    document.body.classList.remove('preloader-active');
                }, 500); // Match the CSS transition duration
            }, 3000);
        };

        window.addEventListener('load', handleLoad);
        document.body.classList.add('preloader-active'); // Add preloader-active class to body on mount

        return () => {
            window.removeEventListener('load', handleLoad);
            document.body.classList.remove('preloader-active'); // Clean up the class if component unmounts
        };
    }, []);

    return (
        <div className={`preloader-container ${fade ? 'fade-out' : ''}`}>
            {loading && <div id="pre-loader"></div>}
        </div>
    );
};

export default Preloader;
