import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.corddiali.com.br";
  const pages = ["", "/projetos", "/metodo", "/corddiali", "/contato"];
  return pages.map(path => ({ url: base + path, lastModified: new Date() }))
    .concat(projects.map(p => ({ url: `${base}/projetos/${p.slug}`, lastModified: new Date() })));
}
