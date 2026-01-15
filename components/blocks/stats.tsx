"use client"

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { NotePencil, Handshake, Users, Leaf } from '@phosphor-icons/react'; // Phosphor Icons

// --- Framer Motion Variants ---
const containerVariants = {
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
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

// --- Stat Card Component ---
interface StatCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, description }) => {
  return (
    <motion.div
      className="flex flex-col items-start p-6 rounded-lg bg-white/5"
      variants={itemVariants}
    >
      <div className="flex items-center space-x-3 mb-3">
        <Icon size={32} weight="fill" className="text-gray-800" /> {/* Phosphor Icon */}
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{label}</h3>
      <p className="text-base text-gray-600">{description}</p>
    </motion.div>
  );
};

// --- Main Stats Section Component ---
export default function StatsSection() {
  const stats = [
    {
      icon: NotePencil,
      value: '20+',
      label: 'orphanage visit in 2 months',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
    },
    {
      icon: Handshake,
      value: '230',
      label: 'People Have donated',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
    },
    {
      icon: Users,
      value: '30+',
      label: 'people joined',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
    },
    {
      icon: Leaf,
      value: '1.2m',
      label: 'Raised for this initiate',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
    },
  ];

  return (
    <section className="bg-[#fcf7e6] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              description={stat.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}