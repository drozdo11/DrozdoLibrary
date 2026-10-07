import type { Metadata } from "next";
import "./globals.css";
import "../inter/inter.css"
import Header from "@/components/header/header.module";
import Footer from "@/components/footer/footer.module";

export const metadata: Metadata = {
  title: "SpravaKniznice",
  description: "Zoznam knih, citatelov a ich vypoziciek",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}