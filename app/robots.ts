import type {MetadataRoute} from "next";
export default function robots():MetadataRoute.Robots{return{rules:{userAgent:"*",allow:"/"},sitemap:"https://number-info-bd.vercel.app/sitemap.xml"}}