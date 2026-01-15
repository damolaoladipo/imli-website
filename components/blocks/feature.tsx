 "use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { CaretRight } from '@phosphor-icons/react'; // Using Phosphor Icons for caret

// Assuming you have a standard Button component in your project
import { Button } from '@/components/ui/button'; 

// --- Framer Motion Variants ---
const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2, // Delay main container animation slightly after header
      staggerChildren: 0.15, // Stagger animation for the individual news cards
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { x: 30, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 150, damping: 20 } },
};

// --- Component for the individual News Card ---
interface NewsCardProps {
  title: string;
  date: string;
  imageSrc: string;
  altText: string;
  delay: number; // For explicit staggering if not using parent stagger
}

const NewsCard: React.FC<NewsCardProps> = ({ title, date, imageSrc, altText }) => {
  return (
    <motion.div
      className="flex items-center space-x-4 p-4 hover:bg-gray-50/50 transition-colors duration-200 cursor-pointer rounded-lg"
      variants={cardItemVariants}
      whileHover={{ scale: 1.02 }}
    >
      {/* Image */}
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={imageSrc}
          alt={altText}
          fill
          sizes="64px"
          className="object-cover"
        />
      </div>
      
      {/* Text Content */}
      <div className="flex flex-col">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-1">{title}</h3>
        <p className="text-xs text-gray-500 mb-1">{date}</p>
        <p className="text-sm text-gray-600 line-clamp-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim
        </p>
      </div>
    </motion.div>
  );
};

// --- Main Header Section Component ---
export default function HeaderSection() {
  const newsItems = [
    {
      title: 'Autism care day',
      date: '15th Nov 2022',
      imageSrc: '/blocks/hero-image.png',
      altText: 'Autism-related abstract image',
    },
    {
      title: 'Down syndrome outreach',
      date: '15th Nov 2022',
      imageSrc: '/blocks/hero-image.png',
      altText: 'Child with headphones in a quiet space',
    },
    {
      title: 'Caring for children with cerebral palsy',
      date: '15th Nov 2022',
      imageSrc: '/blocks/hero-image.png',
      altText: 'Child in a mobility support chair smiling',
    },
  ];

  return (
    <section className="bg-[#fcf7e6] py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content (Goal/CTA) */}
          <div className="lg:col-span-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={headerVariants}
            >
              <div className="h-0.5 w-12 bg-gray-900 mb-3"></div>
              <p className="text-sm font-semibold uppercase tracking-widest text-gray-600 mb-4">
                TOP NEWS
              </p>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Our goal is to provide inclusive care for children with special needs
              </h1>
              <p className="text-lg text-gray-600 mb-10 max-w-lg">
                Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
              </p>
              <Button 
                asChild 
                className="h-12 px-6 py-3 bg-[#f3b54a] text-gray-900 hover:bg-[#e0a439] rounded-lg text-base font-semibold"
              >
                <Link href="#read-more">
                  Read more
                  <CaretRight size={16} className="ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Content (News Cards) */}
          <div className="lg:col-span-6">
            <motion.div
              className="bg-white p-6 md:p-8 rounded-xl shadow-xl space-y-4"
              variants={cardContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {newsItems.map((item, index) => (
                <NewsCard
                  key={index}
                  title={item.title}
                  date={item.date}
                  imageSrc={item.imageSrc}
                  altText={item.altText}
                  delay={index * 0.15}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}