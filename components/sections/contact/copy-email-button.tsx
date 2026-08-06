"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { transitions } from "@/lib/motion";

export function CopyEmailButton({ email }: { email: string }) {
  const { copied, copy } = useCopyToClipboard();

  const handleCopy = async () => {
    const ok = await copy(email);
    if (ok) toast.success("Email copied to clipboard");
    else toast.error("Couldn't copy — try selecting the address instead");
  };

  return (
    <Button
      variant="outline"
      size="icon-lg"
      onClick={handleCopy}
      aria-label={copied ? "Email copied" : "Copy email address"}
      className="relative shrink-0"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "copied" : "idle"}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={transitions.spring}
          className="grid place-items-center"
        >
          {copied ? <Check className="text-emerald-500" /> : <Copy />}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
}
