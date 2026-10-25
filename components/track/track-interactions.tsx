"use client";

import { useEffect } from "react";

import { initTrack } from "@/lib/track/interactions";

// Attaches the /track page's scroll story, slider and tabs to the server-rendered markup.
export function TrackInteractions({ rootId }: { rootId: string }) {
  useEffect(() => {
    const root = document.getElementById(rootId);
    if (!root) return;
    return initTrack(root);
  }, [rootId]);

  return null;
}
