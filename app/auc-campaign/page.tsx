import { Background } from "@/components/custom/background";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  MapPin,
  Ticket,
} from "lucide-react";
import Script from "next/script";

export default function AucCampaign() {
  return (
    <>
      <Background>
        <div className="pt-30 pb-16 ">
          <div className="mx-auto lg:px-8 relative overflow-hidden rounded-2xl bg-linear-to-r from-neutral-900 via-neutral-950 to-[#BD3D52] px-6 py-20 sm:px-8 sm:py-40 shadow-xl">
            <div className="relative overflow-hidden ">
              <div className="relative z-10 mx-auto max-w-4xl text-center">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                  AUC 100-hour Learning Challenge
                </h1>
                <p className="mt-4 text-base sm:text-lg text-indigo-100 max-w-3xl mx-auto leading-relaxed">
                  An Alberta-wide youth learning and leadership activation. Community event for all — a two day launch featuring an Author Panel and the 100-Hour Learning Challenge kickoff.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row sm:justify-center gap-4 items-center">
                  <a
                    href="https://luma.com/2nfys68o"
                    aria-label="Register for AUC 100-hour Learning Challenge"
                    className="luma-checkout--button group inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-[#FBAF4B]! md:bg-[#BD3D52]! px-6 py-4 sm:py-3 text-lg sm:text-base font-semibold text-white shadow hover:opacity-95 text-center transition-colors"
                    data-luma-action="checkout"
                    data-luma-event-id="2nfys68o"
                  >
                     <span>Register Today</span>
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                  </a>

                      {/* <a
                    href="https://luma.com/2nfys68o"
                    aria-label="Register for AUC 100-hour Learning Challenge"
                    className="luma-checkout--button group inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-[#BD3D52] px-6 py-4 sm:py-3 text-lg sm:text-base font-semibold text-white shadow hover:opacity-95 text-center transition-colors"
                    data-luma-event-id="2nfys68o"
                  >
                   
                  </a> */}

                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-indigo-100 w-full">
                  <span className="w-full text-center sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/20 px-3 py-1">
                    <Calendar className="size-3.5 shrink-0" aria-hidden /> Feb 20–21
                  </span>
                  <span className="w-full text-center sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/20 px-3 py-1">
                    <MapPin className="size-3.5 shrink-0" aria-hidden /> Alberta — Virtual + In-person
                  </span>
                  <span className="w-full text-center sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white/20 px-3 py-1">
                    <Ticket className="size-3.5 shrink-0" aria-hidden /> Registration required
                  </span>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 z-0 opacity-30 blur-3xl" />
            </div>

            <section id="details" className="mx-auto mt-10 max-w-4xl">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/90 p-4 sm:p-6 shadow-md ring-1 ring-gray-100">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="shrink-0">
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">Day 1 — Thursday, February 20</h3>
                      <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                        <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-2 py-0.5 sm:px-3 sm:py-1">
                          <Clock className="size-3.5 shrink-0" aria-hidden /> 6:30 PM MST
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-2 py-0.5 sm:px-3 sm:py-1">
                          <MapPin className="size-3.5 shrink-0" aria-hidden /> Virtual
                        </span>
                      </div>

                      <p className="mt-3 text-base text-gray-600">Three Black female local authors — women from different generations — in honest conversation on post-secondary navigation, workforce, entrepreneurship, community leadership, and building wealth. Virtual live stream — access details sent after registration.</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/90 p-4 sm:p-6 shadow-md ring-1 ring-gray-100">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="shrink-0">
       
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">Day 2 — Friday, February 21</h3>
                      <div className="mt-1 flex flex-wrap itemsƒ-center gap-3 text-sm text-gray-600">
                        <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-2 py-0.5 sm:px-3 sm:py-1">
                          <Clock className="size-3.5 shrink-0" aria-hidden /> 2:00 PM MST
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-2 py-0.5 sm:px-3 sm:py-1">
                          <MapPin className="size-3.5 shrink-0" aria-hidden /> In-Person
                        </span>
                      </div>

                      <p className="mt-3 text-base text-gray-600">Join leaders, parents, educators, and community builders to support the next wave of youth learning and leadership. In-person kickoff — please register to secure your attendance.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-lg bg-white/90 p-4 sm:p-6 text-base text-gray-700">
                <p>As part of the launch of <strong>#TheAUCSpotlightCampaign</strong>, this virtual Author Panel features honest conversations and permission for young people to tell their stories and lead with confidence.</p>
                <p className="mt-3">We acknowledge the support of Africa Centre and the Canada Service Corps (CSC) for making this campaign launch possible through the Black Youth Leadership Program.</p>
              </div>
            </section>
          </div>
        </div>



    <Script id="luma-checkout" src="https://embed.lu.ma/checkout-button.js" strategy="afterInteractive" />
      </Background>
    </>
  );
}
