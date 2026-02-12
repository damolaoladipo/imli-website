export default function Impact() {
    return (
        <section className="bg-[#FBAF4B] @container py-40">
            <div className="mx-auto max-w-2xl px-6">
                <div className="space-y-4">
                    <h2 className="text-balance text-4xl font-medium">Our Impact</h2>
                    <p className="text-neutral-900 text-base md:text-lg max-w-xl text-pretty">AssureUs Club is building a stronger, more connected community of young people across Canada who are discovering their potential and creating positive change.</p>
                </div>
                <div className="@xl:grid-cols-3 mt-12 grid grid-cols-2 gap-6 text-sm divide-x">
                    <div className="py-6" >
                        <p className="text-neutral-900 text-base md:text-lg max-w-xl text-pretty">
                            <span className="text-foreground font-medium">1000+</span> Young people engaged.
                        </p>
                    </div>

                    <div className="py-6 px-6">
                        <p className="text-neutral-900 text-base md:text-lg max-w-xl text-pretty">
                            <span className="text-foreground font-medium">10+</span> Community events annually.
                        </p>
                    </div>

                    <div className="py-6 px-6">
                        <p className="text-neutral-900 text-base md:text-lg max-w-xl text-pretty">
                            <span className="text-foreground font-medium">20+</span> Active volunteers.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}