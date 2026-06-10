import ContactUsSection from "@/components/blocks/contact-us";
import { Background } from "@/components/custom/background";
import { siteConfig } from "@/_data/site-config";


export default function EventPage() {
  return (
    <>
      <Background>
        
        <div className="pt-20 pb-10 container flex min-h-[50vh] flex-col items-center justify-center text-center">
          
            {/* Hero Content */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-gray-900">
                Our Events
              </h1>
              <p className="text-l text-gray-700">
                 {siteConfig.tagline}
              </p>
            
          </div>
        </div>

        <ContactUsSection />
      </Background>
    </>
  );
}
