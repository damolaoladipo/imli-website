 "use client"

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

// Assuming you have a standard Button component in your project
import { CustomButton } from '@/components/custom/custom-button'; 

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.15, // Stagger animation for the cards
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

// --- Component for the individual Project Card ---
interface ProjectCardProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  altText: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, subtitle, description, imageSrc, altText }) => {
  return (
    <motion.div
      className="group relative h-96 w-full overflow-hidden rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-2xl"
      variants={itemVariants}
    >
      {/* Background Image with Dark Overlay */}
      <Image
        src={imageSrc}
        alt={altText}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50 transition-colors duration-300 group-hover:bg-black/65"></div>

      {/* Card Content */}
      <div className="relative flex h-full flex-col justify-end p-6 text-white">
        <h3 className="  text-l font-bold uppercase tracking-widest text-white/80">{subtitle}</h3>
        <h2 className="mb-2 text-2xl font-bold leading-tight">{title}</h2>
        <p className="mb-6 line-clamp-3 text-sm text-white/90">{description}</p>

        {/* Learn More Button */}
        <CustomButton href="#link-to-project">
          Learn more
        </CustomButton>
      </div>
    </motion.div>
  );
};

// --- Main Projects Component ---
export default function ProjectsSection() {
  const projects = [
    {
      title: 'Career Benchmark Masterclass.',
      subtitle: 'Rewriting the Rules.',
      description: `Young African Leaders Initiative(YALI) Network Lagos in partnership with IHTIL Coaching successfully organised 2days Career Benchmark Masterclass titled; “Rewriting the Rules” which was held on the 9th and 10th of October at American Corner Lekki.

The masterclass empowered over 30 youths with employability skills, Résumé writing, interview skills and use of some office tools like Microsoft Word, excel, google forms, e-mail and others. This training was borne out of the organisations understanding of the causes of the high rate of unemployment in Nigeria and their willingness to proffer solutions to them. The training also equipped young entrepreneurs with relevant skills to succeed in the business world.

Outstanding and accomplished facilitators were invited to train the participants. The participants were taken through practical exercises that sharpened their skills for efficient performance at work. Emphasis was also placed on soft and hard skills which are both essential for success at the workplace. 

The team lead of IHTIL Coaching Ginika Obinna Okorie took the participants through some sessions and advised them to be mentally ready to achieve success at their various places of work. The coordinator of IMILI, Mr. Ojo Semasa advised the participants to put into practice every bit of knowledge they've acquired during the training. He emphasised that it's not enough to attend trainings and bootcamp until the knowledge and skills acquired are put to use.

The training ended with an assessment of each of the participants and feedback from the assessors then certification of successful participants. Members of the organising team that made the project a success are Olumide Hamzat, Adeyemi Oluwabunmi, Goldy Godfrey, Elisha Oghenekevbe Umukoro and Jesse Nosike-Imala.

Both organisations reiterate their commitment to keep working together to equip young Nigerians with needed skills to get dream jobs and succeed at the various places of work.

Ojo Semasa 
Coordinator 
YNL.`,
      imageSrc: '/new/humans.png', // Ploceholder for the middle image
      altText: 'Smiling children in an outdoor charity event.',
    },
    {
      title: 'July Intending Members Project',
      subtitle: 'Motorist Refuse Disposal Campaign',
      description: `This trailblazing initiative stands out as one of the most impactful projects by any cohort this year.

Highlights

Installed 20+ mini trash bins inside buses at Makoko Garage, Yaba

Carried out a clean-up exercise in the area.

Recorded an amazing campaign video that will be available later this week.

Donated a large waste bin to further promote cleanliness


The NURTW representative present commended the team, describing the initiative as a transformative step towards ensuring Lagos roads remain clean and free from litter.

Kudos to our July Cohort for this inspiring effort towards a cleaner and healthier community

Adeyemi Oluwabunmi
Cohort Manager 
For Programs committee IMILI`,
      imageSrc: '/new/mision.png', // Ploceholder for the middle image
      altText: 'Group of people on an excursion.',
    },
    {
      title: 'Community Medical outreach',
      subtitle: 'YALI Lagos medical checkups & food distribution program',
      description: `On Saturday, 28th June 2025, IMILI, in collaboration with some partner organizations, successfully held a community medical outreach in Oshodi, Lagos. The outreach aimed to provide essential health and welfare services to underserved members of the community, and it turned out to be a remarkable success.

During the outreach, we were able to reach almost 200 individuals, offering them free medical consultations, drug prescriptions and distributions, vitals checks (such as blood pressure and temperature), as well as nutritious meals. The outreach provided critical access to healthcare for individuals who may otherwise not be able to afford or access these basic services, and it served as a platform to engage the community in conversations about wellness and preventive health.

This outreach would not have been possible without the tireless commitment and support of our volunteers from IMILI. From medical checkups to food distribution, our members displayed a level of dedication and passion that truly defines what it means to lead and serve. The energy, efficiency, and teamwork exhibited, especially by the medical and welfare teams, were nothing short of inspiring. As one observer aptly put it, “IMILI volunteers carried the whole medical and welfare on their head like it’s a market.” That humorous expression captures the spirit, strength, and zeal with which our team served the community.

We deeply appreciate every single volunteer who contributed to this effort, your impact was deeply felt, and your commitment did not go unnoticed. You are the real MVPs, and your actions continue to uphold the values and vision of IMILI. It’s important to remember that IMILI is not a building or a brand; it is the people, it is you. Without each and every one of you, this network does not exist. You all are IMILI.

As we look ahead, we are excited about the many other meaningful and transformative projects that are already in the pipeline. We will continue to count on your active involvement, your time, your skills, and your hearts. Together, we are building something powerful, a network that truly lives up to its mission of empowering young leaders and driving positive change in our communities.

IMILI shall never be small, and none of us shall ever be small. 

Thank you once again for being part of something impactful, for showing up, and for standing up for humanity through service.`,
      imageSrc: '/new/vision.png', // Ploceholder for the middle image
      altText: 'A group attending a public awareness meeting.',
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Area */}
        <motion.div
          className="mb-12 max-w-2xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-0.5 w-12 bg-primary mb-3"></div>
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            PROJECTS WE HAVE DONE
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground leading-tight">
            We are a diverse community delivering impactful projects that empower young Nigerians to thrive.
          </h2>
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              subtitle={project.subtitle}
              description={project.description}
              imageSrc={project.imageSrc}
              altText={project.altText}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}