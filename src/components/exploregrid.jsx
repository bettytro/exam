import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function ExploreGrid({ griddata }) {
    // eslint-disable-next-line
    const [loadedIndices, setLoadedIndices] = useState([]);

    const handleImageLoad = (index) => {
        setLoadedIndices((prevIndices) => [...prevIndices, index]);
    };

    const variants = {
        hidden: { opacity: 0, y: 50 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.1,
                when: "beforeChildren",
                staggerChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <section className="bg-primary text-sec w-screen">
            <div className="mx-auto w-full max-w-[1600px] p-8 py-16 flex flex-col">

                <h2 className="text-title text-4xl font-black my-8">
                    Explore Venues
                </h2>
                <div>
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-6 gap-2"
                        variants={variants}
                        initial="hidden"
                        animate="show"
                    >
                        {griddata &&
                            griddata.map((listing, index) => (
                                listing.media[0]?.url && (
                                    <Link to={`/venues/${listing.id}`} key={index}>
                                        <motion.div
                                            className="col-span-1 w-full relative pb-[56.25%] group"
                                            variants={item}
                                            onLoad={() => handleImageLoad(index)}
                                        >
                                            <img
                                                className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-100 ease-in-out"
                                                src={listing.media[0].url}
                                                alt={listing.media[0].alt}
                                                loading="lazy"
                                            />
                                        </motion.div>
                                    </Link>
                                )
                            ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default ExploreGrid;