"use client";

import { motion } from "motion/react";

import {
  Tilt,
  TiltContent,
} from "@/components/animate-ui/primitives/effects/tilt";
import { PROFILE } from "@/data/profile";
import { VIEWPORT_ONCE, staggerContainer, transitions } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Tone = "keyword" | "key" | "string" | "punct" | "comment" | "type";

type Token = { text: string; tone?: Tone };

type CodeLine = {
  indent: number;
  tokens: readonly Token[];
};

const TONE_CLASS: Record<Tone, string> = {
  keyword: "text-brand-violet",
  key: "text-foreground/90",
  string: "text-brand-cyan",
  punct: "text-muted-foreground/60",
  comment: "text-muted-foreground/50 italic",
  type: "text-brand",
};

const str = (value: string): Token => ({ text: `"${value}"`, tone: "string" });

/** Renders a comma-separated list of string literals on one line. */
function stringList(values: readonly string[]): Token[] {
  return values.flatMap((value, index) => [
    str(value),
    ...(index < values.length - 1
      ? [{ text: ", ", tone: "punct" as const }]
      : []),
  ]);
}

const CODE_LINES: readonly CodeLine[] = [
  {
    indent: 0,
    tokens: [
      { text: "const", tone: "keyword" },
      { text: " engineer", tone: "type" },
      { text: " = {", tone: "punct" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: "name: ", tone: "key" },
      str(PROFILE.fullName),
      { text: ",", tone: "punct" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: "role: ", tone: "key" },
      str(PROFILE.role),
      { text: ",", tone: "punct" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: "based: ", tone: "key" },
      str(`${PROFILE.location} (${PROFILE.timezone})`),
      { text: ",", tone: "punct" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: "stack: [", tone: "key" },
      ...stringList(["Node.js", "TypeScript", "Python"]),
      { text: "],", tone: "punct" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: "builds: [", tone: "key" },
      ...stringList(["APIs", "automation", "AI pipelines"]),
      { text: "],", tone: "punct" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: "// shipping from Manila to London", tone: "comment" },
    ],
  },
  {
    indent: 1,
    tokens: [
      { text: "available: ", tone: "key" },
      { text: "true", tone: "keyword" },
      { text: ",", tone: "punct" },
    ],
  },
  { indent: 0, tokens: [{ text: "};", tone: "punct" }] },
];

/**
 * The hero's visual anchor: a tilting editor pane that types out the profile as
 * source. Decorative, so it is hidden from assistive technology — the same
 * information is available as prose in the About section.
 */
export function HeroCodeCard({ className }: { className?: string }) {
  return (
    <Tilt
      maxTilt={7}
      perspective={1200}
      className={cn("w-full", className)}
      aria-hidden
    >
      <TiltContent className="rounded-2xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitions.entrance, delay: 0.25 }}
          className="overflow-hidden rounded-2xl border border-border/70 bg-card/70 shadow-2xl shadow-brand/5 ring-hairline backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 border-b border-border/60 bg-muted/30 px-4 py-3">
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-emerald-400/70" />
            <span className="ml-2 font-mono text-[0.7rem] text-muted-foreground">
              engineer.ts
            </span>
          </div>

          <motion.pre
            variants={staggerContainer(0.07, 0.45)}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="overflow-x-auto p-5 font-mono text-[0.78rem] leading-6 sm:text-[0.82rem]"
          >
            <code>
              {CODE_LINES.map((line, lineIndex) => (
                <motion.span
                  key={lineIndex}
                  variants={{
                    hidden: { opacity: 0, x: -8 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: transitions.quick,
                    },
                  }}
                  className="block whitespace-pre"
                >
                  <span className="mr-4 inline-block w-3 text-right text-muted-foreground/35 select-none">
                    {lineIndex + 1}
                  </span>
                  {"  ".repeat(line.indent)}
                  {line.tokens.map((token, tokenIndex) => (
                    <span
                      key={tokenIndex}
                      className={token.tone ? TONE_CLASS[token.tone] : undefined}
                    >
                      {token.text}
                    </span>
                  ))}
                </motion.span>
              ))}
            </code>
          </motion.pre>
        </motion.div>
      </TiltContent>
    </Tilt>
  );
}
