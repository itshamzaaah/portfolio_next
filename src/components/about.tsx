"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import { Briefcase, CheckCircle } from "lucide-react";
import { PanInfo } from "framer-motion";
import { Coffee } from "lucide-react"; // Import the Coffee icon

export function About() {
  const [isHovered, setIsHovered] = useState(false);
  const [spots, setSpots] = useState<
    {
      id: number;
      x: number;
      y: number;
      size: number;
      color: string;
    }[]
  >([]);
  const [burstSpots, setBurstSpots] = useState<
    {
      id: number;
      x: number;
      y: number;
      size: number;
    }[]
  >([]);
  const [scrollY, setScrollY] = useState(0); // Track scroll position
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  const colors = [
    "#B0B0B0",
    "#707070",
    "#3A3A3A",
    "#4B4B4B",
    "#B8B8B8",
    "#8A7F7D",
  ];

  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  const initialSpots = Array.from({ length: 25 }, (_, index) => ({
    id: index,
    x: Math.random() * 250,
    y: Math.random() * 250,
    size: Math.random() * 40 + 20,
    color: getRandomColor(),
  }));

  useEffect(() => {
    setSpots(initialSpots);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setScrollDirection((prev) =>
        window.scrollY > Number(prev) ? "down" : "up"
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSpotClick = (clickedSpot: {
    id: number;
    x: number;
    y: number;
  }) => {
    setSpots((prevSpots) =>
      prevSpots.filter((spot) => spot.id !== clickedSpot.id)
    );

    const newBurstSpots = Array.from({ length: 3 }, (_, index) => ({
      id: Date.now() + index,
      x: clickedSpot.x + (Math.random() * 100 - 50),
      y: clickedSpot.y + (Math.random() * 100 - 50),
      size: 20,
    }));

    setBurstSpots((prevBurstSpots) => [...prevBurstSpots, ...newBurstSpots]);

    setTimeout(() => {
      setBurstSpots([]);
    }, 1000);
  };

  const randomizePosition = () => ({
    x: Math.random() * 250,
    y: Math.random() * 250,
  });

  const handleDragEnd = (
    e: MouseEvent | TouchEvent,
    info: PanInfo,
    spot: { id: number; x: number; y: number; size: number }
  ) => {
    const { x, y } = info.point;
    const updatedSpots = spots.map((s) => {
      if (s.id === spot.id) {
        return { ...s, x, y };
      }

      const distance = Math.sqrt(Math.pow(x - s.x, 2) + Math.pow(y - s.y, 2));

      if (distance < s.size / 2 + spot.size / 2) {
        const angle = Math.atan2(y - s.y, x - s.x);
        const offset = s.size / 2 + spot.size / 2 - distance;
        const collisionX = x + Math.cos(angle) * offset;
        const collisionY = y + Math.sin(angle) * offset;

        return { ...s, x: collisionX, y: collisionY };
      }

      return s;
    });

    setSpots(updatedSpots);
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href =
      "https://drive.google.com/uc?export=download&id=1a840B1LEoy9N1Vw5FdT_NnD-ijjOzLrf";
    link.download = "My_CV.pdf";
    link.click();
  };

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <div className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">About Me</h2>
            <p className="text-gray-600 mt-2">My Introduction</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="relative w-full h-[400px] overflow-hidden">
                {" "}
                {/* Centering spots */}
                {spots.map((spot) => (
                  <motion.div
                    key={spot.id}
                    className="absolute rounded-full shadow-xl"
                    style={{
                      width: `${spot.size}px`,
                      height: `${spot.size}px`,
                      backgroundColor: spot.color,
                      cursor: "pointer",
                      borderRadius: "50%",
                      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                      top: "10%", // Center the spot vertically
                      left: "10%", // Center the spot horizontally
                      transform: "translate(-50%, -50%)", // Adjust to exact center
                    }}
                    animate={{
                      x: randomizePosition().x,
                      y: randomizePosition().y + Math.sin(scrollY / 100) * 10,
                      scale: isHovered ? 1.2 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 50,
                      damping: 10,
                      duration: 3,
                    }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    onClick={() => handleSpotClick(spot)}
                    onDragEnd={(e, info) => handleDragEnd(e, info, spot)}
                    drag
                  />
                ))}
                {burstSpots.map((burstSpot) => (
                  <motion.div
                    key={burstSpot.id}
                    className="absolute rounded-full"
                    animate={{
                      opacity: [1, 0],
                      scale: [1, 0],
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                    style={{
                      left: `${burstSpot.x}px`,
                      top: `${burstSpot.y}px`,
                      width: `${burstSpot.size}px`,
                      height: `${burstSpot.size}px`,
                      backgroundColor: getRandomColor(),
                      borderRadius: "50%",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6 order-1 md:order-2">
              <div className="grid grid-cols-3 gap-4">
                {[
                  { Icon: Briefcase, label: "Experience", detail: "1+ Years" },
                  {
                    Icon: CheckCircle,
                    label: "Completed",
                    detail: "4+ Projects",
                  },
                  { Icon: Coffee, label: "Coffees", detail: "5000+" }, // Replace Headphones with Coffee icon
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-white rounded-lg shadow-lg text-center"
                    initial={{
                      opacity: 0,
                      y: scrollDirection === "down" ? 50 : -50,
                    }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.2,
                      ease: "easeOut",
                    }}
                  >
                    <item.Icon className="mx-auto mb-2" />
                    <h3 className="font-bold">{item.label}</h3>
                    <p className="text-gray-600">{item.detail}</p>
                  </motion.div>
                ))}
              </div>

              <motion.p
                className="text-gray-600"
                initial={{
                  opacity: 0,
                  y: scrollDirection === "down" ? 50 : -50,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                Motivated software engineer seeking to make a way into the
                immense Software Industry. Passionate about creating
                user-friendly solutions and contributing to innovative projects.
              </motion.p>

              <motion.div
                initial={{
                  opacity: 0,
                  y: scrollDirection === "down" ? 50 : -50,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  className="rounded-full bg-black text-white border-black hover:bg-gray-800"
                  sx={{
                    fontFamily: "'Barlow Condensed', sans-serif", // Explicitly set font for the button
                  }}
                  onClick={handleDownloadCV}
                >
                  Download CV
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
