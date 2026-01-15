"use client";
import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TimesWeveSpent() {
    const fadeIn: Variants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const imageVariants: Variants = {
        initial: { opacity: 0, scale: 0.95 },
        animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <section className="bg-white py-20 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                <motion.span
                    className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600 ring-1 ring-inset ring-emerald-600/20"
                    variants={fadeIn}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    ON-GOING PROJECTS
                </motion.span>
                <motion.h2
                    className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
                    variants={fadeIn}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    Times we&apos;ve spent.
                </motion.h2>
                <motion.p
                    className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600"
                    variants={fadeIn}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    Lorem Ipsum is simply dummy text of the printing typesetting dummy text ever when an unknown printer took a galley of type and scrambled a type specimen book.
                </motion.p>

                <div className="mt-16">
                    <motion.div
                        className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8"
                        variants={imageVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {/* The image provided is a single composite image. For individual images in a real scenario, you'd map over an array of image sources. */}
                        {/* Here, we'll use the provided image as a single illustrative element. */}
                        <Image
                            src="/path/to/your/composite-image.jpg" // Replace with the actual path to your composite image
                            alt="People working together on projects"
                            width={1200} // Adjust width and height based on your image's aspect ratio and desired display size
                            height={600}
                            className="rounded-lg shadow-xl ring-1 ring-gray-900/5"
                        />
                    </motion.div>
                </div>
            </div>
            {/* Newsletter Subscription */}
            <div className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-y-10">
                        <motion.div
                            className="lg:w-1/2 text-center lg:text-left"
                            variants={fadeIn}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Get update on success stories</h3>
                            <p className="mt-4 text-lg leading-8 text-gray-600">Get directly on your email</p>
                        </motion.div>
                        <motion.form
                            className="flex flex-col sm:flex-row gap-4 lg:w-1/2 justify-center lg:justify-end"
                            variants={fadeIn}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="min-w-0 flex-auto rounded-md border-0 bg-gray-50 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                                placeholder="Enter your email"
                            />
                            <Button
                                type="submit"
                                className="flex-none rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                            >
                                Subscribe
                            </Button>
                        </motion.form>
                    </div>
                    <motion.p
                        className="mt-6 text-sm leading-5 text-gray-600 text-center lg:text-right"
                        variants={fadeIn}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        We care about your data in our{' '}
                        <Link href="/privacy-policy" className="font-semibold text-emerald-600 hover:text-emerald-500">
                            privacy policy
                        </Link>
                        .
                    </motion.p>
                </div>
            </div>
        </section>
    );
}