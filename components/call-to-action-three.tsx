import { CustomButton } from '@/components/custom/custom-button'

export default function StatsSection() {
    return (
        <section>
            <div className="bg-muted py-12">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="text-foreground max-w-lg text-balance text-3xl font-semibold lg:text-4xl">
                        <span className="text-muted-foreground">Build Modern Websites.</span> Drive Results
                    </h2>
                    <p className="mt-4 text-lg">Libero sapiente aliquam quibusdam aspernatur, praesentium iusto repellendus.</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <CustomButton href="#">
                            Try Mist for Free
                        </CustomButton>
                        <CustomButton href="#">
                            Request a Demo
                        </CustomButton>
                    </div>
                </div>
            </div>
        </section>
    )
}
