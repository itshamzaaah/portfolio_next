"use client";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const frontendSkills = [
  { name: "JavaScript", level: "Advanced" },
  { name: "Material UI", level: "Intermediate" },
  { name: "Tailwind CSS", level: "Intermediate" },
  { name: "React", level: "Intermediate" },
  { name: "Next", level: "Intermediate" },
  { name: "TypeScript", level: "Intermediate" },
];

const backendSkills = [
  { name: "Node.js", level: "Intermediate" },
  { name: "Spring Boot 3", level: "Intermediate" },
  { name: "MySQL", level: "Intermediate" },
  { name: "NoSQL", level: "Intermediate" },
  { name: "TortoiseGit", level: "Intermediate" },
  { name: "GitHub", level: "Intermediate" },
];

export function Skills() {
  const frontendAnimation = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  const backendAnimation = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  };

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-x-hidden pb-12 rounded-2xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          viewport={{ once: false }}
        >
          <h2 className="text-3xl font-bold text-black">Skills</h2>
          <p className="text-gray-600 mt-2">My technical level</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 text-black">
          {/* Frontend Skills Card */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg overflow-hidden"
            initial="hidden"
            whileInView="visible"
            exit="exit"
            variants={frontendAnimation}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4">Frontend developer</h3>
            <div className="grid grid-cols-2 gap-4">
              {frontendSkills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-2">
                  <CheckCircle className="text-gray-600 w-4 h-4" />
                  <div>
                    <p className="font-medium">{skill.name}</p>
                    <p className="text-sm text-gray-600">{skill.level}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Backend Skills Card */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-lg overflow-hidden"
            initial="hidden"
            whileInView="visible"
            exit="exit"
            variants={backendAnimation}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.5 }}
          >
            <h3 className="text-xl font-bold mb-4">Backend developer</h3>
            <div className="grid grid-cols-2 gap-4">
              {backendSkills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-2">
                  <CheckCircle className="text-gray-600 w-4 h-4" />
                  <div>
                    <p className="font-medium">{skill.name}</p>
                    <p className="text-sm text-gray-600">{skill.level}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
