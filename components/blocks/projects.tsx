"use client";

import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Section } from "../layout/section";
import { sectionBlockSchemaField } from "../layout/section";
import Image from "next/image";
import {
  PageBlocksProject,
  PageBlocksProjectItemsProject,
} from "@/tina/__generated__/types";
import { Badge } from "../ui/badge";

export const Projects = ({ data }: { data: PageBlocksProject }) => {
  return (
    <Section background={data.background!}>
      <div className="@container mx-auto max-w-5xl">
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
        <div className="@min-3xl:max-w-full gap-4 text-start @min-3xl:grid-cols-2 mx-auto mt-8 grid max-w-md md:mt-16">
          {data.items &&
            data.items?.map(function (block, i) {
              return <Project key={i} {...block!.project!} />;
            })}
        </div>
      </div>
    </Section>
  );
};

export const Project: React.FC<PageBlocksProjectItemsProject> = (data) => {
  return (
    <Card className="group relative shadow-zinc-950/5 bg-zinc-50 overflow-hidden  p-4 space-y-0 gap-2">
      <CardHeader className="p-0 m-0 z-10">
        <div
          className="w-full h-full"
          data-tina-field={tinaField(data, "image")}
        >
          <Image
            src={data.image || "/uploads/860shots_so.jpg"}
            alt={"Feature Icon"}
            width={348}
            height={348}
            className="mx-auto w-full h-full rounded-xl overflow-hidden opacity object-contain select-none"
          ></Image>
        </div>
        <h3
          data-tina-field={tinaField(data, "title")}
          className="font-medium text-lg"
        >
          {data.title}
        </h3>
      </CardHeader>

      <CardContent className="text-sm p-0 m-0 z-10 text-gray-500">
        <p data-tina-field={tinaField(data, "description")}>
          {data.description}
        </p>
      </CardContent>
      <CardFooter className="p-0 m-0 z-10 flex flex-wrap gap-2 *:text-gray-500">
        {data.tags &&
          data.tags?.map(function (block, i) {
            return (
              <Badge
                key={i}
                variant={"outline"}
                data-tina-field={tinaField(block, "tag")}
              >
                {block?.tag?.name}
              </Badge>
            );
          })}
      </CardFooter>
    </Card>
  );
};

export const projectBlockSchema: Template = {
  name: "project",
  label: "Project",
  ui: {
    previewSrc: "/blocks/Project.png",
    defaultItem: {
      title: "Selected Projects",
      description:
        "A showcase of some of my recent work. Want to see more? Check out my GitHub.",
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
      label: "Projects",
      list: true,

      ui: {
        itemProps: (item) => {
          return { label: item?.project || "Project" };
        },
      },
      fields: [
        {
          type: "reference",
          label: "Project",
          name: "project",
          collections: ["project"],
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
