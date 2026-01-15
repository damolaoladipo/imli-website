 "use client"

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

// Animation variants for the main container
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger the appearance of children
    },
  },
};

// Animation variants for text elements
const textVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

// Animation variants for the main founder image
const founderImageVariants: Variants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
        x: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 80,
            damping: 10,
            delay: 0.2,
        },
    },
};

// Animation variants for the founder profile cards
const cardVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 10,
        },
    },
};


interface Founder {
    name: string;
    image: string;
}

const FounderCard = ({ founder }: { founder: Founder }) => {
    return (
        <motion.div variants={cardVariants} className="flex-shrink-0 w-48 bg-white rounded-xl shadow-md overflow-hidden p-4 text-center">
            <div className="relative w-full h-32 rounded-lg overflow-hidden mb-3">
                <Image
                    src={founder.image}
                    alt={founder.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                />
            </div>
            <p className="text-gray-800 font-medium text-lg">{founder.name}</p>
        </motion.div>
    );
};

export default function FoundersSection() {
    const founders: Founder[] = [
        { name: 'Ella Browson', image: '/founders/ella-browson.jpg' }, // Replace with actual paths
        { name: 'James Ferell', image: '/founders/james-ferell.jpg' },
        { name: 'Ella Browson', image: '/founders/ella-browson-2.jpg' },
        { name: 'John Doe', image: '/founders/john-doe.jpg' },
        { name: 'Jane Smith', image: '/founders/jane-smith.jpg' },
    ];

    return (
        <motion.section
            className="bg-white py-20 sm:py-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Section Header */}
                <motion.div variants={textVariants} className="text-center mb-16">
                    <p className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-2">MEET THE TEAM</p>
                    <h2 className="text-5xl font-medium text-gray-900 leading-tight">Great founders</h2>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center gap-16">
                    {/* Main Founder Image and Quote */}
                    <div className="relative lg:w-1/2 flex justify-center items-center">
                        <motion.div
                            variants={founderImageVariants}
                            className="relative w-[350px] h-[450px] sm:w-[450px] sm:h-[550px] rounded-[3rem] overflow-hidden z-10"
                        >
                            <Image
                                src="/sarah-uzodimma-adewoye.jpg" // Replace with actual image path
                                alt="Sarah Uzodimma Adewoye (CEO)"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-[3rem]"
                            />
                        </motion.div>
                        {/* Background blob/shape */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.5, type: 'spring', stiffness: 50 }}
                            className="absolute bg-emerald-100 rounded-full w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] -right-10 -bottom-10 opacity-70 blur-2xl"
                            style={{ filter: 'blur(70px)' }}
                        ></motion.div>
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.6, type: 'spring', stiffness: 50 }}
                            className="absolute bg-emerald-200 rounded-full w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] -left-10 -top-10 opacity-70 blur-2xl"
                             style={{ filter: 'blur(50px)' }}
                        ></motion.div>
                    </div>

                    {/* Right Content: Quote and Founder Carousel */}
                    <div className="lg:w-1/2">
                        <motion.p variants={textVariants} className="text-2xl text-gray-800 leading-relaxed mb-8 max-w-lg">
                            "With the huddles that motherhood can attract, I plan to be the rainbow on a rainy day. This is a purposefully driven entity that is set to support what motherliness encompasses."
                            <br />
                            <strong className="block mt-4 text-gray-900">- Sarah Uzodimma Adewoye (CEO)</strong>
                        </motion.p>

                        <motion.h3 variants={textVariants} className="text-3xl font-semibold text-gray-900 mb-6">
                            FOUNDERS
                        </motion.h3>

                        {/* Founders Carousel */}
                        <motion.div
                            className="relative flex items-center"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.2 }}
                            variants={containerVariants}
                        >
                            <button
                                aria-label="Previous founder"
                                className="absolute -left-12 p-3 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition-colors z-10"
                            >
                                <CaretLeft weight="bold" className="w-6 h-6 text-gray-700" />
                            </button>

                            <div className="flex overflow-x-auto gap-6 pb-4 no-scrollbar"> {/* Added no-scrollbar for visual cleanliness */}
                                {founders.map((founder, index) => (
                                    <FounderCard key={index} founder={founder} />
                                ))}
                            </div>

                            <button
                                aria-label="Next founder"
                                className="absolute -right-12 p-3 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition-colors z-10"
                            >
                                <CaretRight weight="bold" className="w-6 h-6 text-gray-700" />
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

// Custom CSS for hiding scrollbar (add to your global CSS or a CSS module)
// .no-scrollbar {
//     -ms-overflow-style: none;  /* IE and Edge */
//     scrollbar-width: none;  /* Firefox */
// }
// .no-scrollbar::-webkit-scrollbar {
//     display: none; /* Chrome, Safari, Opera */
// }

// NOTE: You'll need to install the dependencies:
// npm install framer-motion @phosphor-icons/react
