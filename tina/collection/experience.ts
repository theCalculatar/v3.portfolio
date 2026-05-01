import type { Collection } from "tinacms";

const Experience: Collection = {
  name: "experience",
  label: "Experience listing",
  path: "content/experience",
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "datetime",
      name: "startDate",
      label: "Start Date",
    },
    {
      type: "datetime",
      name: "endDate",
      label: "End Date",
    },
    {
      type: "string",
      name: "location",
      label: "Location",
    },
    {
      type: "string",
      name: "company",
      label: "Company",
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
      type: "rich-text",
      name: "description",
      label: "Description",
      isBody: true,
      templates: [
        {
          name: "BlockQuote",
          label: "Block Quote",
          fields: [
            {
              name: "children",
              label: "Quote",
              type: "rich-text",
              overrides: {
                toolbar: ["bold", "italic", "link"],
              },
            },
          ],
        },
      ],
    },
  ],
};

export default Experience;
