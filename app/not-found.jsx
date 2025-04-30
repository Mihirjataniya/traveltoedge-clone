import Link from "next/link";
import React from "react";

const animations = ["float", "floatReverse", "float2", "floatReverse2"];

const NotFound = () => {
    const particles = [];

    for (let i = 0; i < 80; i++) {
        const value = i < 40 ? "4" : "0";
        const size = Math.floor(Math.random() * 20) + 10;
        const blur = (i * 0.02).toFixed(2);
        const speed = Math.floor(Math.random() * 20) + 20;
        const delay = (Math.floor(Math.random() * 10) * 0.1).toFixed(1);
        const anim = animations[Math.floor(Math.random() * animations.length)];

        const style = {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            fontSize: `${size}px`,
            filter: `blur(${blur}px)`,
            animation: `${anim} ${speed}s infinite`,
            animationDelay: `${delay}s`,
        };

        particles.push(
            <span key={i} className="particle" style={style}>
                {value}
            </span>
        );
    }

    return (
        <main className="container">
            {particles}
            <article className="content">
                <p>Oops, traveler!</p>
                <p>
                    You've wandered off the map into the <strong>404</strong> unknown.
                </p>
                <p>
                    <Link className="return-btn" href={'/'}>Return to the journey</Link>
                </p>
            </article>
        </main>
    );
};

export default NotFound;
