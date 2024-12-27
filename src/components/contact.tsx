"use client";
import { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, project });
  };

  // Define variants for the animations
  const TalkToMeAnimation = {
    hidden: { x: "-50%", opacity: 0 },
    visible: { x: "0%", opacity: 1, transition: { duration: 1 } },
    exit: { x: "-50%", opacity: 0, transition: { duration: 1 } },
  };

  const WriteYourProjectAnimation = {
    hidden: { x: "50%", opacity: 0 },
    visible: { x: "0%", opacity: 1, transition: { duration: 1 } },
    exit: { x: "50%", opacity: 0, transition: { duration: 1 } },
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gray-50 overflow-hidden px-2"
      style={{ fontFamily: "Barlow Condensed, sans-serif" }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Contact Me</h2>
          <p className="text-gray-600 mt-2">Get in touch</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:px-8">
          {/* Talk to Me Section */}
          <motion.div
            className="space-y-6 flex flex-col items-center md:items-start w-full overflow-hidden"
            variants={TalkToMeAnimation}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <div className="w-full sm:w-3/4 md:w-full max-w-full px-4 pb-5">
              <h3 className="text-xl font-semibold mb-8 text-center md:text-left">
                Talk to me
              </h3>
              <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-lg mb-4 hover:shadow-xl transform hover:scale-105 md:hover:scale-105 hover:scale-100 transition-all duration-300 max-w-full">
                <Mail className="text-gray-600 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-gray-600 truncate">
                    maratib.hamza@gmail.com
                  </p>
                  <a
                    href="mailto:maratib.hamza@gmail.com"
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Write me →
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 md:hover:scale-105 hover:scale-100 transition-all duration-300 max-w-full">
                <Phone className="text-gray-600 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Whatsapp</h4>
                  <p className="text-gray-600 truncate">+92 313 6877063</p>
                  <a
                    href="https://wa.me/+923016639195"
                    className="text-sm text-gray-600 hover:underline"
                  >
                    Write me →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Write Your Project Section */}
          <motion.div
            variants={WriteYourProjectAnimation}
            initial="hidden"
            whileInView="visible"
            exit="exit"
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: false, amount: 0.5 }}
            className="w-full  overflow-hidden"
          >
            <h3 className="text-xl font-semibold mb-6">
              Write me your thoughts
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <fieldset className="border border-gray-300 rounded-lg p-3">
                <legend className="block text-sm font-medium text-gray-600">
                  Your Name
                </legend>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 border-none bg-gray-50 focus:outline-none focus:ring-none"
                  placeholder="Insert your name"
                  style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                />
              </fieldset>

              <fieldset className="border border-gray-300 rounded-lg p-3">
                <legend className="block text-sm font-medium text-gray-600">
                  Your Email
                </legend>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 border-none bg-gray-50 focus:outline-none focus:ring-none"
                  placeholder="Insert your email"
                  style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                />
              </fieldset>

              <fieldset className="border border-gray-300 rounded-lg p-3">
                <legend className="block text-sm font-medium text-gray-600">
                  Your Message
                </legend>
                <textarea
                  id="project"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  required
                  rows={4}
                  className="w-full p-3 border-none bg-gray-50 focus:outline-none focus:ring-none"
                  placeholder="Write your thoughts here"
                  style={{ fontFamily: "Barlow Condensed, sans-serif" }}
                />
              </fieldset>

              <button
                type="submit"
                className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition"
                style={{ fontFamily: "Barlow Condensed, sans-serif" }}
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
