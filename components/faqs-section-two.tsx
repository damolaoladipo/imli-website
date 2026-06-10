'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'
import { siteConfig } from '@/_data/site-config'

export default function FAQs() {
    const faqItems = [
        {
            id: 'item-1',
            question: `What is ${siteConfig.name}?`,
            answer: siteConfig.description,
        },
        {
            id: 'item-2',
            question: 'What is media and information literacy (MIL)?',
            answer: 'Media and information literacy empowers people to think critically about information and media, recognize misinformation, and participate responsibly in digital and civic life. IMILI advances MIL policies that promote informed, resilient and peaceful societies.',
        },
        {
            id: 'item-3',
            question: 'Who does IMILI work with?',
            answer: 'IMILI collaborates with governments, UNESCO, civil society, academia, and private-sector partners to monitor MIL progress, generate research, and strengthen national and international policy frameworks.',
        },
        {
            id: 'item-4',
            question: 'How can organizations partner with IMILI?',
            answer: 'Organizations interested in research collaboration, policy development, or capacity building can reach out through our contact page. IMILI convenes global networks for South-South and North-South cooperation on MIL.',
        },
        {
            id: 'item-5',
            question: 'Where is IMILI based?',
            answer: 'IMILI was launched in Abuja, Nigeria under the auspices of UNESCO as the first international observatory dedicated to media and information literacy.',
        },
    ]

    return (
        <section className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-8 md:grid-cols-5 md:gap-12">
                    <div className="md:col-span-2">
                        <h2 className="text-foreground text-4xl font-semibold">FAQs</h2>
                        <p className="text-muted-foreground mt-4 text-balance">
                            Have a question about {siteConfig.name}? Reach out on our{' '}
                            <Link href="/contact" className="text-primary font-medium hover:underline">
                                contact page
                            </Link>
                            .
                        </p>
                    </div>
                    <div className="md:col-span-3">
                        <Accordion type="single" collapsible className="w-full">
                            {faqItems.map((item) => (
                                <AccordionItem key={item.id} value={item.id}>
                                    <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </section>
    )
}
