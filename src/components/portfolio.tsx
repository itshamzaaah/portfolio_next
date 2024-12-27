"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence to handle exit animations

type Project = {
  id: number;
  title: string;
  category: "web" | "app" | "design";
  image: string;
  description: string;
  technologies: { tech: string; skill: string }[]; // New field for technologies and skills
};

const projects: Project[] = [
  {
    id: 1,
    title: "AutoMotors",
    category: "app",
    image: "https://drive.google.com/uc?id=1UHchuTOhN0ob-QCEnEI9R2uv20Bw_pDE",
    description:
      "The Automotors Project is an automotive management platform for vehicle sales, bidding, and showroom operations. It allows users to bid on vehicles, manage vehicle listings, and interact with multiple showrooms. The platform features detailed vehicle specifications, real-time updates, and advanced search filters.",
    technologies: [
      { tech: "React.js", skill: "Frontend" },
      { tech: "Spring Boot 3", skill: "Backend" },
      { tech: "Javascript", skill: "Backend" },
      { tech: "MySQL", skill: "Database" },
      { tech: "TortoiseGit", skill: "Database" },
      { tech: "GitHub", skill: "Database" },
    ],
  },
  {
    id: 2,
    title: "POS - Jewels",
    category: "app",
    image: "https://drive.google.com/uc?id=1_QdbXy3ev9ILGEmhzqxOBQUsuQxaV0lw",
    description:
      "(POS) system is an application designed for managing inventory, sales, and repairs of jewelry items. Users can place orders and manage repairs, with admin functionalities for package upgrades and role-based access. The system includes ERP features for financial and customer management, as well as robust reporting and analytics for business insights.",
    technologies: [
      { tech: "Next.js", skill: "Backend" },
      { tech: "Typescript", skill: "Backend" },
      { tech: "Spring Boot 3", skill: "Framework" },
      { tech: "MySQL", skill: "Database" },
      { tech: "TortoiseGit", skill: "Database" },
      { tech: "GitHub", skill: "Database" },
    ],
  },
  {
    id: 3,
    title: "FYP - PaySwift",
    category: "web",
    image: "https://drive.google.com/uc?id=1qjyKCR8vFfoINTGy5ouwwkSzcR4Rrnmz",
    description:
      "PaySwift offers fast, secure, and seamless financial transactions with integrated Fund Management tools. Users can easily track balances, view transaction history, and automate payments. The platform provides real-time access to Stock Exchange Rates and Live Cryptocurrency ensuring informed investment decisions.",
    technologies: [
      { tech: "React.js", skill: "Frontend" },
      { tech: "Javascript", skill: "Frontend" },
      { tech: "Node.js", skill: "Backend" },
      { tech: "Express.js", skill: "Backend" },
      { tech: "MongoDB", skill: "Payment Gateway" },
      { tech: "GitHub", skill: "Payment Gateway" },
    ],
  },
];

type Filter = "all" | "web" | "app";

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const filteredProjects = projects.filter(
    (project) => activeFilter === "all" || project.category === activeFilter
  );

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  // Close the modal when clicking outside the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    // Attach event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section id="portfolio" className="py-20 bg-gray-50 h-[170vh] sm:h-[120vh]">
      <div className="container mx-auto">
        <div className="w-full px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-barlow-condensed text-black">
              Portfolio
            </h2>
            <p className="text-gray-600 mt-2 font-barlow-condensed">
              Most recent work
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            {(["all", "web", "app"] as Filter[]).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm font-medium border rounded-full transition duration-300 ${
                  activeFilter === filter
                    ? "bg-black text-white"
                    : "bg-transparent text-black hover:bg-black hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-6 text-black md:px-10">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-2xl hover:shadow-3xl transition duration-500 transform hover:scale-105 overflow-hidden"
              >
                {/* Card Image */}
                <div className="relative w-full h-40">
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill" // Ensure the image fills the parent container
                    objectFit="contain" // Ensures the image fits without being cropped
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold font-barlow-condensed">
                    {project.title}
                  </h3>
                  <button
                    onClick={() => openModal(project)}
                    className="mt-2 text-sm font-medium text-gray-700 bg-transparent border border-white flex items-center gap-1 px-3 py-1 rounded-full transition duration-300"
                  >
                    Detail <i className="ri-arrow-right-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal with Framer Motion for fade-in effect */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="px-2 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }} // Modal starts as transparent
            animate={{ opacity: 1 }} // Modal fades in
            exit={{ opacity: 0 }} // Modal fades out
            transition={{ duration: 0.5, ease: "easeIn" }} // Control the duration and easing
          >
            <motion.div
              ref={modalRef} // Attach the ref to the modal container
              className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative px-2 sm:px-6"
              initial={{ scale: 0.9, opacity: 0 }} // Modal starts smaller and transparent
              animate={{ scale: 1, opacity: 1 }} // Modal grows and becomes fully opaque
              exit={{ scale: 0.9, opacity: 0 }} // Modal shrinks and fades out
              transition={{ duration: 0.5, ease: "easeOut" }} // Control the transition
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl"
              >
                &times;
              </button>
              <div className="flex flex-col">
                {/* Title */}
                <h2 className="text-2xl font-semibold mb-4">
                  {selectedProject.title}
                </h2>

                {/* Description Heading */}
                <h3 className="text-lg font-semibold text-left">
                  Description:
                </h3>
                <p className="text-gray-600">{selectedProject.description}</p>

                {/* Technologies */}
                <div className="mt-2">
                  <h3 className="text-lg font-semibold text-left">
                    Technologies:
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div className="flex flex-col space-y-2">
                      {selectedProject.technologies.slice(0, 3).map((tech) => (
                        <div
                          key={tech.tech}
                          className="flex items-center text-gray-600"
                        >
                          <i className="ri-checkbox-circle-fill mr-2"></i>
                          <p>{tech.tech}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col space-y-2">
                      {selectedProject.technologies.slice(3).map((tech) => (
                        <div
                          key={tech.tech}
                          className="flex items-center text-gray-600"
                        >
                          <i className="ri-checkbox-circle-fill mr-2"></i>
                          <p>{tech.tech}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
