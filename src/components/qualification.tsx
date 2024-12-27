"use client";
import { useState } from "react";
import { GraduationCap, Briefcase } from "lucide-react";
import { motion } from "framer-motion";

type QualificationItem = {
  title: string;
  location: string;
  period: string;
};

const educationData: QualificationItem[] = [
  {
    title: "University of Management & Technology",
    location: "Lahore",
    period: "2020 - 2024",
  },
  {
    title: "Punjab Group of College",
    location: "Faisalabad",
    period: "2016 - 2018",
  },
  {
    title: "Divisional Public School",
    location: "Faisalabad",
    period: "2010 - 2016",
  },
  {
    title: "Anmol Public Primary School",
    location: "Faisalabad",
    period: "2005 - 2010",
  },
];

const experienceData: QualificationItem[] = [
  {
    title: "Associate Software Engineer",
    location: "Faisalabad",
    period: "May 2024 - Present",
  },
  {
    title: "Junior Backend Developer(Java)",
    location: "Lahore",
    period: "June 2023 - March 2024",
  },
  {
    title: "Frontend Developer Intern",
    location: "Lahore",
    period: "Aug 2022 - Oct 2022",
  },
];

export function Qualification() {
  const [activeTab, setActiveTab] = useState<"education" | "experience">(
    "education"
  );

  const timelineVariants = {
    hidden: { x: 200, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1 } },
    exit: { x: 200, opacity: 0, transition: { duration: 1 } },
  };

  return (
    <section id="qualification"   className="py-20 bg-gray-50 h-[80vh] sm:h-[120vh] px-2">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Qualification</h2>
          <p className="text-gray-600 mt-2">My personal journey</p>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-6 mb-6">
          <button
            onClick={() => setActiveTab("education")}
            className={`flex items-center gap-2 text-lg font-medium transition-colors ${
              activeTab === "education"
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <GraduationCap className="h-5 w-5" />
            Education
          </button>
          <button
            onClick={() => setActiveTab("experience")}
            className={`flex items-center gap-2 text-lg font-medium transition-colors ${
              activeTab === "experience"
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Briefcase className="h-5 w-5" />
            Experience
          </button>
        </div>

        {/* Timeline */}
        <motion.div
          className="relative"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={timelineVariants}
        >
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2 sm:block hidden" />

          {/* Timeline Items */}
          <div className="space-y-8 relative">
            {(activeTab === "education" ? educationData : experienceData).map(
              (item, index) => (
                <motion.div
                  key={index}
                  className="grid sm:grid-cols-2 grid-cols-1 gap-4 items-center relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  {index % 2 === 0 ? (
                    <>
                      {/* Left-aligned on desktop, centered on mobile */}
                      <div className="sm:text-right text-center">
                        <h3 className="font-medium text-lg sm:text-base text-sm">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 sm:text-sm text-xs">
                          {item.location}
                        </p>
                        <p className="text-sm text-gray-500">{item.period}</p>
                      </div>
                      <div className="hidden sm:block" />
                    </>
                  ) : (
                    <>
                      <div className="hidden sm:block" />
                      {/* Right-aligned on desktop, centered on mobile */}
                      <div className="sm:text-left text-center">
                        <h3 className="font-medium text-lg sm:text-base text-sm">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 sm:text-sm text-xs">
                          {item.location}
                        </p>
                        <p className="text-sm text-gray-500">{item.period}</p>
                      </div>
                    </>
                  )}

                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 sm:top-auto top-4 w-3 h-3 bg-gray-300 rounded-full transform -translate-x-1/2 sm:translate-y-0 sm:block hidden" />
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
