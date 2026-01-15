"use client"
import Image from "next/image";
import { Card } from '@/components/ui/card'


export default function Abouts() {
    return (
        <section>
            <div className=" py-0 md:py-0 mt-0 bg-muted/70">
                <div className="mx-auto w-full max-w-5xl px-6">
                    <div>
                        <h2 className="p-5 text-foreground text-2xl sm:text-4xl font-semibold text-center">Impact Driven</h2>
                         <p className="text-muted-foreground mb-12 mt-4 text-balance text-lg text-center">AssureUs Club is a vibrant community of young changemakers committed to shaping a better Nigeria and Africa through leadership, civic participation, entrepreneurship, and innovation. As part of the U.S. Government’s Young African Leaders Initiative (YALI), our network empowers youth with knowledge, resources, and opportunities to lead impactful projects and transform their communities.</p>
                        <div className="bg-foreground/5 rounded-3xl p-6">
                        </div>
                    </div>

                    <div className="p-0 py-0 md:py 0 border-foreground/10 relative mt-0 grid gap-12 border-b pb-12 [--radius:1rem] md:grid-cols-2">
                        <div>
                            <h3 className="text-foreground text-xl font-semibold">Marketing Campaigns</h3>
                            <p className="text-muted-foreground my-4 text-lg">Effortlessly plan and execute your marketing campaigns organized.</p>
                            <Card className="aspect-video overflow-hidden px-6">
                                <div className="relative h-full w-full translate-y-6">
                                    <Image src="/blocks/yali-work.jpeg"
                                    alt="YALI Work"
                                    fill
                                    className="object-cover rounded-lg"
                                    priority
                                    />
                                </div>
                            </Card>
                        </div>
                        <div>
                            <h3 className="text-foreground text-xl font-semibold">AI Meeting Scheduler</h3>
                            <p className="text-muted-foreground my-4 text-lg">Effortlessly book and manage your meetings. Stay on top of your schedule.</p>
                            <Card className="aspect-video overflow-hidden px-6">
                                <div className="relative h-full w-full translate-y-6">
                                    <Image src="/blocks/yali-impact.jpeg"
                                    alt="YALI impact"
                                    fill
                                    className="object-cover rounded-lg"
                                    priority
                                    />
                                </div>
                            </Card>  
                        </div>
                        <div>
                            <h3 className="text-foreground text-xl font-semibold">Marketing Campaigns</h3>
                            <p className="text-muted-foreground my-4 text-lg">Effortlessly plan and execute your marketing campaigns organized.</p>
                            <Card className="aspect-video overflow-hidden px-6">
                                <div className="relative h-full w-full translate-y-6">
                                    <Image src="/blocks/yali-work.jpeg"
                                    alt="YALI Work"
                                    fill
                                    className="object-cover rounded-lg"
                                    priority
                                    />
                                </div>
                            </Card>
                        </div>
                        <div>
                            <h3 className="text-foreground text-xl font-semibold">Marketing Campaigns</h3>
                            <p className="text-muted-foreground my-4 text-lg">Effortlessly plan and execute your marketing campaigns organized.</p>
                            <Card className="aspect-video overflow-hidden px-6">
                                <div className="relative h-full w-full translate-y-6">
                                    <Image src="/blocks/yali-work.jpeg"
                                    alt="YALI Work"
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
