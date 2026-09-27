"use client";
import { iconSchema } from "@/tina/fields/icon";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import {
  PageBlocksHero,
  PageBlocksHeroImage,
} from "../../tina/__generated__/types";
import { Section, sectionBlockSchemaField } from "../layout/section";
import { AnimatedGroup } from "../motion-primitives/animated-group";
import { TextEffect } from "../motion-primitives/text-effect";
import { ActionButton, Button, buttonBlockSchema } from "../ui/button";
import { Transition } from "motion/react";
import Preview from "../motion-primitives/preview";
import BookingWidget, { bookingWidgetSchema } from "./booking-widget";
import { Icon } from "../icon";
const transitionVariants = {
  container: {
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      y: 12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      } as Transition,
    },
  },
};

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  // Extract the background style logic into a more readable format
  let gradientStyle: React.CSSProperties | undefined = undefined;
  if (data.background) {
    const colorName = data.background
      .replace(/\/\d{1,2}$/, "")
      .split("-")
      .slice(1)
      .join("-");
    const opacity = data.background.match(/\/(\d{1,3})$/)?.[1] || "100";

    gradientStyle = {
      "--tw-gradient-to": `color-mix(in oklab, var(--color-${colorName}) ${opacity}%, transparent)`,
    } as React.CSSProperties;
  }

  return (
    <Section background={data.background!}>
      <div className="text-center sm:mx-auto lg:mt-0 max-w-4xl">
        {data.headline && (
          <div data-tina-field={tinaField(data, "headline")}>
            <TextEffect
              preset="fade-in-blur"
              speedSegment={0.3}
              as="h1"
              className="mt-8 tracking-tighter text-balance font-medium text-4xl sm:text-6xl xl:text-[4rem]"
            >
              {data.headline!}
            </TextEffect>
          </div>
        )}
        {data.tagline && (
          <div data-tina-field={tinaField(data, "tagline")}>
            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.5}
              as="p"
              className="mx-auto mt-4 max-w-2xl text-balance text-lg text-gray-500"
            >
              {data.tagline!}
            </TextEffect>
          </div>
        )}

        <AnimatedGroup
          variants={transitionVariants}
          className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
        >
          {data.actions &&
            data.actions.map((action) => {
              return (
                <div key={action!.label} data-tina-field={tinaField(action)}>
                  <div className="bg-foreground/10 rounded-[calc(var(--radius-md)+0.125rem)] border p-0.5">
                    <ActionBlock action={action} />
                  </div>
                </div>
              );
            })}
        </AnimatedGroup>
      </div>

      {data.image && (
        <AnimatedGroup variants={transitionVariants}>
          <div
            className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20 max-w-full"
            data-tina-field={tinaField(data, "image")}
          >
            <div className="absolute inset-0 z-1 "></div>

            <div className="relative mx-auto max-w-3xl">
              <ImageBlock image={data.image} />
            </div>
          </div>
        </AnimatedGroup>
      )}
    </Section>
  );
};

const ImageBlock = ({ image }: { image: PageBlocksHeroImage }) => {
  if (image.src) {
    return (
      <Image
        className="z-2 aspect-15/8 relative  max-w-full h-auto object-cover"
        alt={image!.alt || ""}
        src={image!.src!}
        sizes={"(min-width: 1024px) 50vw, 100vw"}
        priority
        width={1500}
        height={800}
      />
    );
  }
};

export const ActionBlock = ({ action }: { action: any }) => {
  if (action?.type_[0]?.__typename?.includes("BookingWidget")) {
    return (
      <Preview custom={<BookingWidget data={action?.type_[0]} />}>
        <Button>{action.label}</Button>
      </Preview>
    );
  } else {
    return (
      <ActionButton
        variant={action?.type_[0]?.type_ === "link" ? "ghost" : "default"}
        className="rounded-xl px-5 text-base "
      >
        {action?.icon && <Icon data={action?.icon} />}
        <span className="text-nowrap">{action!.label}</span>
      </ActionButton>
    );
  }
};

export const heroBlockSchema: Template = {
  name: "hero",
  label: "Hero",
  ui: {
    previewSrc: "/blocks/hero.webp",
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: "This Big Text is Totally Awesome",
      text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.",
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Headline",
      name: "headline",
    },
    {
      type: "string",
      label: "Tagline",
      name: "tagline",
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      fields: [
        {
          type: "image",
          label: "Source",
          name: "src",
        },
        {
          type: "string",
          label: "Alt Text",
          name: "alt",
        },
      ],
    },
    {
      label: "Actions",
      name: "actions",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          label: "Action Label",
          type: "button",
          icon: {
            name: "Tina",
            color: "white",
            style: "float",
          },
          link: "/",
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: "Label",
          name: "label",
          type: "string",
        },
        {
          label: "Type",
          name: "type_",
          type: "object",
          list: true,
          ui: {
            visualSelector: true,
          },
          templates: [bookingWidgetSchema, buttonBlockSchema],
        },
      ],
    },
  ],
};
