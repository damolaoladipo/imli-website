'use client'
import { cn } from '@/lib/utils'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Bold, Calendar1, Ellipsis, Italic, Strikethrough, Underline } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from "next/image";

export default function FeaturesSections() {
    return (
        <section>
            <div className="p-0 py-0 md:py-0 mt-0 bg-muted/70">
                <div className="mx-auto w-full max-w-5xl px-6">
                    <div>
                        <h2 className=" pt-10 text-foreground mt-4 text-center text-2xl sm:text-4xl font-semibold">Who We Are</h2>
                        <p className="text-muted-foreground text-center mb-12 mt-4 text-balance text-lg">YALI Lagos Hub strengthens youth leadership and community impact across Lagos as part of Nigeria. With over 1,000 members, the hub delivers impactful programs promoting civic engagement and youth development.</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Card className="p-4 sm:p-6">
                            <div className="relative w-full aspect-video flex items-center justify-center">
                                <Image
                                src="/blocks/yali-work.jpeg" // replace with your image path
                                 alt="Marketing Campaigns"
                                 fill
                                 className="object-cover rounded-lg"
                                 priority
                                 />
                                 </div>
                                 <div className="text-center mt-4">
                                    <h3 className="text-foreground text-xl font-semibold">Marketing Campaigns</h3>
                                    <p className="text-muted-foreground mt-2 text-balance text-lg">
                                        Effortlessly plan and execute your marketing campaigns organized.
                                    </p>
                            </div>
                        </Card>
                        <Card className="p-4 sm:p-6">
                            <div className="relative w-full aspect-video flex items-center justify-center">
                                <Image
                                src="/blocks/yali-work.jpeg" // replace with your image path
                                 alt="Marketing Campaigns"
                                 fill
                                 className="object-cover rounded-lg"
                                 priority
                                 />
                                 </div>
                                 <div className="text-center mt-4">
                                    <h3 className="text-foreground text-xl font-semibold">Marketing Campaigns</h3>
                                    <p className="text-muted-foreground mt-2 text-balance text-lg">
                                        Effortlessly plan and execute your marketing campaigns organized.
                                    </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

type IllustrationProps = {
    className?: string
    variant?: 'elevated' | 'outlined' | 'mixed'
}

export const ScheduleIllustation = ({ className, variant = 'elevated' }: IllustrationProps) => {
    return (
        <div className={cn('relative', className)}>
            <div
                className={cn('bg-background -translate-x-1/8 absolute flex -translate-y-[110%] items-center gap-2 rounded-lg p-1', {
                    'shadow-black-950/10 shadow-lg': variant === 'elevated',
                    'border-foreground/10 border': variant === 'outlined',
                    'border-foreground/10 border shadow-md shadow-black/5': variant === 'mixed',
                })}>
                <Button
                    size="sm"
                    className="rounded-sm">
                    <Calendar1 className="size-3" />
                    <span className="text-sm font-medium">Schedule</span>
                </Button>
                <span className="bg-border block h-4 w-px"></span>
                <ToggleGroup
                    type="multiple"
                    size="sm"
                    className="gap-0.5 *:rounded-md">
                    <ToggleGroupItem
                        value="bold"
                        aria-label="Toggle bold">
                        <Bold className="size-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="italic"
                        aria-label="Toggle italic">
                        <Italic className="size-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="underline"
                        aria-label="Toggle underline">
                        <Underline className="size-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="strikethrough"
                        aria-label="Toggle strikethrough">
                        <Strikethrough className="size-4" />
                    </ToggleGroupItem>
                </ToggleGroup>
                <span className="bg-border block h-4 w-px"></span>
                <Button
                    size="icon"
                    className="size-8"
                    variant="ghost">
                    <Ellipsis className="size-3" />
                </Button>
            </div>
            <span>
                <span className="bg-secondary text-secondary-foreground py-1">Tomorrow 8:30 pm</span> is our priority.
            </span>
        </div>
    )
}

export const CodeIllustration = ({ className }: { className?: string }) => {
    return (
        <div className={cn('[mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_50%,transparent_100%)]', className)}>
            <ul className="text-muted-foreground mx-auto w-fit font-mono text-2xl font-medium">
                {['Images', 'Variables', 'Pages', 'Components', 'Styles'].map((item, index) => (
                    <li
                        key={index}
                        className={cn(index == 2 && "text-foreground before:absolute before:-translate-x-[110%] before:text-orange-500 before:content-['Import']")}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}
