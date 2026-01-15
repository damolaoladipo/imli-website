import ContactUsSection from "@/components/blocks/contact-us";
import { Background } from "@/components/custom/background";


export default function ContactPage() {
  return (
    <>
      <Background>
        
        <div className="pt-20 pb-10 container flex min-h-[50vh] flex-col items-center justify-center text-center">
          
            {/* Hero Content */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-4xlfont-bold mb-6 text-gray-900">
                Contact Us
              </h1>
              <p className="text-x text-gray-700">
                Welcome to AssureUs Club. Where impact is our benchmark.
              </p>
            
          </div>
        </div>

        <ContactUsSection />
      </Background>
    </>
  );
}
