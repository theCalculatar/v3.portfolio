"use client";
import React from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";

export const Footer = () => {
  const { globalSettings } = useLayout();
  const { header, footer } = globalSettings!;

  return (
    <footer className="border-b bg-white pt-20 dark:bg-transparent">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mt-12 flex flex-wrap border-t items-center gap-6 py-6 flex-col md:flex-row md:justify-between">
          <div className="order-last flex justify-center md:order-first md:justify-start">
            <Link href="/" aria-label="go home">
              <Icon parentColor={header!.color!} data={header!.icon} />
            </Link>
            <span className="self-center text-muted-foreground text-sm ml-2">
              © {new Date().getFullYear()} {header?.name}, All rights reserved
            </span>
          </div>

          <div className="order-first flex justify-center gap-6 text-sm md:order-last md:justify-end">
            {footer?.social?.map((link, index) => (
              <Link
                key={`${link!.icon}${index}`}
                href={link!.url!}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  data={{ ...link!.icon, size: "small" }}
                  className="text-muted-foreground hover:text-primary block"
                />
              </Link>
            ))}
          </div>
        </div>
        <div
          className="relative overflow-hidden py-4 text-center sm:pt-4 lg:pt-8"
          aria-hidden
        >
          <p
            className="mx-auto max-w-full select-none font-bold leading-[0.85] tracking-tighter text-[#e5e7eb] text-[3.5rem] sm:text-[6.5rem] md:text-[7.5rem] lg:text-[10rem] xl:text-[11rem] 2xl:text-[11.5rem]"
            style={{
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 12%, black 8%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 12%, black 8%, transparent 100%)",
            }}
          >
            theCalculatar
          </p>
        </div>{" "}
      </div>
    </footer>
  );
};
