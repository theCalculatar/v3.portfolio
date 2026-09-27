"use client";

import type { Template } from "tinacms";
import { Button } from "../ui/button";

export default function BookingWidget({ data }: { data: any }) {
  return (
    <form>
      <div className="rounded-2xl bg-black flex flex-col gap-2 p-6 shadow text-white text-start">
        <div className="text-white text-center">{data.title}</div>
        <div className="flex flex-col gap-1 font-sans tracking-wider">
          <label className="text-xs ml-1" htmlFor="name">
            Name
          </label>
          <input
            className="border text-xs rounded-lg p-2"
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            className="text-xs ml-1 font-sans tracking-wider"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border text-xs border-neutral-300 rounded-lg p-2"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            className="text-xs ml-1 font-sans tracking-wider"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            name="message"
            className="border text-xs rounded-lg p-2"
            id="message"
          />
        </div>

        <div className="">
          <p className="text-white text-xs">{data.message}</p>
          <div className="mt-2 bg-foreground/10 w-fit rounded-[calc(var(--radius-lg)+0.125rem)] border border-neutral-600 p-0.5">
            <Button
              size={"sm"}
              variant={"secondary"}
              className="rounded-lg px-5 "
            >
              <span>Submit</span>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export const bookingWidgetSchema: Template = {
  name: "bookingWidget",
  label: "Booking Widget",
  ui: {
    defaultItem: {
      title: "Schedule a 20-minute call.",
      message: "I'll get back to you as soon as possible!",
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "string",
      name: "message",
      label: "Message",
    },
  ],
};
