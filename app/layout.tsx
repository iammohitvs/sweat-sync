import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";

const josephineSans = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Sweat Sync",
    description: "Track workouts with ease",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${josephineSans.className}`}>
                    <Header />
                    <main className="mx-6 md:mx-10 my-10">{children}</main>
                </body>
            </html>
        </ClerkProvider>
    );
}
