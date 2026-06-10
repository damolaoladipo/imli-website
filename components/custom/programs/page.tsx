import { Background } from "@/components/custom/background";
import Abouts from "@/components/features-one";
import { siteConfig } from "@/_data/site-config";


export default function ProgramsPage() {
  return (
    <>
      <Background>
        
        <div className="pt-20 pb-10 container flex min-h-[50vh] flex-col items-center justify-center text-center">
          
            {/* Hero Content */}
            <div className="text-center">
              <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-gray-900">
                Our Programs
              </h1>
              <p className="text-x text-gray-700">
                {siteConfig.tagline}

              </p>
            
          </div>
        </div>
         
         <Abouts />
      
      </Background>
    </>
  );
}
