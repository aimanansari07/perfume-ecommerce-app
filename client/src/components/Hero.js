import React from 'react';

function Hero() {
    return (
        <section className="hero">
            {/* Background Video */}
            <video 
                className="hero-video" 
                src="/background-video.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
            />

            {/* Overlay */}
            <div className="hero-overlay"></div>

            {/* Foreground Content */}
            <div className="hero-content">
                <h1>Elegance in Every Drop</h1>
                <p>Experience a world of exquisite fragrances, crafted with the finest ingredients to captivate your senses.</p>
                <button className="cta-button">Explore Collection</button>
            </div>
        </section>
    );
}

export default Hero;