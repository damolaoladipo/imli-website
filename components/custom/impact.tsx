import { siteConfig } from "@/_data/site-config";

export default function Impact() {
    return (
        <section className="bg-[#FBAF4B] @container py-12 sm:py-16 md:py-24 lg:py-40 px-4 md:px-0">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <div className="space-y-3 sm:space-y-4">
                    <h2 className="text-balance text-3xl font-medium sm:text-5xl">What We Do</h2>
                    <p className="max-w-2xl text-pretty text-base text-neutral-900 sm:text-lg">{siteConfig.tagline} {siteConfig.fullName} supports countries in monitoring progress, generating research, strengthening public–private partnerships, and advancing media and information literacy policies.</p>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-0 divide-y divide-neutral-900/25 sm:mt-12 @xl:mt-12 @xl:grid @xl:grid-cols-3 @xl:gap-0 @xl:divide-y-0 @xl:divide-x @xl:divide-neutral-900/25">
                    <div className="py-5 first:pt-0 @xl:first:pt-6 @xl:py-6 @xl:pr-6 @xl:first:pl-0">
                        <p className="max-w-xl text-pretty text-base text-neutral-900 sm:text-lg">
                            <span className="font-medium text-foreground">Research</span> — Evidence-based analysis of media and information literacy for peace, justice, and sustainable development.
                        </p>
                    </div>
                    <div className="py-5 @xl:py-6 @xl:px-6">
                        <p className="max-w-xl text-pretty text-base text-neutral-900 sm:text-lg">
                            <span className="font-medium text-foreground">Policy</span> — Advancing national and international MIL strategies that promote informed societies.
                        </p>
                    </div>
                    <div className="py-5 last:pb-0 @xl:last:pb-6 @xl:py-6 @xl:pl-6 @xl:last:pr-0">
                        <p className="max-w-xl text-pretty text-base text-neutral-900 sm:text-lg">
                            <span className="font-medium text-foreground">Partnerships</span> — Strengthening public–private cooperation to build resilient and peaceful communities.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
