"use client";

import { SplittingText } from "@/components/animate-ui/primitives/texts/splitting";
import {
  RotatingText,
  RotatingTextContainer,
} from "@/components/animate-ui/primitives/texts/rotating";
import { sectionHeadingId } from "@/components/common/section";
import { PROFILE } from "@/data/profile";
import { transitions } from "@/lib/motion";

const [FIRST_LINE, SECOND_LINE] = PROFILE.headline;

/**
 * Hero headline: the first line splits in per word, the second lands in the
 * editorial serif, and the role underneath cycles on a loop.
 */
export function HeroHeadline() {
  return (
    <div className="flex flex-col gap-5">
      <h1
        id={sectionHeadingId("hero")}
        className="text-[2.6rem] leading-[1.03] font-semibold sm:text-6xl lg:text-[4.6rem]"
      >
        <span className="block">
          <SplittingText
            text={FIRST_LINE}
            type="words"
            initial={{ y: "0.4em", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={transitions.entrance}
            stagger={0.09}
          />
        </span>
        <span className="block">
          <SplittingText
            className="font-display text-gradient-brand pr-2 font-normal"
            text={SECOND_LINE}
            type="words"
            initial={{ y: "0.4em", opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={transitions.entrance}
            stagger={0.09}
            delay={340}
          />
        </span>
      </h1>

      <RotatingTextContainer
        text={[...PROFILE.roles]}
        duration={2600}
        className="flex items-center gap-3 font-mono text-sm text-muted-foreground sm:text-base"
      >
        <span aria-hidden className="h-px w-6 bg-brand/60" />
        <RotatingText transition={transitions.quick} />
      </RotatingTextContainer>
    </div>
  );
}
