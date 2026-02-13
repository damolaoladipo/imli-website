export default function Impact() {
    return (
        <section className="bg-[#FBAF4B] @container py-12 sm:py-16 md:py-24 lg:py-40">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <div className="space-y-3 sm:space-y-4">
                    <h2 className="text-balance text-3xl font-medium sm:text-4xl">Our Impact</h2>
                    <p className="max-w-xl text-pretty text-base text-neutral-900 sm:text-lg">AssureUs Club is building a stronger, more connected community of young people across Canada who are discovering their potential and creating positive change.</p>
                </div>
                <div className="mt-8 grid grid-cols-1 gap-0 divide-y divide-neutral-900/25 sm:mt-12 @xl:mt-12 @xl:grid @xl:grid-cols-3 @xl:gap-0 @xl:divide-y-0 @xl:divide-x @xl:divide-neutral-900/25">
                    <div className="py-5 first:pt-0 @xl:first:pt-6 @xl:py-6 @xl:pr-6 @xl:first:pl-0">
                        <p className="max-w-xl text-pretty text-base text-neutral-900 sm:text-lg">
                            <span className="font-medium text-foreground">1000+</span> Young people engaged.
                        </p>
                    </div>
                    <div className="py-5 @xl:py-6 @xl:px-6">
                        <p className="max-w-xl text-pretty text-base text-neutral-900 sm:text-lg">
                            <span className="font-medium text-foreground">10+</span> Community events annually.
                        </p>
                    </div>
                    <div className="py-5 last:pb-0 @xl:last:pb-6 @xl:py-6 @xl:pl-6 @xl:last:pr-0">
                        <p className="max-w-xl text-pretty text-base text-neutral-900 sm:text-lg">
                            <span className="font-medium text-foreground">20+</span> Active volunteers.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}