
 "use client"

import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  UsersFour, // Family support
  Heartbeat, // Health benefits/Therapy
  GraduationCap, // Education
  HouseLine, // Basic amenities
  MegaphoneSimple, // Public outreach
} from '@phosphor-icons/react'; // Using Phosphor Icons

// Define the structure for a feature item
interface FeatureItem {
  icon: React.ElementType; // Type for Phosphor Icon component
  title: string;
  description: string;
}

// Data for the feature cards, organized by the image layout (2 rows of 3, with 1 item missing in the second row, then a final row of 3 in the original image)
// I'll consolidate this into a simple 3-column layout to match the visual presentation of the first and third rows.
const features: FeatureItem[] = [
  {
    icon: UsersFour,
    title: 'Family support',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
  },
  {
    icon: Heartbeat,
    title: 'Health benefits',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
  },
  {
    icon: HouseLine,
    title: 'Basic amenities',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
  },
  {
    icon: Heartbeat, // Reusing Heartbeat for Therapy
    title: 'Therapy',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
  },
  {
    icon: MegaphoneSimple,
    title: 'Public outreach',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
  },
  // The original image had "Basic amenities" and "Education" repeating in the middle block.
  // I've chosen to select the most unique features and present them consistently.
];


// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger the appearance of feature cards
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
};

// --- Feature Card Component ---
const FeatureCard: React.FC<FeatureItem> = ({ icon: Icon, title, description }) => (
  <motion.div
    variants={itemVariants}
    className="space-y-4 p-6"
  >
    <div className="flex items-center space-x-3">
      <Icon size={32} weight="fill" className="text-gray-900" />
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

// --- Main Component ---
export default function SpecialNeedsFeatures() {
  return (
    <section className="py-20 sm:py-32 bg-[#fdf8e6]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          What we do for our kids with special needs
        </motion.h2>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 lg:gap-x-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}