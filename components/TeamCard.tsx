import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

interface CardProps {
  item: {
    name: string;
    description: string;
    image: string;
    lk: string;
  };
}
const Card: React.FC<CardProps> = ({ item }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="fc gap-2 h-full">
      <motion.div
        className="relative overflow-hidden h-[200px] min-w-[200px] bg-slate-400 rounded-xl flex justify-center items-center"
        key={item.name}
        onHoverStart={() => setShowOverlay(true)}
        onHoverEnd={() => setShowOverlay(false)}
      >
        {/* Hover overlay */}
        <AnimatePresence>
          {showOverlay && (
            <motion.div
              className="absolute left-0 top-0 bottom-0 right-0 z-10 fc gap-2 px-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="absolute bg-black pointer-events-none opacity-50 h-full w-full" />
              <motion.div className="z-10 text-white text-center">
                <h3 className="text-2xl font-semibold">{item.name}</h3>
              </motion.div>

              {item.lk && (
                <Link href={item.lk} target="_blank">
                  <motion.button
                    className="bg-black font-semibold text-sm z-10 px-3 py-2 rounded-full flex items-center gap-[0.5ch]"
                    initial={{ y: 10 }}
                    animate={{ y: 0 }}
                    exit={{ y: 10 }}
                  >
                    <span>LinkedIn</span>
                  </motion.button>
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        <Image
          src={item.image}
          alt={item.name}
          fill
          style={{ objectFit: "cover" }}
        />
      </motion.div>

      <div className="text-center fc sm:hidden">
        <h3 className="text-2xl font-semibold">{item.name}</h3>
        {item.lk && (
          <Link href={item.lk} target="_blank">
            <motion.button
              className="bg-black font-semibold text-sm z-10 px-3 py-2 rounded-full flex items-center gap-[0.5ch]"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              exit={{ y: 10 }}
            >
              <span>LinkedIn</span>
            </motion.button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
