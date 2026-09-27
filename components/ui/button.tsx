import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Template } from "tinacms";
import { iconSchema } from "@/tina/fields/icon";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

type ActionButtonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  disabled?: boolean;
};

function ActionButton({
  className,
  variant,
  size,
  href,
  children,
  type = "button",
  target,
  rel,
  onClick,
  disabled,
}: ActionButtonProps) {
  const classes = cn(buttonVariants({ variant, size, className }));

  if (href) {
    const isExternal =
      /^https?:\/\//i.test(href) ||
      /^mailto:/i.test(href) ||
      /^tel:/i.test(href);

    if (isExternal) {
      return (
        <a
          href={href}
          target={target ?? (href.startsWith("http") ? "_blank" : undefined)}
          rel={
            rel ?? (href.startsWith("http") ? "noreferrer noopener" : undefined)
          }
          className={classes}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          aria-disabled={disabled}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
        aria-disabled={disabled}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      data-slot="button"
      className={classes}
      onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export { Button, ActionButton, buttonVariants };

export const buttonBlockSchema: Template = {
  name: "button",
  label: "Button",
  fields: [
    {
      label: "Type",
      name: "type_",
      type: "string",
      options: [
        { label: "Button", value: "button" },
        { label: "Link", value: "link" },
      ],
      ui: {
        itemProps: (item: any) => ({ label: item.label }),
      },
    },
    iconSchema as any,
    {
      label: "Link",
      name: "link",
      type: "string",
    },
  ],
};
