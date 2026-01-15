"use client";


import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Phosphor Icons
import { Heart, Handshake, Gift } from '@phosphor-icons/react';

// --- Framer Motion Animation Variants ---

const sectionFadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.2 } },
};

const textFadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const tabContentAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

// Tab Data Structure
const tabs = [
    {
        id: 'overview',
        label: 'Overview',
        icon: Heart,
        content: (
            <>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
                <p className="mt-4">Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.</p>
            </>
        ),
    },
    {
        id: 'impact',
        label: 'Impact',
        icon: Handshake,
        content: (
            <>
                <p>By contributing, your involvement directly translates into measurable **positive impact** on the lives of children. Every effort helps provide essential resources and a nurturing environment.</p>
                <p className="mt-4">We track key metrics, from educational outcomes to health improvements, ensuring complete transparency on where your support goes.</p>
            </>
        ),
    },
    {
        id: 'what-you-get',
        label: 'What You get',
        icon: Gift,
        content: (
            <>
                <p>As a contributor, you receive regular **updates and personalized reports** detailing the progress of the children you support. We believe in showing you the direct results of your generosity.</p>
                <p className="mt-4">You also gain access to exclusive community events and appreciation acknowledgments for your dedication to our mission.</p>
            </>
        ),
    },
];

export default function ContributeAndDonationSection() {
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const activeContent = tabs.find(tab => tab.id === activeTab)?.content;

    return (
        <section className="bg-[#fcf7e6] py-20 sm:py-32 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* How You Can Contribute Section (Top Half with Tabs) */}
                <motion.div
                    className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start"
                    variants={sectionFadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <div className="lg:pr-12">
                        <motion.h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6" variants={textFadeIn}>
                            How you can contribute to **caring for our kids**
                        </motion.h2>
                        <motion.p className="text-lg text-gray-700 max-w-lg" variants={textFadeIn}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
                        </motion.p>
                        <motion.p className="text-lg text-gray-700 max-w-lg mt-4" variants={textFadeIn}>
                            Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
                        </motion.p>
                    </div>

                    {/* Tabbed Content Area */}
                    <div className="bg-white p-6 rounded-xl shadow-lg w-full">
                        {/* Tab Headers */}
                        <div className="flex border-b border-gray-200 mb-6 space-x-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`relative py-3 px-1 text-base font-semibold transition-colors duration-300 ${
                                        activeTab === tab.id
                                            ? 'text-[#e9a60e]' // Accent color for active tab
                                            : 'text-gray-500 hover:text-gray-800'
                                    }`}
                                >
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e9a60e]"
                                            layoutId="underline"
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <motion.div
                            key={activeTab}
                            variants={tabContentAnimation}
                            initial="hidden"
                            animate="visible"
                            className="text-gray-700 text-base"
                        >
                            {activeContent}
                        </motion.div>
                    </div>
                </motion.div>

                {/* --- Separator --- */}
                <hr className="my-20 border-gray-300" />
                {/* --- Separator --- */}

                {/* How We Use Your Donation Section (Bottom Half) */}
                <motion.div
                    className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start"
                    variants={sectionFadeIn}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <div className="lg:pr-12">
                        <motion.h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6" variants={textFadeIn}>
                            How we use your **donation**
                        </motion.h2>
                        {/* Left block of dummy text */}
                        <motion.p className="text-lg text-gray-700 max-w-lg" variants={textFadeIn}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Nunc ut sem vitae risus tristique posuere.
                        </motion.p>
                    </div>

                    {/* Right block of dummy text */}
                    <motion.div className="text-lg text-gray-700" variants={textFadeIn}>
                        Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}