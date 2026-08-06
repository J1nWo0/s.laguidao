import { cn } from "@/lib/utils";

const wrapper =
  "group inline-flex items-baseline gap-1.5 text-sm text-foreground transition-colors hover:text-term focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-term";

const bracket = "select-none text-muted-foreground transition-colors group-hover:text-term";

function BracketContent({
  external,
  children,
}: {
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <span aria-hidden className={bracket}>
        [
      </span>
      <span>{children}</span>
      {external ? (
        <span aria-hidden className={bracket}>
          &#8599;
        </span>
      ) : null}
      <span aria-hidden className={bracket}>
        ]
      </span>
    </>
  );
}

/** `[ source ↗ ]` — the only call-to-action shape this design uses. */
export function BracketLink({
  external = false,
  className,
  children,
  ...props
}: React.ComponentProps<"a"> & { external?: boolean }) {
  return (
    <a
      className={cn(wrapper, className)}
      {...(external ? { target: "_blank", rel: "noreferrer" } : null)}
      {...props}
    >
      <BracketContent external={external}>{children}</BracketContent>
    </a>
  );
}

export function BracketButton({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button type="button" className={cn(wrapper, className)} {...props}>
      <BracketContent>{children}</BracketContent>
    </button>
  );
}
