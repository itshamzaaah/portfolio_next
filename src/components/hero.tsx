"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Hand, ArrowUp } from "lucide-react";

export function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  const [gradient, setGradient] = useState(
    "radial-gradient(circle, rgba(0,0,0,0.6) 10%, rgba(0,0,0,0) 60%)"
  );
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      x.set(e.clientX - 5);
      y.set(e.clientY - 5);
    };

    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let color = "rgba(58, 58, 58, 0.6)";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          if (section.id === "home") color = "rgba(58, 58, 58, 0.6)";
          else if (section.id === "about") color = "rgba(58, 58, 58, 0.6)";
          else if (section.id === "contact") color = "rgba(58, 58, 58, 0.6)";
        }
      });
      setGradient(`radial-gradient(circle, ${color} 10%, rgba(0,0,0,0) 60%)`);

      setShowScrollButton(window.scrollY > 300);
    };

    const checkMobileScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobileScreen);

    checkMobileScreen();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobileScreen);
    };
  }, [x, y]);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-16 flex items-center bg-gradient-to-b from-white to-gray-50 relative px-2"
    >
      <div className="container mx-auto">
        <div className="w-full">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 relative z-10 border border-red-600">
              <h1 className="text-4xl text-black sm:text-5xl lg:text-6xl font ">
                Hamza Maratib
              </h1>
              <p className="text-xl text-gray-600 flex items-center">
                <span className="w-[20%] border-t-2 border-gray-400 mr-2"></span>{" "}
                Full Stack Software Engineer
              </p>

              <p className="text-gray-600 max-w-md">
                I&apos;m a Full Stack Software Engineer based in Pakistan, and
                I&apos;m very passionate and dedicated to my work.
              </p>
              <motion.button
                className="bg-black text-white px-6 py-3 rounded-full flex items-center space-x-2 transition hover:bg-gray-800"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={scrollToContact}
              >
                <span>Say Hello</span>
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={
                    isHovering
                      ? {
                          rotate: [0, 20, -20, 20, 0],
                        }
                      : { rotate: 0 }
                  }
                  transition={{
                    duration: 0.6,
                    repeat: isHovering ? Infinity : 0,
                    repeatType: "loop",
                  }}
                >
                  <Hand className="w-5 h-5" />
                </motion.div>
              </motion.button>
            </div>
            <div className="relative z-10">
              <div
                className="aspect-square relative mx-auto rounded-full shadow-lg"
                style={{
                  maxWidth: "250px",
                  width: "150%",
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
                }}
              >
                <Image
                  src="https://drive.google.com/uc?export=download&id=1r_RDA6WaTDiJeMtPhM5DhIwwhJU_ynyu"
                  alt="Profile"
                  fill
                  className="object-cover rounded-full grayscale"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isMobile && (
        <motion.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 20,
            height: 20,
            background: gradient,
            borderRadius: "50%",
            x: springX,
            y: springY,
            pointerEvents: "none",
            zIndex: 5,
            mixBlendMode: "multiply",
            filter: "blur(2px)",
          }}
        />
      )}

      {showScrollButton && !isMobile && (
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gray-800 text-white p-3 rounded-lg shadow-lg hover:bg-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          exit={{ opacity: 0 }}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
          }}
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </section>
  );
}
