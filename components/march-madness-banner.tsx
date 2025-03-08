"use client"

import { useState } from "react"
import { X, Trophy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function MarchMadnessBannerDryft() {
  const [isVisible, setIsVisible] = useState(true)
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative bg-[#e6efff] shadow-sm"
        >
          <div className="container mx-auto py-3 px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-2 rounded-full">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1e3a8a] text-lg leading-tight">
                    March Madness, Reimagined
                  </h3>
                  <p className="text-gray-700 text-sm">
                    Draft. Compete. Win. Forget busted brackets!
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-sm"
                  onClick={() => window.open("https://dryftplay.com", "_blank")}
                >
                  Start Your Pool - It&apos;s Free!
                </Button>
              </div>
              
              <button 
                onClick={() => setIsVisible(false)} 
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close banner"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
