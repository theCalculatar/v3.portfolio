"use client";
import React from "react";
import Image from "next/image";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { ProjectQuery } from "@/tina/__generated__/types";
import { useLayout } from "@/components/layout/layout-context";
import { Section } from "@/components/layout/section";
import { components } from "@/components/mdx-components";
import ErrorBoundary from "@/components/error-boundary";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScriptCopyBtn } from "@/components/magicui/script-copy-btn";

const titleColorClasses = {
  blue: "from-blue-400 to-blue-600 dark:from-blue-300 dark:to-blue-500",
  teal: "from-teal-400 to-teal-600 dark:from-teal-300 dark:to-teal-500",
  green: "from-green-400 to-green-600",
  red: "from-red-400 to-red-600",
  pink: "from-pink-300 to-pink-500",
  purple:
    "from-purple-400 to-purple-600 dark:from-purple-300 dark:to-purple-500",
  orange:
    "from-orange-300 to-orange-600 dark:from-orange-200 dark:to-orange-500",
  yellow:
    "from-yellow-400 to-yellow-500 dark:from-yellow-300 dark:to-yellow-500",
};

interface ClientProjectProps {
  data: ProjectQuery;
  variables: {
    relativePath: string;
  };
  query: string;
}

export default function ProjectClientPage(props: ClientProjectProps) {
  const { theme, globalSettings } = useLayout();
  const { data } = useTina({ ...props });
  const project = data.project;

  const titleColour =
    titleColorClasses[theme!.color! as keyof typeof titleColorClasses];

  const header = globalSettings!.header!;

  return (
    <ErrorBoundary>
      <Section className="max-w-6xl">
        <h2
          data-tina-field={tinaField(project, "title")}
          className={`w-full relative\tmb-8 text-6xl font-extrabold tracking-normal text-center title-font`}
        >
          <span
            className={`bg-clip-text text-transparent bg-linear-to-r ${titleColour}`}
          >
            {project.title}
          </span>
        </h2>
        <div className="flex items-center justify-center gap-4 mt-4 mb-12">
          {project.tags?.map((data, index) => {
            return (
              <Badge
                data-tina-field={tinaField(data, "tag")}
                variant={"outline"}
                key={index}
              >
                {data?.tag?.name}
              </Badge>
            );
          })}
          <p
            data-tina-field={tinaField(project, "date")}
            className="text-base text-gray-400 group-hover:text-gray-500 dark:text-gray-300 dark:group-hover:text-gray-150"
          >
            {formatDate()}
          </p>
        </div>
        {project.image && (
          <div className="px-4 w-full">
            <div
              data-tina-field={tinaField(project, "image")}
              className="relative max-w-4xl lg:max-w-5xl mx-auto"
            >
              <Image
                priority={true}
                src={project.image}
                alt={project.title}
                className="absolute block mx-auto rounded-lg w-full h-auto blur-2xl brightness-150 contrast-[0.9] dark:brightness-150 saturate-200 opacity-50 dark:opacity-30 mix-blend-multiply dark:mix-blend-hard-light"
                aria-hidden="true"
                width={500}
                height={500}
                style={{ maxHeight: "25vh" }}
              />
              <Image
                priority={true}
                src={project.image}
                alt={project.title}
                width={500}
                height={500}
                className="relative z-10 mb-14 mx-auto block rounded-lg w-full h-auto opacity-100"
                style={{ maxWidth: "25vh" }}
              />
            </div>
          </div>
        )}
        <div
          data-tina-field={tinaField(project, "text")}
          className="prose dark:prose-dark w-full max-w-none"
        >
          <TinaMarkdown
            content={project.text}
            components={{
              ...components,
              scriptCopyBlock: (props: any) => <ScriptCopyBtn {...props} />,
            }}
          />
        </div>
        <div className="mt-6 flex w-fit border-t items-center space-x-4 text-sm pt-2 md:mt-8">
          <span className="text-muted-foreground">{header.name}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">
            {formatDate(project.date!)}
          </span>
        </div>
      </Section>
    </ErrorBoundary>
  );
}
