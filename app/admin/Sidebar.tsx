"use client";
import { cn } from "@/utils/cn";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { logout } from "../login/actions";
import { IoLogOut, IoRefresh } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const links = [
    {
      href: "/admin",
      text: "Home",
    },
    // {
    // 	href: '/admin/faq',
    // 	text: 'FAQ',
    // },
    {
      href: "/admin/applications",
      text: "Applications",
    },
  ];

  const router = useRouter();

  return (
    <>
      <div className="hidden sm:flex h-screen fixed left-0 fc px-5 pt-24 pb-10 select-none">
        <div className="w-56 h-screen rounded-2xl bg-neutral-900 border-2 border-neutral-300/20 justify-between fc gap-4 py-10 px-5">
          {/* Links for FAQ, waitlist, applications */}
          <div className="fc w-full gap-2">
            {links.map((link) => (
              <Link
                className={cn(
                  "w-full bg-neutral-800 rounded-xl px-5 py-2 border border-neutral-300/20",
                  {
                    "bg-primary-300/60": pathname === link.href,
                  },
                )}
                key={link.href}
                href={link.href}
              >
                {link.text}
              </Link>
            ))}
            <Button
              fullWidth
              onClick={() => router.refresh()}
              color="primary"
              startContent={<IoRefresh />}
            >
              Refresh
            </Button>
          </div>

          <form className="w-full">
            <Button
              fullWidth
              type="submit"
              formAction={logout}
              color="danger"
              variant="ghost"
              startContent={<IoLogOut className="rotate-180" />}
            >
              Logout
            </Button>
          </form>
        </div>
      </div>
      {/* horizontal version for mobile */}
      <div className="sm:hidden w-full fixed top-16 z-50 fc gap-2 p-5">
        <div className="bg-neutral-900 fc gap-2 w-full px-5 py-3 rounded-2xl">
          <div className="w-full fr gap-2">
            {links.map((link) => (
              <Link
                className={cn(
                  "w-full bg-neutral-800 rounded-xl px-5 py-2 border border-neutral-300/20",
                  {
                    "bg-primary-300/60": pathname === link.href,
                  },
                )}
                key={link.href}
                href={link.href}
              >
                {link.text}
              </Link>
            ))}
            <form>
              <Button
                type="submit"
                formAction={logout}
                color="danger"
                variant="ghost"
                startContent={<IoLogOut className="rotate-180" />}
              >
                Logout
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
