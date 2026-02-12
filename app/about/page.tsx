import { Background } from "@/components/custom/background";
import { Feature1 } from "@/components/feature1";
import { Feature2 } from "@/components/feature2";
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
              <Feature1
          title="Our Vision"
          description="To collectively shape the learning, leadership, and lifestyle culture of international students, immigrants, and refugee youth across Canada."
          imageSrc="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
          imageAlt="Diverse group of young people"
          buttonPrimary={{ text: "Learn Our Story", href: "/about" }}
          buttonSecondary={{ text: "Join Us", href: "#join-volunteer" }}
        />
        <Feature2
          title="Our Mission"
          description="To build a connected, celebratory, and growth-oriented community where young people can discover their unique strengths, develop their leadership potential, and contribute meaningfully to society."
          imageSrc="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
          imageAlt="Community collaboration and teamwork"
          buttonPrimary={{ text: "Get Involved", href: "#join-volunteer" }}
          buttonSecondary={{ text: "Explore Programs", href: "/auc-campaign" }}
        />

    </Background>
  );
}
