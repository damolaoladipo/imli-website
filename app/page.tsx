import { AboutUs } from "@/components/custom/about-us";
import CallToAction from "@/components/blocks/call-to-action";
import Partners from "@/components/blocks/partners";
import { Background } from "@/components/custom/background";
import Hero from "@/components/custom/hero";
import Impact from "@/components/custom/impact";

import { Feature2 } from "@/components/feature2";

export default function Home() {
  return (
    <>
    <Hero/>
      {/* <HeroSection /> */}

      <Background>

        <Impact/>

        <Partners />

        <AboutUs
          title="Our Vision"
          description="To collectively shape the learning, leadership, and lifestyle culture of international students, immigrants, and refugee youth across Canada."
          imageSrc="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
          imageAlt="Diverse group of young people"
      
        />
   

        <CallToAction />
      </Background>
    </>
  );
}
