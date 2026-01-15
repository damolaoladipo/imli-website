"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FacebookLogo, TwitterLogo, LinkedinLogo } from '@phosphor-icons/react'; // Phosphor Icons

interface TeamMemberProps {
  name: string;
  role: string;
  imageUrl: string;
  facebookUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const TeamMemberCard: React.FC<TeamMemberProps> = ({
  name,
  role,
  imageUrl,
  facebookUrl,
  twitterUrl,
  linkedinUrl,
}) => (
  <motion.div
    className="bg-white rounded-lg shadow-md overflow-hidden text-center p-6 flex flex-col items-center"
    variants={itemVariants}
    whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
  >
    <div className="relative w-32 h-32 mb-6">
      <Image
        src={imageUrl}
        alt={name}
        layout="fill"
        objectFit="cover"
        className="rounded-full border-4 border-gray-200"
      />
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
    <p className="text-gray-600 mb-4">{role}</p>
    <div className="flex space-x-4">
      {facebookUrl && (
        <Link href={facebookUrl} passHref target="_blank" rel="noopener noreferrer">
          <FacebookLogo size={24} className="text-gray-500 hover:text-blue-600 transition-colors" />
        </Link>
      )}
      {twitterUrl && (
        <Link href={twitterUrl} passHref target="_blank" rel="noopener noreferrer">
          <TwitterLogo size={24} className="text-gray-500 hover:text-blue-400 transition-colors" />
        </Link>
      )}
      {linkedinUrl && (
        <Link href={linkedinUrl} passHref target="_blank" rel="noopener noreferrer">
          <LinkedinLogo size={24} className="text-gray-500 hover:text-blue-700 transition-colors" />
        </Link>
      )}
    </div>
  </motion.div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function TeamSection() {
  const teamMembers: TeamMemberProps[] = [
    {
      name: 'Leonard John Davies',
      role: 'Cofounder, CEO',
      imageUrl: '/blocks/hero-image.png',
      facebookUrl: '#',
      twitterUrl: '#',
      linkedinUrl: '#',
    },
    {
      name: 'Francis Weber',
      role: 'Vice Chairman',
      imageUrl: '/blocks/hero-image.png',
      facebookUrl: '#',
      twitterUrl: '#',
      linkedinUrl: '#',
    },
    {
      name: 'Kyla Obrien',
      role: 'Head of Authority',
      imageUrl: '/blocks/hero-image.png',
      facebookUrl: '#',
      twitterUrl: '#',
      linkedinUrl: '#',
    },
    {
      name: 'Adrian Dixon',
      role: 'Support Executive',
      imageUrl: '/blocks/hero-image.png',
      facebookUrl: '#',
      twitterUrl: '#',
      linkedinUrl: '#',
    },
    {
      name: 'Freddy Busby',
      role: 'Project Manager',
      imageUrl: '/blocks/hero-image.png',
      facebookUrl: '#',
      twitterUrl: '#',
      linkedinUrl: '#',
    },
    {
      name: 'Dale Banks',
      role: 'Accountant, Finance',
      imageUrl: '/blocks/hero-image.png',
      facebookUrl: '#',
      twitterUrl: '#',
      linkedinUrl: '#',
    },
    {
      name: 'Miriam Middleton',
      role: 'Cofounder, CEO',
      imageUrl: '/blocks/hero-image.png',
      facebookUrl: '#',
      twitterUrl: '#',
      linkedinUrl: '#',
    },
    {
      name: 'Ellen Walton',
      role: 'Vice Chairman',
      imageUrl: '/blocks/hero-image.png',
      facebookUrl: '#',
      twitterUrl: '#',
      linkedinUrl: '#',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Meet our team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
          </p>
        </motion.div>

        {/* Team Members Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.name} {...member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}