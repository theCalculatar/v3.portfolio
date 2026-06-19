import Link from "next/link";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { iconSchema } from "@/tina/fields/icon";
import { Button } from "@/components/ui/button";
import { PageBlocksCta } from "@/tina/__generated__/types";
import { Icon } from "../icon";
import { Section, sectionBlockSchemaField } from "../layout/section";

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
        {data.actions &&
          data.actions.map((action) => (
            <div
              key={action!.label}
              data-tina-field={tinaField(action)}
              className="bg-foreground/10 rounded-[calc(var(--radius-xl)+0.125rem)] border p-0.5"
            >
              <Button
                asChild
                size="lg"
                variant={action!.type === "link" ? "ghost" : "default"}
                className="rounded-xl px-5 text-base"
              >
                <Link href={action!.link!}>
                  {action?.icon && <Icon data={action?.icon} />}
                  <span className="text-nowrap">{action!.label}</span>
                </Link>
              </Button>
            </div>
          ))}
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
      actions: [
        {
          label: "Get Started",
          type: "button",
          link: "/",
        },
        {
          label: "Book Demo",
          type: "link",
          link: "/",
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
