"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowRight, Trophy, BarChart3, Zap } from "lucide-react";

export default function RedirectBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [bouncingBallPosition, setBouncingBallPosition] = useState(0);

  // Ball bouncing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBouncingBallPosition((prev) => (prev === 0 ? 1 : 0));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-green-500 to-green-900 shadow-md rounded-lg mx-auto my-6 max-w-5xl overflow-hidden"
    >
      <div className="container p-4 md:p-6 lg:p-8 relative">
       
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-2 md:py-4">
          {/* Bouncing basketball animation */}
          <div className="absolute left-6 lg:left-10 top-0 bottom-0 hidden md:flex items-center">
            <motion.div
              animate={{
                y: bouncingBallPosition === 0 ? [0, -25, 0] : [0, -20, 0],
                rotate: bouncingBallPosition === 0 ? [0, 15, 0] : [0, -15, 0],
              }}
              transition={{
                duration: 1.5,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }}
              className="relative"
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                className="md:w-[50px] md:h-[50px] lg:w-[65px] lg:h-[65px] drop-shadow-md"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="#e67817"
                  stroke="#000"
                  strokeWidth="2"
                />
                <path
                  d="M50,5 C50,95 50,5 50,95 M5,50 C95,50 5,50 95,50"
                  stroke="#000"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M26,26 C38,38 62,38 74,26 M26,74 C38,62 62,62 74,74"
                  stroke="#000"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </motion.div>
          </div>

          <div className="flex-1 ml-0 md:ml-20 lg:ml-28 text-center md:text-left">
            <motion.h3 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-bold text-white text-2xl md:text-3xl lg:text-4xl tracking-tight"
            >
              🏀 Track smarter. Win more.
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-white/90 text-lg md:text-xl mt-1 md:mt-2"
            >
              KOTC and KOTP are now powered by OddSmash.
            </motion.p>
            
            {/* Benefit bullet points */}
            <motion.ul 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-3 space-y-1 text-sm md:text-base text-white"
            >
              <li className="flex items-center gap-2">
                <div className="text-emerald-300"><BarChart3 size={16} /></div>
                <span>Live PRA and Points Leaderboards</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="text-emerald-300"><Zap size={16} /></div>
                <span>Enhanced player tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="text-emerald-300"><Trophy size={16} /></div>
                <span>No login needed — totally free!</span>
              </li>
            </motion.ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Button
                className="bg-white shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:bg-white/90 text-green-700 font-medium w-full sm:w-auto text-sm md:text-base py-2 md:py-6 px-4 md:px-6 h-auto"
                onClick={() => window.open("https://oddsmash.io/trackers/pra-leaderboard", "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                PRA Leaderboard
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <Button
                className="bg-amber-400 hover:bg-amber-500 text-green-900 font-medium shadow-sm w-full sm:w-auto text-sm md:text-base py-2 md:py-6 px-4 md:px-6 h-auto"
                onClick={() => window.open("https://oddsmash.io/trackers/kotp-leaderboard", "_blank")}
              >
                <ExternalLink className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                KOTP Leaderboard
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 