 "use client"

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, CalendarBlank } from '@phosphor-icons/react'; // Phosphor Icons

// Animation variants for staggered appearance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function BlogPost() {
  return (
    <article className="max-w-4xl mx-auto py-16 px-6 lg:px-8">
      <motion.div
        className="text-center mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6"
          variants={itemVariants}
        >
          A day with our wonderful children
        </motion.h1>

        {/* Metadata */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4 text-gray-600 text-sm"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-500" weight="bold" />
            <span>Oppo Opolo round about, Yenagoa, Bayelsa, Nigeria</span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarBlank className="w-4 h-4 text-gray-500" weight="bold" />
            <span>April 13, 2022 8:30 AM</span>
          </div>
        </motion.div>
      </motion.div>

      {/* About Section */}
      <motion.section
        className="mb-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6"
          variants={itemVariants}
        >
          About
        </motion.h2>
        <motion.p
          className="text-lg text-gray-700 leading-relaxed mb-6"
          variants={itemVariants}
        >
          Et morbi vitae lobortis nam odio. Faucibus vitae vel neque nullam in in lorem platea mattis. Euismod aenean rhoncus scelerisque amet tincidunt scelerisque aliquam. Luctus porttitor elit vel sapien, accumsan et id ut est. Posuere molestie in turpis quam. Scelerisque in viverra mi ut quisque. In sollicitudin sapien, vel nulla quisque vitae. Scelerisque eget accumsan, non in. Posuere magna erat bibendum amet, nisi eu id.
        </motion.p>
        <motion.p
          className="text-lg text-gray-700 leading-relaxed"
          variants={itemVariants}
        >
          Viverra at diam nunc non ornare. Sed ultricies pulvinar nunc, lacus sem. Tellus aliquam ut euismod cursus dui lectus. Ut amet, cras volutpat dui. A bibendum viverra eu cras. Mauris morbi sed dignissim a in nec aliquam fringilla et. Mattis elit dignissim nibh sit. Donec arcu sed elit scelerisque tempor ornare tristique. Integer faucibus duis praesent tempor feugiat ornare in. Erat libero egestas porttitor nunc pellentesque mauris et pulvinar eget.
        </motion.p>
      </motion.section>

      {/* Image Section */}
      <motion.div
        className="mb-12"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Image
          src="/path-to-your-image.jpg" // Replace with the actual path to your image
          alt="Group of happy children"
          width={800} // Adjust width as needed for your layout
          height={500} // Adjust height as needed, maintaining aspect ratio
          layout="responsive" // Makes the image responsive within its parent container
          className="rounded-lg shadow-lg"
        />
      </motion.div>

      {/* Second Paragraph */}
      <motion.p
        className="text-lg text-gray-700 leading-relaxed"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Et morbi vitae lobortis nam odio. Faucibus vitae vel neque nullam in in lorem platea mattis. Euismod aenean rhoncus scelerisque amet tincidunt scelerisque aliquam. Luctus porttitor elit vel sapien, accumsan et id ut est. Posuere molestie in turpis quam. Scelerisque in viverra mi ut quisque. In sollicitudin sapien, vel nulla quisque vitae. Scelerisque eget accumsan, non in. Posuere magna erat bibendum amet, nisi eu id.
      </motion.p>
    </article>
  );
}