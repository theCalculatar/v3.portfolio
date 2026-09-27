import Link from "next/link";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { iconSchema } from "@/tina/fields/icon";
import { ActionButton } from "@/components/ui/button";
import { PageBlocksCta } from "@/tina/__generated__/types";
import { Icon } from "../icon";
import { Section, sectionBlockSchemaField } from "../layout/section";
import Preview from "../motion-primitives/preview";
import BookingWidget from "./booking-widget";

export const CallToAction = ({ data }: { data: PageBlocksCta }) => {
  return (
    <Section background={data.background!}>
      <div className="flex justify-center mx-2">
        <h2 className="text-center text-4xl font-semibold lg:text-5xl">
          Contact me <br /> Let's create
          <br />
          <span className="bg-zinc-400 border -rotate-3 rounded-[calc(var(--radius-2xl)+0.125rem)] lg:rounded-[calc(var(--radius-3xl)+0.125rem)] p-0.5 block w-fit -my-3 shadow-2xl">
            <span
              className="flex gap-1 lg:gap-2 rounded-2xl lg:rounded-3xl bg-neutral-900 p-2 lg:p-4"
              data-tina-field={tinaField(data, "title")}
            >
              {data.title!.split("\n").map((v) => (
                <span
                  key={v}
                  className="rounded-2xl text-xl font-bold lg:text-3xl bg-neutral-800 px-2 p-1 lg:px-3 lg:p-2 text-white"
                >
                  {v}
                </span>
              ))}
            </span>
          </span>
          something great <br /> together
          <span className="text-red-400">.</span>
        </h2>
      </div>
      <div className="mt-4 flex justify-center">
        <p
          className="capitalize"
          data-tina-field={tinaField(data, "description")}
        >
          {data.description}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {data.contact && (
          <div
            data-tina-field={tinaField(data.contact)}
            className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
          >
            <Preview
              custom={
                <BookingWidget
                  data={{
                    title: data.contact?.label,
                    message: data.contact?.message,
                  }}
                />
              }
            >
              <ActionButton size="lg" className="rounded-xl px-5 text-base">
                <span className="text-nowrap">{data.contact?.label}</span>
              </ActionButton>
            </Preview>
          </div>
        )}
      </div>
    </Section>
  );
};

export const ctaBlockSchema: Template = {
  name: "cta",
  label: "CTA",
  ui: {
    previewSrc: "/blocks/cta.webp",
    defaultItem: {
      title: "Start Building",
      description:
        "Get started with TinaCMS today and take your content management to the next level.",
      contact: {
        message: "Let's create something great together.",
        label: "Send me a ping :)",
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
      ui: {
        component: "textarea",
      },
    },
    {
      label: "Contact",
      name: "contact",
      type: "object",
      fields: [
        {
          label: "Message",
          name: "message",
          type: "string",
          required: true,
        },
        {
          label: "Label",
          name: "label",
          type: "string",
          required: true,
        },
      ],
    },
  ],
};
