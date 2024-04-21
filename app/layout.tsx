import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import Footer from "./components/Home/Footer";
import Navbar from "./components/Navbar/NavBar";
import AuthProvider from "./auth/Provider";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import QueryClientProvider from "./QueryClientProvider";
import AppContext from "./context";

const inter = Raleway({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContext>
          <QueryClientProvider>
            <Theme appearance="light" accentColor="violet">
              <AuthProvider>
                <Navbar />
                {children}
                <Footer />
              </AuthProvider>
            </Theme>
          </QueryClientProvider>
        </AppContext>
      </body>
    </html>
  );
}
