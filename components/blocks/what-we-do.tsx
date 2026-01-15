 "use client"

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Users, FirstAid, GraduationCap, Brain } from '@phosphor-icons/react'; // Using Phosphor Icons

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

// Animation variants for individual text/detail elements
const itemVariants: Variants = {
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

// Animation variants for the image to scale in
const imageVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 10,
      delay: 0.3, // Delay image animation slightly
    },
  },
};

const ServiceItem = ({ icon: Icon, title, description }: {
    icon: React.ElementType;
    title: string;
    description: string;
}) => {
    return (
        <motion.div variants={itemVariants} className="flex items-start gap-4">
            <div className="shrink-0 p-3 rounded-full bg-black text-white">
                <Icon weight="bold" className="w-6 h-6" />
            </div>
            <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>
                <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
};

export default function WhatwedoSection() {
    const services = [
        {
            icon: Users,
            title: 'Leadership Development:',
            description: 'Training and mentorship to build ethical, visionary leaders.',
        },
        {
            icon: FirstAid, // Changed from Health benefits to FirstAid for a clearer icon
            title: 'Civic Engagement',
            description: 'Promoting active citizenship, volunteerism, advocacy for good governance and community engagement. ',
        },
        {
            icon: GraduationCap,
            title: 'Entrepreneurship & Innovation',
            description: 'Supporting creative ideas, startups, and sustainable businesses that drive economic growth.',
        },
        {
            icon: Brain, // Changed from Therapy to Brain for a clearer icon representing mental/cognitive support
            title: 'Community Impact Projects:',
            description: 'Tackling local challenges through education, health, environment, and social development initiatives.',
        },
    ];

    return (
        <motion.section
            className="bg-primary py-20 sm:py-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content: Text and Service Items */}
                    <div className="lg:pr-12">
                        <motion.div variants={itemVariants} className="flex items-center mb-6">
                            <hr className="w-12 border-t border-black mr-4" />
                            <p className="text-sm font-semibold uppercase tracking-widest text-black">WHAT WE DO</p>
                        </motion.div>

                        <motion.h2 variants={itemVariants} className="text-2xl sm:text-4xl font-extrabold text-foreground leading-tight">
                            YALI LAGOS NETWORK key area of focus.
                        </motion.h2>

                        <motion.p variants={itemVariants} className="text-lg text-gray-700 max-w-md mb-12">
                             We are young leaders working together to create a better Nigeria.
                        </motion.p>

                        <div className="space-y-8">
                            {services.map((service, index) => (
                                <ServiceItem
                                    key={index}
                                    icon={service.icon}
                                    title={service.title}
                                    description={service.description}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Content: Image */}
                    <motion.div
                        variants={imageVariants}
                        className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-xl"
                    >
                        <Image
                            src="/blocks/what we do.jpeg" // You'll need to replace this with your actual image path
                            alt="Child with headphones"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-2xl"
                        />
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}

// NOTE: You'll need to install the dependencies:
// npm install framer-motion @phosphor-icons/react