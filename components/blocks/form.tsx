 "use client"

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
// Phosphor Icons for social media and contact info
import {
  FacebookLogo,
  TwitterLogo,
  LinkedinLogo,
  Phone,
  EnvelopeSimple,
  MapPin,
} from '@phosphor-icons/react';

// Assuming you have Shadcn/UI components for form elements
// You might need to adjust imports based on your actual Shadcn setup
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

// --- ZOD SCHEMA FOR FORM VALIDATION ---
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

// --- FRAMER MOTION VARIANTS ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function ContactUssSection() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  function onSubmit(values: ContactFormValues) {
    console.log("Form submitted with values:", values);
    // Here you would typically send the data to your backend
    alert('Thank you for your message! We will get back to you soon.');
    form.reset(); // Reset form after submission
  }

  return (
    <section className="bg-yellow-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left Content Area (Intro & Form) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className="lg:pr-12"
          >
            <motion.div variants={itemVariants} className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-px bg-gray-400"></div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
                CONTACT US
              </p>
            </motion.div>

            <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6 max-w-lg">
              We&apos;d love to hear from you
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg text-gray-700 mb-8 max-w-xl">
              Have any question in mind or want to enquire? Please feel free to
              contact us through the form or the following details.
            </motion.p>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="mt-10 p-6 bg-white rounded-xl shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your inquiry..." rows={5} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900">
                    Send Message
                  </Button>
                </form>
              </Form>
            </motion.div>
          </motion.div>

          {/* Right Contact Details Area */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
            className="space-y-12"
          >
            {/* Let's Talk */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Let&apos;s talk!</h3>
              <div className="flex items-center gap-3 text-lg text-gray-700 mb-2">
                <Phone size={24} weight="regular" className="text-gray-600" />
                <Link href="tel:+23409012346514" className="hover:underline">
                  +234 09012346514
                </Link>
              </div>
              <div className="flex items-center gap-3 text-lg text-gray-700">
                <EnvelopeSimple size={24} weight="regular" className="text-gray-600" />
                <Link href="mailto:hello@largerthani.com" className="hover:underline">
                  hello@largerthani.com
                </Link>
              </div>
            </motion.div>

            {/* Headoffice */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Headoffice</h3>
              <div className="flex items-start gap-3 text-lg text-gray-700">
                <MapPin size={24} weight="regular" className="text-gray-600 mt-1" />
                <p>8 Brewery Drive, Lagos, <br /> Nigeria.</p>
              </div>
            </motion.div>

            {/* Branch Office */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Branch Office</h3>
              <div className="flex items-start gap-3 text-lg text-gray-700">
                <MapPin size={24} weight="regular" className="text-gray-600 mt-1" />
                <p>Opp Opolo round about, Yenagoa, Bayelsa, <br /> Nigeria</p>
              </div>
            </motion.div>

            {/* Social Media Icons */}
            <motion.div variants={itemVariants} className="flex items-center gap-6 mt-8">
              <Link href="#" aria-label="Facebook" className="text-gray-600 hover:text-gray-900 transition-colors">
                <FacebookLogo size={28} weight="fill" />
              </Link>
              <Link href="#" aria-label="Twitter" className="text-gray-600 hover:text-gray-900 transition-colors">
                <TwitterLogo size={28} weight="fill" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="text-gray-600 hover:text-gray-900 transition-colors">
                <LinkedinLogo size={28} weight="fill" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}