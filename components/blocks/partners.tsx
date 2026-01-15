import Image from "next/image";

export default function Partners() {
    return (
        <section>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div>
                    <p className="text-muted-foreground font-medium">Sponsors and partners :</p>

                    {/* Responsive grid */}
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-12 items-center justify-items-center">
                        <div className="flex">
                            <Image
                                src="/blocks/consulate.svg"
                                alt="Consulate Logo"
                                height={60}
                                width={120}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex">
                            <Image
                                src="/blocks/mwf.svg"
                                alt="MWF Logo"
                                height={60}
                                width={120}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex">
                            <Image
                                src="/blocks/rlc.svg"
                                alt="RLC Logo"
                                height={60}
                                width={120}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex">
                            <Image
                                src="/blocks/corner.svg"
                                alt="Corner Logo"
                                height={60}
                                width={120}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex">
                            <Image
                                src="/blocks/pacepard-logo.svg"
                                alt="Pacepard Logo"
                                height={60}
                                width={120}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
