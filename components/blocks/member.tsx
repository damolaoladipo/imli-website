import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle, CaretRight } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button'; // Assuming Button component is available

// Animation variants for staggered entrance
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger children animations
      delayChildren: 0.3,
    },
  },
};

// Animation variants for individual items
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

// Component for the feature list items
const FeatureListItem: React.FC<{ text: string }> = ({ text }) => (
  <motion.li 
    className="flex items-center space-x-2"
    variants={itemVariants}
  >
    <CheckCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" weight="fill" />
    <span className="text-gray-700">{text}</span>
  </motion.li>
);

export default function BecomeMemberSection() {
  const features = [
    { id: 1, text: 'Build community' },
    { id: 2, text: 'Protect civil rights' },
    { id: 3, text: 'Support education' },
    { id: 4, text: 'Defend voting rights' },
  ];

  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header - Animated */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 text-sm font-medium bg-yellow-400 text-gray-800 rounded-full mb-4">
            Member
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
            Become a Member
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          {/* Left: Images - Using a simple motion animation */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0 relative w-full lg:w-1/2"
          >
            {/* Using dummy paths for images - replace with your actual image paths */}
            <div className="relative flex flex-col sm:flex-row lg:flex-col gap-4">
                {/* Image 1: Placeholder for large image (e.g., the one with the purple umbrella) */}
                <div className="w-full sm:w-1/2 lg:w-full">
                    <Image
                        src="/path-to-image1.jpg" // **Replace with actual path to large image**
                        alt="Protesters holding signs for rights"
                        width={400}
                        height={600}
                        className="rounded-lg shadow-xl object-cover w-full h-full aspect-[2/3] lg:aspect-[3/4]"
                    />
                </div>
                
                <div className="flex flex-col gap-4 w-full sm:w-1/2 lg:w-full">
                    {/* Image 2: Placeholder for group image */}
                    <Image
                        src="/path-to-image2.jpg" // **Replace with actual path to group image**
                        alt="Group of members posing together"
                        width={400}
                        height={200}
                        className="rounded-lg shadow-xl object-cover w-full aspect-[2/1]"
                    />
                    {/* Image 3: Placeholder for walking image */}
                    <Image
                        src="/path-to-image3.jpg" // **Replace with actual path to walking image**
                        alt="People walking with signs"
                        width={400}
                        height={200}
                        className="rounded-lg shadow-xl object-cover w-full aspect-[2/1]"
                    />
                </div>
            </div>
            
            <style jsx>{`
              /* Styling to match the overlapping and stacked look from the image */
              /* In a real project, this might be achieved more cleanly with more advanced Tailwind/CSS positioning */
              .relative > div:first-child {
                position: relative;
                z-index: 20;
              }
              .relative > div:nth-child(2) {
                position: absolute;
                top: 0;
                right: 0;
                z-index: 10;
              }

              @media (min-width: 1024px) { /* Adjusting layout for large screens */
                .relative > div:first-child {
                    width: 50%; /* Adjusted width for demonstration of overlap */
                }
                .relative > div:nth-child(2) {
                    left: 45%;
                    top: 15%;
                    width: 55%;
                }
              }
            `}</style>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            className="lg:w-1/2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Why Join Us Label - Animated */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-4 py-1 text-sm font-medium bg-yellow-200 text-yellow-800 rounded-md">
                Why Join with us?
              </span>
            </motion.div>

            {/* Description - Animated */}
            <motion.p variants={itemVariants} className="text-lg text-gray-600 mb-8 max-w-lg">
              When you join the Louisville NAACP, you become part of a powerful network fighting for **justice, equality, and opportunity.**
            </motion.p>

            {/* Features List (using Framer Motion on the container) */}
            <motion.ul variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature) => (
                <FeatureListItem key={feature.id} text={feature.text} />
              ))}
            </motion.ul>

            {/* Button - Animated */}
            <motion.div variants={itemVariants}>
              <Button
                asChild
                size="lg"
                className="bg-yellow-400 text-gray-800 hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-200/50"
              >
                <Link href="#join-now">
                  <span className="text-nowrap font-semibold">Join Now</span>
                  <CaretRight className="w-5 h-5 ml-1" weight="bold" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// "use client";
// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { motion } from 'framer-motion';

// // Phosphor Icons
// import { UsersThree, Shield, GraduationCap, Gavel, ArrowRight } from '@phosphor-icons/react';

// // Assuming you have a Button component from your shadcn/ui setup
// import { Button } from '@/components/ui/button'; 

// // Framer Motion Animation Variants
// const containerVariants = {
//     hidden: {},
//     visible: {
//         transition: {
//             staggerChildren: 0.1, // Delay between children animations
//         },
//     },
// };

// const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
// };

// const imageVariants = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
// };


// export default function BecomeAMemberSection() {
//     const memberBenefits = [
//         { icon: UsersThree, text: 'Build community' },
//         { icon: Shield, text: 'Protect civil rights' },
//         { icon: GraduationCap, text: 'Support education' },
//         { icon: Gavel, text: 'Defend voting rights' },
//     ];

//     return (
//         <section className="bg-white py-20 sm:py-32">
//             <div className="mx-auto max-w-7xl px-6 lg:px-8">
//                 <div className="flex flex-col items-center justify-center text-center">
//                     {/* Header */}
//                     <motion.div
//                         className="mb-12"
//                         variants={containerVariants}
//                         initial="hidden"
//                         whileInView="visible"
//                         viewport={{ once: true, amount: 0.1 }}
//                     >
//                         <motion.span
//                             className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-600 ring-1 ring-inset ring-amber-600/20"
//                             variants={itemVariants}
//                         >
//                             Member
//                         </motion.span>
//                         <motion.h2
//                             className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900"
//                             variants={itemVariants}
//                         >
//                             Become a Member
//                         </motion.h2>
//                     </motion.div>
//                 </div>

//                 <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
//                     {/* Left Content Area (Images) */}
//                     <motion.div
//                         className="relative h-[450px]"
//                         variants={imageVariants}
//                         initial="hidden"
//                         whileInView="visible"
//                         viewport={{ once: true, amount: 0.3 }}
//                     >
//                         {/* Image 1 (Left, with umbrella) */}
//                         <motion.div 
//                             className="absolute left-0 top-0 w-1/2 h-full shadow-xl rounded-lg overflow-hidden"
//                             style={{ zIndex: 1 }}
//                             variants={itemVariants}
//                         >
//                             <Image
//                                 src="/member-image-1.jpg" // Replace with actual path
//                                 alt="People protesting for civil rights with signs"
//                                 width={500}
//                                 height={600}
//                                 className="object-cover w-full h-full"
//                             />
//                         </motion.div>
                        
//                         {/* Image 2 (Top Right, Group photo) */}
//                         <motion.div 
//                             className="absolute right-0 top-0 w-1/2 h-[50%] shadow-xl rounded-lg overflow-hidden translate-x-4 -translate-y-4"
//                             style={{ zIndex: 2 }}
//                             variants={itemVariants}
//                         >
//                             <Image
//                                 src="/member-image-2.jpg" // Replace with actual path
//                                 alt="Group of diverse members holding protest signs"
//                                 width={500}
//                                 height={300}
//                                 className="object-cover w-full h-full"
//                             />
//                         </motion.div>
                        
//                         {/* Image 3 (Bottom Right, People marching) */}
//                         <motion.div 
//                             className="absolute right-0 bottom-0 w-1/2 h-[50%] shadow-xl rounded-lg overflow-hidden translate-x-4 translate-y-4"
//                             style={{ zIndex: 3 }}
//                             variants={itemVariants}
//                         >
//                             <Image
//                                 src="/member-image-3.jpg" // Replace with actual path
//                                 alt="People marching together in a parade"
//                                 width={500}
//                                 height={300}
//                                 className="object-cover w-full h-full"
//                             />
//                         </motion.div>
//                         {/* Note: In a real app, you would need to crop and save the three distinct parts of your composite image. */}
//                     </motion.div>

//                     {/* Right Content Area (Benefits) */}
//                     <motion.div
//                         className="lg:pl-12"
//                         variants={containerVariants}
//                         initial="hidden"
//                         whileInView="visible"
//                         viewport={{ once: true, amount: 0.2 }}
//                     >
//                         <motion.span
//                             className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-600 ring-1 ring-inset ring-amber-600/20"
//                             variants={itemVariants}
//                         >
//                             Why Join with us?
//                         </motion.span>
//                         <motion.p
//                             className="mt-6 text-lg text-gray-600 max-w-lg"
//                             variants={itemVariants}
//                         >
//                             When you join the Louisville NAACP, you become part of a **powerful network fighting for justice, equality, and opportunity.**
//                         </motion.p>

//                         {/* Benefits List */}
//                         <motion.div
//                             className="mt-8 grid grid-cols-2 gap-y-4 text-gray-700"
//                             variants={containerVariants}
//                         >
//                             {memberBenefits.map((benefit, index) => (
//                                 <motion.div
//                                     key={index}
//                                     className="flex items-center space-x-2"
//                                     variants={itemVariants}
//                                 >
//                                     <benefit.icon className="w-5 h-5 text-amber-600 flex-shrink-0" weight="bold" />
//                                     <span className="text-base">{benefit.text}</span>
//                                 </motion.div>
//                             ))}
//                         </motion.div>
                        
//                         {/* Join Now Button */}
//                         <motion.div
//                             className="mt-10"
//                             variants={itemVariants}
//                         >
//                             <Button
//                                 asChild
//                                 size="lg"
//                                 className="inline-flex items-center justify-center rounded-full bg-amber-400 text-gray-900 hover:bg-amber-500 transition-colors h-12 px-6 py-3 font-semibold group"
//                             >
//                                 <Link href="#join-form" className="flex items-center gap-2">
//                                     <span className="text-nowrap">Join Now</span>
//                                     <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" weight="bold" />
//                                 </Link>
//                             </Button>
//                         </motion.div>
//                     </motion.div>
//                 </div>
//             </div>
//         </section>
//     );
// }