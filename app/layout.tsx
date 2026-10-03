import type { Metadata } from "next";
import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
const inter=Inter({subsets:["latin"],variable:"--font-inter"});
const mono=JetBrains_Mono({subsets:["latin"],variable:"--font-mono"});
export const metadata: Metadata = {
  title:"BD Number Lookup — Bangladesh Mobile Intelligence",
  description:"Fast Bangladesh mobile number operator lookup and developer API.",
  metadataBase:new URL("https://number-info-bd.vercel.app"),
  openGraph:{title:"BD Number Lookup",description:"Instant Bangladesh mobile operator lookup.",type:"website"}
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="en"><body className={`${inter.variable} ${mono.variable}`}>{children}</body></html>;
}