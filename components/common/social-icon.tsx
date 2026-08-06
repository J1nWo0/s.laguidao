import { Mail } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { GitHubIcon, LinkedInIcon } from "@/components/common/brand-icons";
import type { SocialPlatform } from "@/types";

const SOCIAL_ICONS: Record<
  SocialPlatform,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
};

type SocialIconProps = SVGProps<SVGSVGElement> & {
  platform: SocialPlatform;
};

/** Resolves a serializable platform key from the data layer into its mark. */
export function SocialIcon({ platform, ...props }: SocialIconProps) {
  const Icon = SOCIAL_ICONS[platform];
  return <Icon {...props} />;
}
