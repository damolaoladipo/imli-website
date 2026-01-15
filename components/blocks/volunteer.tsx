"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

// Phosphor Icons
import { ArrowRight, Check } from '@phosphor-icons/react';

// Assuming you have a Button component from your shadcn/ui setup
import { Button } from '@/components/ui/button';

// Framer Motion Animation Variants
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1, // Delay between children animations
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const imageFadeIn: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function BecomeAVolunteerSection() {
    return (
        <section className="bg-white py-20 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col items-center justify-center text-center">
                    {/* Header */}
                    <motion.div
                        className="mb-12"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <motion.span
                            className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-600 ring-1 ring-inset ring-amber-600/20"
                            variants={itemVariants}
                        >
                            Member
                        </motion.span>
                        <motion.h2
                            className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900"
                            variants={itemVariants}
                        >
                            Become a Volunteer
                        </motion.h2>
                    </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    {/* Left Content Area (Images & Experience Tag) */}
                    <motion.div
                        className="relative h-[480px] w-full max-w-lg mx-auto"
                        variants={imageFadeIn}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <motion.div
                            className="absolute left-0 top-0 w-[80%] h-[70%] shadow-xl rounded-lg overflow-hidden"
                            variants={itemVariants}
                        >
                            <Image
                                src="/volunteer-image-1.jpg" // Replace with actual path (e.g., hand reaching out)
                                alt="A person's hand reaching out, symbolizing help"
                                width={700}
                                height={500}
                                className="object-cover w-full h-full grayscale" // Added grayscale as per image
                            />
                        </motion.div>
                        <motion.div
                            className="absolute right-0 bottom-0 w-[80%] h-[70%] shadow-xl rounded-lg overflow-hidden translate-x-4 translate-y-4"
                            variants={itemVariants}
                        >
                            <Image
                                src="/volunteer-image-2.jpg" // Replace with actual path (e.g., hand reaching out)
                                alt="A person's hand reaching out, symbolizing help, with more context"
                                width={700}
                                height={500}
                                className="object-cover w-full h-full grayscale" // Added grayscale as per image
                            />
                        </motion.div>
                        <motion.div
                            className="absolute bottom-16 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white px-6 py-3 rounded-lg shadow-lg whitespace-nowrap"
                            variants={itemVariants}
                        >
                            <span className="text-xl font-bold text-gray-900">29+</span>{' '}
                            <span className="text-gray-600">Years experience</span>
                        </motion.div>
                    </motion.div>

                    {/* Right Content Area (Form) */}
                    <motion.div
                        className="lg:pl-12 w-full"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <motion.h3
                            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                            variants={itemVariants}
                        >
                            Introduce Yourself !
                        </motion.h3>
                        <motion.p
                            className="mt-4 text-lg text-gray-600 mb-8"
                            variants={itemVariants}
                        >
                            Fill out the form and Feel free to say it!
                        </motion.p>

                        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <motion.div variants={itemVariants}>
                                <label htmlFor="name" className="sr-only">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Jhon Abraham"
                                    className="block w-full rounded-md border-0 bg-gray-50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <label htmlFor="phone" className="sr-only">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Phone Number"
                                    className="block w-full rounded-md border-0 bg-gray-50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <label htmlFor="email" className="sr-only">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="block w-full rounded-md border-0 bg-gray-50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <label htmlFor="location" className="sr-only">Current Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    placeholder="Current Location"
                                    className="block w-full rounded-md border-0 bg-gray-50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <label htmlFor="dob" className="sr-only">Date of Birth</label>
                                <input
                                    type="text" // Or "date" for a date picker
                                    id="dob"
                                    name="dob"
                                    placeholder="Date of Birth"
                                    onFocus={(e) => e.target.type = 'date'} // Change to date input on focus
                                    onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }} // Change back if empty
                                    className="block w-full rounded-md border-0 bg-gray-50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                />
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <label htmlFor="occupation" className="sr-only">Occupation</label>
                                <select
                                    id="occupation"
                                    name="occupation"
                                    className="block w-full rounded-md border-0 bg-gray-50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                    defaultValue="" // Set an empty default value
                                >
                                    <option value="" disabled hidden>Occupation</option>
                                    <option>Student</option>
                                    <option>Professional</option>
                                    <option>Retired</option>
                                    <option>Other</option>
                                </select>
                            </motion.div>
                            <motion.div className="sm:col-span-2" variants={itemVariants}>
                                <label htmlFor="message" className="sr-only">Say Something...</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={4}
                                    placeholder="Say Something..."
                                    className="block w-full rounded-md border-0 bg-gray-50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
                                />
                            </motion.div>
                            <motion.div className="sm:col-span-2 flex items-center gap-x-2" variants={itemVariants}>
                                <input
                                    id="terms-conditions"
                                    name="terms-conditions"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-600"
                                />
                                <label htmlFor="terms-conditions" className="text-sm leading-6 text-gray-600">
                                    I Accept Terms & Conditions
                                </label>
                            </motion.div>
                            <motion.div className="sm:col-span-2" variants={itemVariants}>
                                <Button
                                    type="submit"
                                    className="inline-flex items-center justify-center rounded-full bg-amber-400 text-gray-900 hover:bg-amber-500 transition-colors h-12 px-6 py-3 font-semibold group"
                                >
                                    <span className="text-nowrap">Submit Now</span>
                                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" weight="bold" />
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}