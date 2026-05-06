import { useEffect } from "react";
import { setSeo } from "../lib/seo";

export function useSeo(title: string, description: string, path = "") {
  useEffect(() => {
    setSeo({ title, description, path });
  }, [description, path, title]);
}
