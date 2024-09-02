import React from "react";
import { useAnimate } from "framer-motion";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { sponsors } from "@/data/sponsors";
export const Sponsors = () => {
  return (
    <div className="px-5 sm:px-10 py-12 w-full my-36">
      <motion.h3
        variants={listItem}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium mb-10"
      >
        Sponsors
      </motion.h3>
      <div className="mx-auto max-w w-full">
        <ClipPathLinks />
      </div>
      <div className="text-center mt-10">
        <Link
          href="mailto:team@hack49.com"
          className="text-primary-500 font-semibold text-lg"
        >
          Contact us to sponsor
        </Link>
      </div>
    </div>
  );
};

const container = {
  // hidden: { opacity: 0 },
  show: {
    // opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const listItem = {
  hidden: { opacity: 0, scale: 0.3 },
  show: { opacity: 1, scale: 1 },
};

const ClipPathLinks = () => {
  return (
    <div>
      {/* <Row tier="platinum">
				<LinkBox Icon={SiGoogle} href="#" />
				<LinkBox Icon={SiShopify} href="#" />
			</Row>
			<Row tier="gold">
				<LinkBox Icon={SiApple} href="#" />
				<LinkBox Icon={SiSoundcloud} href="#" />
				<LinkBox Icon={SiAdobe} href="#" />
				<LinkBox Icon={SiFacebook} href="#" />
			</Row> */}
      {/* <Row tier="silver">

			</Row> */}
      <Row tier="bronze">
        {sponsors.bronze.map((sponsor, index) => (
          <LinkBox
            key={index}
            logo={sponsor.logo}
            href={sponsor.href}
            tier="bronze"
            bg={sponsor.bg}
          />
        ))}
      </Row>
    </div>
  );
};
const Row = ({
  tier,
  children,
}: {
  tier: "platinum" | "gold" | "silver" | "bronze";
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={cn("flex flex-wrap fr divide-x divide-neutral-900", {
        // "grid-cols-2": tier === "platinum" || tier === "gold",
        // "grid-cols-3": tier === "silver",
        // "grid-cols-1 sm:grid-cols-2 md:grid-cols-4": tier === "bronze",
      })}
    >
      {children}
    </motion.div>
  );
};

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const LinkBox = ({
  logo,
  href,
  tier,
  bg,
}: {
  logo: string;
  href: string;
  tier: "platinum" | "gold" | "silver" | "bronze";
  bg?: boolean;
}) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e) => {
    const box = e.target.getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left",
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right",
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top",
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom",
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    });
  };

  const handleMouseLeave = (e) => {
    const side = getNearestSide(e);

    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    });
  };

  return (
    <motion.div
      variants={listItem}
      onMouseEnter={(e) => {
        handleMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        handleMouseLeave(e);
      }}
      className="relative grid place-content-center"
    >
      <Link
        href={href}
        target="_blank"
        className="w-full h-20 sm:h-28 md:h-36 p-4"
      >
        <Image
          width={800}
          height={400}
          src={logo}
          alt="Sponsor Logo"
          className={cn("mx-auto", {
            "w-full": tier === "platinum",
            "w-3/4": tier === "gold",
            "w-full h-full sm:w-auto object-contain":
              tier === "silver" || tier === "bronze",
          })}
        />

        <div
          ref={scope}
          style={{
            clipPath: BOTTOM_RIGHT_CLIP,
          }}
          className="absolute inset-0  bg-primary text-white w-full h-20 sm:h-28 md:h-36 p-4"
        >
          <Image
            width={800}
            height={400}
            src={logo}
            alt="Sponsor Logo"
            className={cn("mx-auto", {
              "w-full": tier === "platinum",
              "w-3/4": tier === "gold",
              "w-full h-full sm:w-auto object-contain":
                tier === "silver" || tier === "bronze",
            })}
          />
        </div>
      </Link>
    </motion.div>
  );
};
