import { Background } from "@/components/custom/background";
import { Feature1 } from "@/components/feature1";
import { Feature2 } from "@/components/feature2";
import { siteConfig } from "@/_data/site-config";

export default function AboutPage() {
  return (
    <Background>
      <div className="pt-20 pb-10 container flex min-h-[50vh] flex-col items-center justify-center text-center">
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-gray-900">
            About {siteConfig.name}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {siteConfig.tagline}
          </p>
        </div>
      </div>

      <Feature1
        title="About the International Media and Information Literacy Institute"
        description={siteConfig.description}
        imageSrc="/new/mision.png"
        imageAlt="IMILI observatory"
      />
      <Feature2
        title="Our Mission"
        description="The International Institute supports countries in monitoring progress, generating research, strengthening public–private partnerships, and advancing media and information literacy policies that promote informed, resilient and peaceful societies."
        imageSrc="/new/vision.png"
        imageAlt="Global media and information literacy collaboration"
      />
    </Background>
  );
}
