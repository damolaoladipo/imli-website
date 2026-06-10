"use client"
import Image from "next/image";
import { Card } from '@/components/ui/card'
import { siteConfig } from "@/_data/site-config";


export default function Abouts() {
    return (
        <section>
            <div className=" py-0 md:py-0 mt-0 bg-muted/70">
                <div className="mx-auto w-full max-w-5xl px-6">
                    <div>
                        <h2 className="p-5 text-foreground text-2xl sm:text-4xl font-semibold text-center">What We Do</h2>
                         <p className="text-muted-foreground mb-12 mt-4 text-balance text-lg text-center">{siteConfig.description}</p>
                        <div className="bg-foreground/5 rounded-3xl p-6">
                        </div>
                    </div>

                    <div className="p-0 py-0 md:py 0 border-foreground/10 relative mt-0 grid gap-12 border-b pb-12 [--radius:1rem] md:grid-cols-2">
                        <div>
                            <h3 className="text-foreground text-xl font-semibold">Research & Analysis</h3>
                            <p className="text-muted-foreground my-4 text-lg">Evidence-based research and analysis of media and information literacy for peace, justice, and sustainable development.</p>
                            <Card className="aspect-video overflow-hidden px-6">
                                <div className="relative h-full w-full translate-y-6">
                                    <Image src="/new/humans.png"
                                    alt="IMILI research and collaboration"
                                    fill
                                    className="object-cover rounded-lg"
                                    priority
                                    />
                                </div>
                            </Card>
                        </div>
                        <div>
                            <h3 className="text-foreground text-xl font-semibold">Policy & Strategy</h3>
                            <p className="text-muted-foreground my-4 text-lg">A clearinghouse on MIL best practices, stimulating sustainable international, regional, and national media and information policies.</p>
                            <Card className="aspect-video overflow-hidden px-6">
                                <div className="relative h-full w-full translate-y-6">
                                    <Image src="/new/mision.png"
                                    alt="IMILI policy framework"
                                    fill
                                    className="object-cover rounded-lg"
                                    priority
                                    />
                                </div>
                            </Card>  
                        </div>
                        <div>
                            <h3 className="text-foreground text-xl font-semibold">Global Cooperation</h3>
                            <p className="text-muted-foreground my-4 text-lg">Convening and networking globally for South-South and North-South cooperation on research and capacity enhancement.</p>
                            <Card className="aspect-video overflow-hidden px-6">
                                <div className="relative h-full w-full translate-y-6">
                                    <Image src="/new/humans.png"
                                    alt="IMILI global partnerships"
                                    fill
                                    className="object-cover rounded-lg"
                                    priority
                                    />
                                </div>
                            </Card>
                        </div>
                        <div>
                            <h3 className="text-foreground text-xl font-semibold">Education Integration</h3>
                            <p className="text-muted-foreground my-4 text-lg">Advancing consensus for integrating media and information literacy and digital competencies in educational planning and teacher training.</p>
                            <Card className="aspect-video overflow-hidden px-6">
                                <div className="relative h-full w-full translate-y-6">
                                    <Image src="/new/humans.png"
                                    alt="IMILI education programs"
                                    fill
                                    className="object-cover rounded-lg"
                                    priority
                                    />
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
