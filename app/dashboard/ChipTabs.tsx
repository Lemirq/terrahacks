import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";

const tabs = ["October 19", "October 20", "October 21"];

const ChipTabs = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="fr gap-2">
      {tabs.map((tab) => (
        <Chip
          text={tab}
          selected={selected === tab}
          setSelected={setSelected}
          key={tab}
        />
      ))}
    </div>
  );
};

const Chip = ({
  text,
  selected,
  setSelected,
}: {
  text: string;
  selected: boolean;
  setSelected: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`${
        selected
          ? "text-white"
          : "text-zinc-300 hover:text-zinc-200 hover:bg-zinc-700"
      } text-xl transition-colors px-2.5 py-0.5 rounded-md relative`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="pill-tab"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-zinc-700 to-zinc-900 rounded-md"
        ></motion.span>
      )}
    </button>
  );
};

export default ChipTabs;
