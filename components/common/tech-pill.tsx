import { cn } from "@/lib/utils";

type TechPillProps = React.ComponentProps<"span"> & {
  size?: "sm" | "md";
};

/** Monospaced chip used wherever a technology name appears. */
export function TechPill({
  size = "md",
  className,
  ...props
}: TechPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border/70 bg-muted/40 font-mono text-muted-foreground transition-colors duration-300 hover:border-brand/40 hover:text-foreground",
        size === "sm" ? "px-2 py-0.5 text-[0.68rem]" : "px-2.5 py-1 text-xs",
        className,
      )}
      {...props}
    />
  );
}
