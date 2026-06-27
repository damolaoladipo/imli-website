import { ArrowLeft } from "lucide-react";
import {
  CustomButton,
} from "@/components/custom/custom-button";
import { customButtonIconClassName } from "@/components/custom/custom-button-styles";
import { Background } from "@/components/custom/background";

export default function NotFound() {
  return (
    <Background className="mx-0 mt-0 flex min-h-[calc(100dvh-5rem)] items-center justify-center rounded-none">
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
   

        <p className="text-muted-foreground mb-10 text-2xl">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might
          have been removed or the URL might be incorrect.
        </p>

        <CustomButton
          href="/"
          icon={
            <ArrowLeft
              className={customButtonIconClassName}
              strokeWidth={1.75}
            />
          }
        >
          Back to Home
        </CustomButton>
      </div>
    </Background>
  );
}
