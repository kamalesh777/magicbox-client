"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

interface PropTypes {
  workspaceUrl: string
  isOwner: boolean
  host: string
}

export default function RedirectHandler({ workspaceUrl, isOwner, host }: PropTypes) {
  const router = useRouter();

  useEffect(() => {
    // Perform client-side navigation using Router.push
    if (workspaceUrl && workspaceUrl !== host) {
      const targetUrl = workspaceUrl.startsWith("http")
        ? workspaceUrl
        : `https://${workspaceUrl}`;
      router.push(targetUrl);
    } else if (isOwner === false) {
      router.push("/account");
    }
  }, [workspaceUrl, isOwner, host, router]);

  return null; // Component doesn't render any visible output
}
