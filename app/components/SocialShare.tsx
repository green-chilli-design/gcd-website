"use client";

import {
  LinkedinShareButton,
  FacebookShareButton,
  EmailShareButton,
  LinkedinIcon,
  FacebookIcon,
  EmailIcon,
} from "react-share";
import { useTheme } from "next-themes";

export default function SocialShare() {
  const title = window.document.title;
  const url = window.location.href;
  const iconSize = 30;

  const { resolvedTheme } = useTheme();
  const fillColor = resolvedTheme === "dark" ? "#080708" : "#F7F4F3";
  const bgColor = resolvedTheme === "dark" ? "#F7F4F3" : "#080708";

  return (
    <div className="flex items-center">
      <p className="mr-5 font-normal uppercase">Share:</p>
      <LinkedinShareButton url={url} className="mr-2">
        <LinkedinIcon
          size={iconSize}
          iconFillColor={fillColor}
          bgStyle={{ fill: bgColor }}
          round
        />
      </LinkedinShareButton>
      <FacebookShareButton url={url} className="mr-2">
        <FacebookIcon
          size={iconSize}
          iconFillColor={fillColor}
          bgStyle={{ fill: bgColor }}
          round
        />
      </FacebookShareButton>
      <EmailShareButton url={url} subject={title}>
        <EmailIcon
          size={iconSize}
          iconFillColor={fillColor}
          bgStyle={{ fill: bgColor }}
          round
        />
      </EmailShareButton>
    </div>
  );
}
