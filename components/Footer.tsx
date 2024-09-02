import React from "react";
import Image from "next/image";
import {
  FaXTwitter,
  FaTiktok,
  FaYoutube,
  FaLinkedin,
  FaDiscord,
} from "react-icons/fa6";
import { IoLogoDiscord, IoLogoInstagram } from "react-icons/io5";
import Socials from "@/components/Socials";
const Footer = () => {
  return (
    <footer className="rounded-t-3xl shadow bg-neutral-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="#"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="/images/logo-horizontal.svg"
              className="h-10"
              alt="Hack49 Logo"
              width={100}
              height={100}
            />
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-400">
            <li>
              <a href="/apply" className="hover:underline me-4 md:me-6">
                Apply
              </a>
            </li>
            <li>
              <a href="/dashboard" className="hover:underline me-4 md:me-6">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#about" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#founders" className="hover:underline me-4 md:me-6">
                Team
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between fc sm:fr gap-3">
          <span className="text-sm text-center text-gray-400">
            © {new Date().getFullYear()}{" "}
            <a href="https://hack49.com" className="hover:underline">
              Hack49 Global™
            </a>
            . All Rights Reserved.
          </span>{" "}
          <Socials />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
