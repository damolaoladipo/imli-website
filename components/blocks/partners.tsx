import Image from "next/image";

export default function Partners() {
    return (
        <section>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <div>
                    <p className="text-muted-foreground font-medium">Community partners :</p>

                    {/* Responsive grid */}
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-12 items-center justify-items-center">
                        <div className="flex">
                            <Image
                                src="mide.png"
                                alt="mide Logo"
                                height={60}
                                width={120}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex">
                            <Image
                                src="toyosi.png"
                                alt="MWF Logo"
                                height={60}
                                width={420}
                                className="object-contain"
                            />
                        </div>
       
                        <div className="flex">
                            <Image
                                src="/afr.png"
                                alt="Corner Logo"
                                height={60}
                                width={120}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex">
                            <Image
                                src="/bipoc.png"
                                alt="Pacepard Logo"
                                height={60}
                                width={120}
                                className="object-contain"
                            />
                        </div>
                        
                        <div className="flex">
                            <Image
                                src="/mycity.png"
                                alt="Corner Logo"
                                height={60}
                                width={120}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex">
                            <Image
                                src="/settle.png"
                                alt="Pacepard Logo"
                                height={60}
                                width={120}
                                className="object-contain"
                            />
                        </div>
                         <div className="flex">
                            <Image
                                src="/crown.png"
                                alt="Pacepard Logo"
                                height={60}
                                width={120}
                                className="object-contain"
                            />
                        </div>

                                          <div className="flex">
                            <Image
                                src="/theglobalma.svg"
                                alt="RLC Logo"
                                height={80}
                                width={120}
                                className="object-contain"
                            />
                        </div>
                                         <div className="flex h-20">
                            <Image
                                src="/csc.png"
                                alt="RLC Logo"
                                height={80}
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
