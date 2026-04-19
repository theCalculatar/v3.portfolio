import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";
import { Hero } from "./hero";
import { Content } from "./content";
import { Features } from "./features";
import { Testimonial } from "./testimonial";
import { Video } from "./video";
import { Callout } from "./callout";
import { About } from "./about";
import { CallToAction } from "./call-to-action";
import { Projects } from "./projects";
import Experience from "./experience";
import Badge from "./badge";

export const Blocks = (props: any) => {
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks.map(function (block: PageBlocks, i: number) {
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block {...block} />
          </div>
        );
      })}
    </>
  );
};

const Block = (block: PageBlocks) => {
  switch (block.__typename) {
    case "PageBlocksVideo":
      return <Video data={block} />;
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksCallout":
      return <Callout data={block} />;
    case "PageBlocksAbout":
      return <About data={block} />;
    case "PageBlocksContent":
      return <Content data={block} />;
    case "PageBlocksFeatures":
      return <Features data={block} />;
    case "PageBlocksTestimonial":
      return <Testimonial data={block} />;
    case "PageBlocksCta":
      return <CallToAction data={block} />;
    case "PageBlocksProject":
      return <Projects data={block} />;
    case "PageBlocksExperience":
      return <Experience data={block} />;
    case "PageBlocksBadge":
      return <Badge data={block} />;
    default:
      return null;
  }
};
