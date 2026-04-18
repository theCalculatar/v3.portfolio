import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { PageBlocksAbout } from "@/tina/__generated__/types";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from "../layout/section";
import Image from "next/image";
import { iconSchema } from "@/tina/fields/icon";
import { Button } from "../ui/button";
import Link from "next/link";
import { Icon } from "../icon";
import { act } from "react";

export const About = ({ data }: { data: PageBlocksAbout }) => {
  return (
    <Section background={data.background!}>
      <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
        <div className=" items-center justify-center">
          {data.image?.src && (
            <div
              className="w-40 h-40 relative mx-auto overflow-visible"
              data-tina-field={tinaField(data, "image")}
            >
              <Image
                src={data.image.src}
                width={120}
                height={120}
                alt={data.image.alt || "About Image"}
                className="absolute block mx-auto rounded-lg w-full h-auto blur-2xl brightness-150 contrast-[0.9] dark:brightness-150 saturate-200 opacity-50 dark:opacity-30 mix-blend-multiply dark:mix-blend-hard-light"
                aria-hidden="true"
                style={{ maxHeight: "25vh" }}
              />
              <Image
                src={data.image.src}
                width={500}
                priority
                height={500}
                alt={data.image.alt || "About Image"}
                className="mx-auto w-full h-full object-cover object-bottom rounded-full shadow-lg"
              />
            </div>
          )}
        </div>

        <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
          <h2
            className="text-4xl font-medium lg:text-5xl"
            data-tina-field={tinaField(data, "title")}
          >
            {data.title}
          </h2>
          <p data-tina-field={tinaField(data, "description")}>
            {data.description}
          </p>
        </div>

        <div>
          {data.action && (
            <div
              key={data.action!.label}
              data-tina-field={tinaField(data.action)}
              className="mx-auto w-fit"
            >
              <Button
                asChild
                size="lg"
                variant={data.action!.type === "link" ? "ghost" : "default"}
                className="rounded-xl px-5 text-sm text-gray-600"
              >
                <Link href={data.action!.link!}>
                  {data.action?.icon && <Icon data={data.action?.icon} />}
                  <span className="text-nowrap">{data.action!.label}</span>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export const aboutBlockSchema: Template = {
  name: "about",
  label: "About",
  ui: {
    previewSrc: "/blocks/about.png",
    defaultItem: {
      title: "I build systems — not just apps.",
      description:
        "I design and build systems that are meant to be used — not just shown. Clean APIs, scalable structure, and developer-first thinking drive everything I create.",
      actions: {
        label: "Action Label",
        type: "button",
        icon: {
          name: "Tina",
          color: "white",
          style: "float",
        },
        link: "/",
      },
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      ui: {
        previewSrc: "/blocks/image.png",
      },
      fields: [
        {
          type: "image",
          label: "Src",
          name: "src",
        },
        {
          type: "string",
          label: "Alt",
          name: "alt",
        },
      ],
    },
    {
      label: "Action",
      name: "action",
      type: "object",
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
          name: "type",
          type: "string",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" },
          ],
        },
        iconSchema as any,
        {
          label: "Link",
          name: "link",
          type: "string",
        },
      ],
    },
  ],
};
