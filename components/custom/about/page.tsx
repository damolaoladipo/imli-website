import { Background } from "@/components/custom/background";
import FeaturesSection3 from "@/components/features-three";
import TeamSection1 from "@/components/team";

export default function AboutPage() {
  return (
    <Background>
      <div className="pt-20 pb-10 container flex min-h-[50vh] flex-col items-center justify-center text-center">
        {/* Hero Content */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-gray-900">
            About us
          </h1>
          <p className="text-xl text-gray-700">
            Welcome to AssureUs Club. Where impact is our benchmark.
          </p>
        </div>
      </div>

      {/* Sections */}
      <FeaturesSection3 />
      <TeamSection1 />
    </Background>
  );
}
