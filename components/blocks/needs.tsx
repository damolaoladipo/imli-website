 "use client"

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  UsersThree, // Family support
  FirstAidKit, // Health benefits
  GraduationCap, // Education
  House, // Basic amenities (or Bed, or similar home-related)
  Heartbeat, // Therapy (or Brain, or similar health/wellness related)
  MegaphoneSimple // Public outreach
} from '@phosphor-icons/react'; // Phosphor Icons

// --- Framer Motion Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

// --- Feature Card Component ---
interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      className="flex items-start space-x-4 p-4" // Removed hover/background to match image
      variants={itemVariants}
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        <Icon size={28} weight="fill" className="text-gray-800" /> {/* Phosphor Icon */}
      </div>
      
      {/* Text Content */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-base text-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

// --- Main Section Component ---
export default function SpecialNeedsServices() {
  const services = [
    {
      icon: UsersThree,
      title: 'Family support',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
    },
    {
      icon: FirstAidKit,
      title: 'Health benefits',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
    },
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
    },
    {
      icon: House,
      title: 'Basic amenities',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
    },
    {
      icon: Heartbeat,
      title: 'Therapy',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
    },
    {
      icon: MegaphoneSimple,
      title: 'Public outreach',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
    },
  ];

  return (
    <section className="bg-[#fcf7e6] py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-16 max-w-2xl"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          What we do for our kids with special needs
        </motion.h2>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {services.map((service, index) => (
            <FeatureCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
