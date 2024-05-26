import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";

export function ImageGallery({ media }) {
    const [isOpen, setIsOpen] = useState(false);
    const [slides, setSlides] = useState([]);

    const images = media ? media.map(item => ({
        src: item.url,
        alt: item.alt,
        width: 800,
        height: 600,
        srcSet: [{ src: item.url, width: 800, height: 600 }]
    })) : [];

    const handleClick = index => {
        const newSlides = [images[index], ...images.slice(0, index), ...images.slice(index + 1)];
        setSlides(newSlides);
        setIsOpen(true);
    };

    return (
        <div>
            {images.map((image, index) => (
                index === 0 ? (
                    <div key={index} className="w-full">
                        <button onClick={() => handleClick(index)}>
                            <img
                                className="object-cover w-full h-96"
                                src={image.src}
                                alt={image.alt}
                            />
                        </button>
                    </div>
                ) : (
                    <div key={index} className="w-1/4">
                        <button onClick={() => handleClick(index)}>
                            <img
                                className="object-cover w-full h-16"
                                src={image.src}
                                alt={image.alt}
                            />
                        </button>
                    </div>
                )
            ))}

            {isOpen && (
                <Lightbox
                    open={isOpen}
                    close={() => setIsOpen(false)}
                    slides={slides}
                />
            )}
        </div>
    );
}