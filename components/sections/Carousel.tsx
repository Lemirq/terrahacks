import {
  motion,
  useTransform,
  useScroll,
  useMotionValueEvent,
  useVelocity,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

const Example = () => {
  return <HorizontalScrollCarousel />;
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // motion value event

  return (
    <section ref={targetRef} className="relative h-[300vh] w-full">
      <div className="sticky top-0 fc h-screen items-center overflow-hidden">
        <h1 className="text-4xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium mb-10">
          A Weekend of...
        </h1>
        <motion.div
          style={{
            x,
          }}
          className="fr gap-4 items-start"
        >
          {cards.map((card) => {
            return <Card card={card} key={card.id} bgX={bgX} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card, bgX }: { card: (typeof cards)[0]; bgX: number }) => {
  return (
    <motion.div
      style={
        card.title.toLowerCase() === "prizes"
          ? {
              backgroundImage: `url(${card.url})`,
              backgroundSize: "cover",
              backgroundPositionX: bgX,
            }
          : {}
      }
      animate={{}}
      key={card.id}
      className="group relative size-64 sm:size-[350px] overflow-hidden rounded-2xl"
    >
      {card.title !== "prizes" && (
        <div className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110 bg-gradient-to-br from-black/40 to-neutral-800"></div>
      )}
      <div className="absolute inset-0 z-10 grid place-content-center">
        <p className=" p-8 text-2xl sm:text-4xl font-black uppercase text-white backdrop-blur-xl rounded-2xl">
          {card.title}
        </p>
      </div>
    </motion.div>
  );
};

export default Example;

// these cards are on a hackathons website, they should provide details
const cards = [
  {
    id: 1,
    title: "Innovation",
    url: "https://images.unsplash.com/photo-1593349480506-8433634cdcbe?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Update with the correct path to your image
  },
  {
    id: 2,
    title: "Collaboration",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Update with the correct path to your image
  },
  {
    id: 3,
    title: "Workshops",
    url: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Update with the correct path to your image
  },
  {
    id: 4,
    title: "Mentorship",
    url: "https://imageio.forbes.com/specials-images/imageserve/6421ad97c38433124e8a9f01/Woman-mentoring-a-young-employee-in-the-office/960x0.jpg?format=jpg&width=1440", // Update with the correct path to your image
  },
  {
    id: 5,
    title: "Prizes",
    url: "https://images.unsplash.com/photo-1560986752-2e31d9507413?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Update with the correct path to your image
  },
];
