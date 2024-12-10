"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface PropTypes {
  workspace_url: string
  is_owner: boolean
  host: string
}

export default function RedirectHandler(result: PropTypes) {
  const router = useRouter();
  const {workspace_url, host, is_owner} = result
  useEffect(() => {
    // Perform client-side navigation using Router.push
    if (workspace_url && workspace_url !== host) {
      const targetUrl = workspace_url.startsWith("http")
        ? workspace_url
        : `https://${workspace_url}`;
      router.push(targetUrl);
    } else if (is_owner === false) {
      router.push("/account");
    }
  }, [workspace_url, is_owner, host, router]);

  return null; // Component doesn't render any visible output
}
