import { Background } from "@/components/custom/background";
import FAQs from "@/components/faqs-section-two";


export default function FAQPage() {
  return (
    <>
      <Background>
        
        <div className="pt-20 pb-10 container flex min-h-[50vh] flex-col items-center justify-center text-center">
          
            {/* Hero Content */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-gray-900">
                FAQs
              </h1>
              <p className="text-l text-gray-700">
                Frequently Asked Questions about AssureUs Club and our initiatives.
              </p>
            
          </div>
        </div>

        
        <FAQs/>
      </Background>
    </>
  );
}
