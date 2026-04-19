import { PageBlocks, PageBlocksBadge } from "@/tina/__generated__/types";
import Image from "next/image";
import React from "react";
import { type Template } from "tinacms";
import { Section, sectionBlockSchemaField } from "../layout/section";
import { tinaField } from "tinacms/react";

function Badge({ data }: { data: PageBlocksBadge }) {
  return (
    <Section background={data.background!} className="pb-0">
      <div className="flex text-6xl justify-center text-center pointer-events-auto select-none">
        <span
          className="sm:text-[6vw] to-gray-600 bg-linear-to-l   
                   bg-clip-text text-transparent text-center whitespace-nowrap opacity-10"
          data-tina-field={tinaField(data, "leftLetter")}
        >
          {data.leftLetter}
        </span>
        <div
          className="inline-block w-40 sm:w-[10vw] h-[4.25vw] my-auto rounded-2xl m-2 max-h-28 min-h-12 overflow-hidden bg-gray-50 shadow-md border-4 border-white zoom-in-20"
          data-tina-field={tinaField(data, "image")}
        >
          {data.image?.src && (
            <Image
              src={data.image?.src!}
              alt={data.image?.alt || "coool image here"}
              aria-hidden="true"
              width={200}
              height={200}
              className="h-full w-full opacity object-cover hover:grayscale-0 active: transition-all duration-500 ease-in-out hover:scale-105"
            />
          )}
        </div>
        <span
          className="sm:text-[6vw] to-gray-600 bg-linear-to-r   
                   bg-clip-text text-transparent text-center whitespace-nowrap opacity-10"
          data-tina-field={tinaField(data, "rightLetter")}
        >
          {data.rightLetter}
        </span>
      </div>
    </Section>
  );
}

export default Badge;

export const badgeBlockSchema: Template = {
  name: "badge",
  label: "Badge",
  ui: {
    defaultItem: {},
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: "object",
      name: "image",
      label: "Image",
      ui: {
        defaultItem: {
          src: "/uploads/860shots_so.jpg",
          alt: "A cool image",
        },
      },
      fields: [
        {
          type: "image",
          label: "Source",
          name: "src",
        },
        {
          type: "string",
          label: "alt text",
          name: "alt",
        },
      ],
    },
    {
      type: "string",
      name: "leftLetter",
      label: "Left Letter",
    },
    {
      type: "string",
      name: "rightLetter",
      label: "Right Letter",
    },
  ],
};
