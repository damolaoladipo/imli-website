 "use client"

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { EnvelopeSimple, MapPin, Phone, FacebookLogo, TwitterLogo, LinkedinLogo } from '@phosphor-icons/react';
import Link from 'next/link';

// Animation variants for the main container
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger the appearance of children
    },
  },
};

// Animation variants for individual text/detail elements
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

// Animation variants for social icons (a simple fade in)
const socialIconVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            type: 'spring',
            stiffness: 150,
            damping: 10
        }
    }
};

const ContactDetail = ({ icon: Icon, label, value, href, type = 'text' }: {
    icon: React.ElementType;
    label: string;
    value: string;
    href?: string;
    type?: 'email' | 'phone' | 'address' | 'text';
}) => {
    const linkPrefix = type === 'email' ? 'mailto:' : type === 'phone' ? 'tel:' : '';
    const content = (
        <p className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
            <Icon weight="bold" className="w-5 h-5 text-primary-600" />
            <span className="text-lg">{value}</span>
        </p>
    );

    return (
        <motion.div variants={itemVariants} className="mt-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-1">{label}</h4>
            {href ? (
                <Link href={linkPrefix + href} passHref className="group">
                    {content}
                </Link>
            ) : (
                content
            )}
        </motion.div>
    );
};

export default function ContactUsSection() {
    const contactInfo = [
        {
            label: 'Email',
            value: 'yalinetworklagos@gmail.com',
            href: 'yalinetworklagos@gmail.com',
            icon: EnvelopeSimple,
            type: 'email' as const,
        },
        {
            label: 'Phone',
            value: '+234 703 686 5403',
            href: '+234 703 686 5403',
            icon: Phone,
            type: 'phone' as const,
        },
    ];

    const headOffice = {
        label: 'Headoffice',
        value: '8 Brewery Drive, Lagos, Nigeria.',
        icon: MapPin,
    };

    const branchOffice = {
        label: 'Branch Office',
        value: 'Opp Opolo roundabout, Yenagoa, Bayelsa, Nigeria',
        icon: MapPin,
    };

    const socialLinks = [
        { icon: FacebookLogo, href: '#facebook' },
        { icon: TwitterLogo, href: '#twitter' },
        { icon: LinkedinLogo, href: '#linkedin' },
    ];

    return (
        <motion.section
            className="bg-[#fcf8ec] py-20 sm:py-32"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="mx-auto max-w-5xl px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
                    {/* Left Content: Intro Text */}
                    <div className="md:pr-12">
                        <motion.h2 variants={itemVariants} className="text-2xl sm:text-4xl md:text-6xl font-semibold text-gray-900 leading-tight mb-6">
                            We&apos;d love to hear from you
                        </motion.h2>

                        <motion.p variants={itemVariants} className="text-x text-gray-700 max-w-md">
                            Have any question in mind or want to enquire? Please feel free to contact us through the form or the following details.
                        </motion.p>
                        {/* You might add a form element here if needed, animated similarly */}
                    </div>

                    {/* Right Content: Contact Details */}
                    <div className="flex flex-col space-y-8">
                        {/* Let's Talk Section */}
                        <motion.div variants={itemVariants}>
                            <h3 className="text-x font-semibold text-gray-900 mb-4">Let&apos;s talk!</h3>
                            
                            {contactInfo.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.type === 'email' ? `mailto:${item.href}` : `tel:${item.href}`}
                                    passHref
                                    className="block group"
                                >
                                    <div className="flex items-center gap-2 text-x text-gray-700 hover:text-primary transition-colors py-1">
                                        <item.icon weight="bold" className="w-6 h-6 text-primary-600" />
                                        <span>{item.value}</span>
                                    </div>
                                    <hr className="my-1 border-t border-gray-300 w-full" />
                                </Link>
                            ))}
                        </motion.div>

                        {/* Offices Section */}
                        <div className="space-y-6">
                            <motion.div variants={itemVariants}>
                                <h4 className="text-x font-semibold text-gray-900 mb-2">{headOffice.label}</h4>
                                <div className="flex items-start gap-2 text-lg text-gray-700">
                                    <headOffice.icon weight="bold" className="w-5 h-5 mt-1 text-primary-600 shrink-0" />
                                    <p className="max-w-xs">{headOffice.value}</p>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <h4 className="text-x font-semibold text-gray-900 mb-2">{branchOffice.label}</h4>
                                <div className="flex items-start gap-2 text-lg text-gray-700">
                                    <branchOffice.icon weight="bold" className="w-5 h-5 mt-1 text-primary-600 shrink-0" />
                                    <p className="max-w-xs">{branchOffice.value}</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Social Icons */}
                        <motion.div className="flex gap-4 pt-4" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={containerVariants}>
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <motion.div key={index} variants={socialIconVariants}>
                                        <Link href={social.href} aria-label={Icon.displayName || 'Social Link'} className="text-gray-600 hover:text-primary transition-colors">
                                            <Icon weight="fill" className="w-6 h-6" />
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

// NOTE: You'll need to install the dependencies:
// npm install framer-motion @phosphor-icons/react