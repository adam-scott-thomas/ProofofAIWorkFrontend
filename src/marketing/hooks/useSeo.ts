import { useEffect } from "react";
import { setSeo } from "../lib/seo";

export function useSeo(title: string, description: string, path = "", image?: string, type?: "website" | "article") {
  useEffect(() => {
    setSeo({ title, description, path, image, type });
  }, [description, image, path, title, type]);
}
