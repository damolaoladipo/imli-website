'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

export default function FAQs() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'What is AssureUs Club?',
            answer: 'AssureUs Club is a connected, celebratory, and growth-oriented community for international students, immigrants, and refugee youth across Canada. We help young people discover their unique strengths, develop leadership potential, and contribute meaningfully to society.',
        },
        {
            id: 'item-2',
            question: 'Who can join AssureUs Club?',
            answer: 'AssureUs Club welcomes all international students, immigrants, and refugee youth looking to build meaningful connections, develop leadership skills, and engage with a supportive community. There are no barriers to entry—everyone is welcome.',
        },
        {
            id: 'item-3',
            question: 'What programs and events does the club offer?',
            answer: 'We offer various programs including leadership development workshops, community service opportunities, social events, mentorship programs, and the AUC 100-hour Learning Challenge. Check our events page for upcoming initiatives and programs.',
        },
        {
            id: 'item-4',
            question: 'How can I get involved as a volunteer?',
            answer: 'We\'re always looking for passionate volunteers! You can express interest through our volunteer signup form or contact us directly. Whether you want to help organize events, mentor youth, or contribute your skills, there\'s a role for everyone.',
        },
        {
            id: 'item-5',
            question: 'Is there a membership fee?',
            answer: 'No! AssureUs Club is free to join. We believe in making our community accessible to everyone. While participation is free, donations are always appreciated to help us expand our programs and reach more young people.',
        },
    ]

    return (
        <section className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-8 md:grid-cols-5 md:gap-12">
                    <div className="md:col-span-2">
                        <h2 className="text-foreground text-4xl font-semibold">FAQs</h2>
                        <p className="text-muted-foreground mt-4 text-balance text-lg">Your questions answered</p>
                        <p className="text-muted-foreground mt-6 hidden md:block">
                            Can't find what you're looking for? Contact our{' '}
                            <Link
                                href="#"
                                className="text-primary font-medium hover:underline">
                                customer support team
                            </Link>
                        </p>
                    </div>

                    <div className="md:col-span-3">
                        <Accordion
                            type="single"
                            collapsible>
                            {faqItems.map((item) => (
                                <AccordionItem
                                    key={item.id}
                                    value={item.id}>
                                    <AccordionTrigger className="cursor-pointer text-base hover:no-underline">{item.question}</AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-base">{item.answer}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>

                    <p className="text-muted-foreground mt-6 md:hidden">
                        Can't find what you're looking for? Contact our{' '}
                        <Link
                            href="#"
                            className="text-primary font-medium hover:underline">
                            customer support team
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}
