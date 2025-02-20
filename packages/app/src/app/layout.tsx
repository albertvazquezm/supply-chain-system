import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/layout/Header";


export const metadata: Metadata = {
  title: "Supply Chain System",
  description: "Supply Chain System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <div className="flex flex-col h-screen">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 py-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
