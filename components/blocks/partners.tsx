import Image from "next/image";

export default function Partners() {
    return (
        <section>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-40">
                <div>
                    <p className="text-muted-foreground font-medium">Community partners :</p>

                    {/* Responsive grid */}
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-12 items-center justify-items-center">
                        <div className="flex">
                            <Image
                                src="mide.png"
                                alt="Mide logo"
                                height={60}
                                width={120}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex">
                            <Image
                                src="toyosi.png"
                                alt="Toyosi logo"
                                height={60}
                                width={120}
                                className="object-contain"
                            />
                        </div>
       
                        <div className="flex">
                            <Image
                                src="/afr.png"
                                alt="Africa Centre logo"
                                height={60}
                                width={120}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex">
                            <Image
                                src="/bipoc.png"
                                alt="BIPOC logo"
                                height={60}
                                width={120}
                                className="object-contain"
                            />
                        </div>
                        
                        <div className="flex">
                            <Image
                                src="/mycity.png"
                                alt="MyCity logo"
                                height={60}
                                width={120}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex">
                            <Image
                                src="/settle.png"
                                alt="Settle logo"
                                height={60}
                                width={150}
                                className="object-contain"
                            />
                        </div>
                         <div className="flex">
                            <Image
                                src="/crown.png"
                                alt="Crown logo"
                                height={60}
                                width={120}
                                className="object-contain"
                            />
                        </div>

                                          <div className="flex">
                            <Image
                                src="/theglobalma.svg"
                                alt="The Global MA logo"
                                height={80}
                                width={420}
                                className="object-contain"
                            />
                        </div>
                                         {/* <div className="flex h-20">
                            <Image
                                src="/csc.png"
                                alt="Canada Service Corps logo"
                                height={80}
                                width={320}
                                className="object-contain"
                            />
                        </div> */}
                        <div className="flex h-20">
                            <Image
                                src="/new/airi.png"
                                alt="AIRI logo"
                                height={80}
                                width={120}
                                className="object-contain"
                            />
                        </div>
                        {/* <div className="flex h-20 ">
                            <Image
                                src="/new/corps.png"
                                alt="Canada Service Corps logo"
                                height={80}
                                width={420}
                                className="object-contain"
                            />
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    )
}
