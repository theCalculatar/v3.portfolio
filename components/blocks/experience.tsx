import React from "react";
import { type Template } from "tinacms";
import { Section, sectionBlockSchemaField } from "../layout/section";
import { tinaField } from "tinacms/react";
import {
  PageBlocksExperience,
  PageBlocksExperienceItemsExperience,
  PageBlocksExperienceItemsExperienceFilter,
} from "@/tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { components } from "../mdx-components";
import { formatDate } from "@/lib/utils";

function Experience({ data }: { data: PageBlocksExperience }) {
  return (
    <Section background={data.background!}>
      <div className="@container mx-auto max-w-3xl">
        <div className="text-center">
          <h2
            data-tina-field={tinaField(data, "title")}
            className="text-balance text-4xl font-semibold lg:text-5xl"
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
        <div className="mt-8">
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
    <div className="mb-8">
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
        <span data-tina-field={tinaField(data, "company")}>{data.company}</span>
        <span data-tina-field={tinaField(data, "location")}>
          {data.location}
        </span>
      </p>
      <div
        className="mt-2 text-sm prose dark:prose-dark w-full max-w-none"
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
