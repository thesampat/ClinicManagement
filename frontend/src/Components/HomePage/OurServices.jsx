import React, { useEffect } from 'react'

import AOS from "aos";
import "aos/dist/aos.css";

const servicesData = [
    {
        title: "General health care",
        desc: "Interactively procrastinate high-payoff content without backward-compatible data. Quickly cultivate optimal processes.",
        icon: "https://www.saih.in/images/diagnosis/2020-04-24-23-45-10_Health-general.png"
    }, {
        title: "Dental services",
        desc: "Objectively innovate empowered manufactured products whereas parallel platforms. Holisticly predominate extensible testing procedures.",
        icon: "https://www.thantakit.com/wp-content/uploads/2022/03/ING_19036_06692-compressed-scaled.jpg"
    }, {
        title: "Screening",
        desc: "Proactively envisioned multimedia based expertise and cross-media growth strategies. Seamlessly visualize quality intellectual capital.",
        icon: "https://multiplesclerosisnewstoday.com/wp-content/uploads/2017/10/shutterstock_347982614.jpg"
    }, {
        title: "Orthopedics",
        desc: "Collaboratively administrate turnkey channels whereas virtual e-tailers. Objectively seize scalable metrics whereas proactive e-services.",
        icon: "https://media.fmp-data.bliss.build/images/Orthopedics.format-jpeg.jpegquality-75.jpg"
    }, {
        title: "Laboratory",
        desc: "Credibly innovate granular internal or “organic” sources whereas high standards in web-readiness. Energistically scale future-proof core competencies.",
        icon: "https://thumbs.dreamstime.com/b/medical-laboratory-microscope-chemistry-biology-lab-test-scientific-research-development-healthcare-concept-background-149837485.jpg"
    }, {
        title: "Pediatrics",
        desc: "Interactively procrastinate high-payoff content without backward-compatible data. Quickly cultivate optimal processes and tactical architectures.",
        icon: "https://chblob.icloudhospital.com/imagecontainer/3-pediatrics-452b9f55-f749-4241-bde0-a211071067a9.jpg"
    },
]



export default function OurServices() {

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <div className='min-h-[100vh] flex flex-col items-center justify-center bg-primary-500 py-12'>
          <h1 className="mb-2 mt-0 text-5xl font-bold leading-tight text-primary-300" data-aos="fade-up">Our Services</h1>
          <p className='font-semibold lg:px-36 px-8 text-justify' data-aos="fade-up">Compellingly embrace empowered e-business after user-friendly intellectual capital. Interactively actualize front-end processes with effective convergence.</p>
    
          <div className="p-4 mt-2 rounded-lg md:p-8">
            <dl className="grid max-w-screen-xl gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 sm:p-8">
              {/* map here */}
              {servicesData.map((service, index) => (
                <div key={index} data-aos="fade-up" className="bg-gray-100 border-2 border-primary-400 rounded-lg p-4 mt-6">
                  {/* Your Service Card Component */}
                  <div className="flex justify-center md:justify-end -mt-16">
<img className="w-24 h-24 object-cover rounded-full border-2 border-primary-400" src={service.icon} alt="Testimonial Author" />
</div>

<h2 className="text-xl font-medium " > {service.title} </h2>
<p className="text-justify mt-2 " > {service.desc}  </p>
                </div>
              ))}
            </dl>
          </div>
        </div>
      );
}


