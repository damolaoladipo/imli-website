import { ArrowLeft } from "lucide-react";
import { CustomButton } from "@/components/custom/custom-button";
import { Background } from "@/components/custom/background";

export default function NotFound() {
  return (
    <Background>
      <div className="container flex min-h-[70vh] flex-col items-center justify-center py-28 text-center lg:min-h-[80vh] lg:py-32">
        <div className="relative z-10 max-w-2xl">
          <h1 className="from-foreground to-foreground/70 relative mb-6 bg-linear-to-br bg-clip-text py-2 text-5xl font-bold text-transparent sm:text-6xl lg:text-7xl">
            Page Not Found
          </h1>

          <p className="text-muted-foreground mb-10 text-xl">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might
            have been removed or the URL might be incorrect.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <CustomButton
              href="/"
              icon={<ArrowLeft className="size-5 sm:size-6" strokeWidth={1.75} />}
            >
              Back to Home
            </CustomButton>
            <CustomButton href="/contact">Send us a message</CustomButton>
          </div>
        </div>
      </div>
    </Background>
  );
}
