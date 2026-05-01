import React from "react";
import { type Template } from "tinacms";
import { Section, sectionBlockSchemaField } from "../layout/section";
import { tinaField } from "tinacms/react";
import {
  PageBlocksExperience,
  PageBlocksExperienceItemsExperience,
} from "@/tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { components } from "../mdx-components";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "../ui/badge";

function Experience({ data }: { data: PageBlocksExperience }) {
  return (
    <Section background={data.background!}>
      <div className="@container mx-auto max-w-3xl">
        <div className="text-center">
          <h2
            data-tina-field={tinaField(data, "title")}
            className="text-balance text-3xl sm:text-4xl font-semibold lg:text-5xl"
          >
            {data.title}
          </h2>
          <p
            data-tina-field={tinaField(data, "description")}
            className="mt-4 text-gray-500"
          >
            {data.description}
          </p>
        </div>
        <div className="mt-8 md:mt-16">
          {data.items &&
            data.items?.map(function (block, i) {
              return <ExperienceItem key={i} {...block!.experience!} />;
            })}
        </div>
      </div>
    </Section>
  );
}

export default Experience;

const ExperienceItem: React.FC<PageBlocksExperienceItemsExperience> = (
  data,
) => {
  if (!data.title) return null;

  return (
    <div className="mb-14">
      <div className="flex justify-between items-center">
        <h3
          className="text-lg font-semibold"
          data-tina-field={tinaField(data, "title")}
        >
          {data.title}
        </h3>

        <p className="text-gray-600">
          <span data-tina-field={tinaField(data, "startDate")}>
            {formatDate(data?.startDate!)}
          </span>{" "}
          -
          <span data-tina-field={tinaField(data, "endDate")}>
            {formatDate(data?.endDate!) || "Present"}
          </span>
        </p>
      </div>
      <p className="text-gray-600 flex justify-between text-sm">
        <span className="flex items-center gap-1">
          <span className="size-3 border-l-2 border-gray-500 border-b-2"></span>
          <span data-tina-field={tinaField(data, "company")}>
            <Link href={""} className="underline">
              {data.company}
            </Link>
          </span>
        </span>
        <span
          data-tina-field={tinaField(data, "location")}
          className="text-gray-900"
        >
          {data.location}
        </span>
      </p>
      {data.tags && (
        <div className="mt-4 flex gap-2">
          {data.tags?.map(function (block, i) {
            return (
              <Badge
                key={i}
                variant={"outline"}
                data-tina-field={tinaField(block, "tag")}
                className="rounded-lg"
              >
                {block?.tag?.name}
              </Badge>
            );
          })}
        </div>
      )}
      <div
        className="mt-4 text-sm prose dark:prose-dark w-full max-w-none"
        data-tina-field={tinaField(data, "description")}
      >
        <TinaMarkdown
          content={data.description}
          components={{
            ...components,
          }}
        />
      </div>
    </div>
  );
};

export const experienceBlockSchema: Template = {
  name: "experience",
  label: "Experience",
  ui: {
    previewSrc: "/blocks/experience.png",
    defaultItem: {
      title: "Experience",
      company: "Company Name",
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
      name: "items",
      label: "Experience Items",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.experience || "Select Experience" };
        },
      },
      fields: [
        {
          type: "reference",
          name: "experience",
          label: "Experience",
          collections: ["experience"],

          ui: {
            optionComponent: (
              props: {
                name?: string;
              },
              _internalSys: { path: string },
            ) => props.name || _internalSys.path,
          },
        },
      ],
    },
  ],
};
