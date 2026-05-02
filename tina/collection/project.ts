import type { Collection } from "tinacms";

const Project: Collection = {
  name: "project",
  label: "Projects listing",
  path: "content/projects",
  format: "mdx",
    ui: {
      router: ({ document }) => {
        return `/archives/${document._sys.breadcrumbs.join("/")}`;
      },
    },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "rich-text",
      name: "description",
      label: "Description",
    },
    {
      type: "rich-text",
      name: "text",
      label: "Text",
    },
    {
      type: "datetime",
      name: "date",
      label: "Date",
    },
    {
      type: "image",
      name: "image",
      label: "Image",
      // @ts-ignore
      uploadDir: () => "projects",
    },
    {
      type: "object",
      name: "tags",
      label: "Tags",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item.tag };
        },
      },
      fields: [
        {
          type: "reference",
          label: "tags",
          name: "tag",
          collections: ["tag"],
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
    {
      type: "string",
      name: "url",
      label: "URL",
    },
  ],
};

export default Project;
