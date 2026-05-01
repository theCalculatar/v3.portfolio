import React from "react";
import type { Template } from "tinacms";
import {
  PageBlocksTestimonial,
  PageBlocksTestimonialTestimonials,
} from "../../tina/__generated__/types";
import { Section } from "../layout/section";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader } from "../ui/card";
import { tinaField } from "tinacms/dist/react";
import { sectionBlockSchemaField } from "../layout/section";
import { cn } from "@/lib/utils";

export const Testimonial = ({ data }: { data: PageBlocksTestimonial }) => {
  return (
    <Section background={data.background!}>
      <div className="text-center max-w-3xl mx-auto">
        <h2
          className="text-title text-3xl sm:text-4xl lg:text-5xl text-pretty font-semibold"
          data-tina-field={tinaField(data, "title")}
        >
          {data.title}
        </h2>
        <p
          className="text-body mt-6"
          data-tina-field={tinaField(data, "description")}
        >
          {data.description}
        </p>
      </div>
      <div className="mt-8 [column-width:300px] [column-gap:1.5rem] md:mt-12">
        {data.testimonials?.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial!} />
        ))}
      </div>
    </Section>
  );
};

const TestimonialCard = ({
  testimonial,
}: {
  testimonial: PageBlocksTestimonialTestimonials;
}) => {
  return (
    <Card
      className={cn(
        "mb-6 break-inside-avoid shadow-none backdrop-blur-2xl",
        testimonial.background,
      )}
      data-tina-field={tinaField(testimonial, "background")}
    >
      <CardHeader className="flex gap-4 items-center bg-white shadow-sm p-4 mx-4 rounded-lg ">
        <Avatar
          className="size-9"
          data-tina-field={tinaField(testimonial, "avatar")}
        >
          {testimonial.avatar && (
            <AvatarImage
              alt={testimonial.author!}
              src={testimonial.avatar}
              loading="lazy"
              width="120"
              height="120"
            />
          )}
          <AvatarFallback>
            {testimonial
              .author!.split(" ")
              .map((word) => word[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="">
          <h3
            className="font-medium"
            data-tina-field={tinaField(testimonial, "author")}
          >
            {testimonial.author}
          </h3>

          <span
            className="text-muted-foreground block text-sm tracking-wide"
            data-tina-field={tinaField(testimonial, "role")}
          >
            {testimonial.role}
          </span>
        </div>
      </CardHeader>
      <CardContent className="grid -mt-3 grid-cols-[auto_1fr] gap-3">
        <div>
          <blockquote
            className="mt-3 border-l-4"
            data-tina-field={tinaField(testimonial, "quote")}
          >
            <p className="ml-2 text-gray-700 dark:text-gray-300">
              {testimonial.quote}
            </p>
          </blockquote>
        </div>
      </CardContent>
    </Card>
  );
};

export const testimonialBlockSchema: Template = {
  name: "testimonial",
  label: "Testimonial",
  ui: {
    previewSrc: "/blocks/testimonial.png",
    defaultItem: {
      testimonials: [
        {
          quote:
            "There are only two hard things in Computer Science: cache invalidation and naming things.",
          author: "Phil Karlton",
        },
      ],
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
      ui: {
        component: "textarea",
      },
    },
    {
      type: "object",
      list: true,
      label: "Testimonials",
      name: "testimonials",
      ui: {
        defaultItem: {
          quote:
            "There are only two hard things in Computer Science: cache invalidation and naming things.",
          author: "Phil Karlton",
        },
        itemProps: (item) => {
          return {
            label: `${item.quote} - ${item.author}`,
          };
        },
      },
      fields: [
        sectionBlockSchemaField as any,

        {
          type: "string",
          ui: {
            component: "textarea",
          },
          label: "Quote",
          name: "quote",
        },
        {
          type: "string",
          label: "Author",
          name: "author",
        },
        {
          type: "string",
          label: "Role",
          name: "role",
        },
        {
          type: "image",
          label: "Avatar",
          name: "avatar",
        },
      ],
    },
  ],
};
