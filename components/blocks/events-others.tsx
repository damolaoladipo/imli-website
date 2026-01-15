"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CalendarBlank, LightbulbFilament } from '@phosphor-icons/react';

interface EventCardProps {
  date: number;
  month: string;
  title: string;
  link: string;
}

const EventCard: React.FC<EventCardProps> = ({ date, month, title, link }) => (
  <motion.div
    className="bg-accent rounded-xl p-6 flex items-center justify-between shadow-md"
    whileHover={{ scale: 1.02, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" }}
    transition={{ duration: 0.2 }}
  >
    <div className="flex items-center space-x-4">
      <div className="text-center">
        <span className="block text-4xl font-bold text-gray-900">{date}</span>
        <span className="block text-lg font-medium text-gray-700">{month}</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-600 mb-1">NEXT EVENTS</p>
        <h3 className="text-2xl font-bold text-gray-900 leading-tight">{title}</h3>
      </div>
    </div>
    <Link href={link} passHref>
      <motion.div
        className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-gray-800 cursor-pointer"
        whileHover={{ x: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <ArrowRight size={24} />
      </motion.div>
    </Link>
  </motion.div>
);

export default function OurEventsSection() {
  const events = [
    {
      date: 13,
      month: 'APR',
      title: 'A day with our wonderful children',
      link: '#event-children',
    },
    {
      date: 25,
      month: 'APR',
      title: 'Seminar: Caring for children with autism',
      link: '#event-autism',
    },
     {
      date: 14,
      month: 'APR',
      title: 'A day with our wonderful children',
      link: '#event-children',
    },
    {
      date: 24,
      month: 'APR',
      title: 'Seminar: Caring for children with autism',
      link: '#event-autism',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-primary/15 py-20 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-16 relative pb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          Our Events
          <span className="absolute left-0 bottom-0 w-24 h-1 bg-primary/15"></span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {events.map((event, index) => (
            <motion.div key={index} variants={itemVariants}>
              <EventCard {...event} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}