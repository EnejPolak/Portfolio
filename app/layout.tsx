import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Optimizirane nastavitve za fonte
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
    display: "swap", // Poveča performanco - prikaže fallback font med nalaganjem
    preload: true,
    fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
    display: "swap",
    preload: true,
    fallback: ['Monaco', 'Courier New', 'monospace'],
});

export const metadata: Metadata = {
    title: "Enej Polak - Portfolio",
    description: "Frontend Developer & UI/UX Designer crafting performant and user-centered web applications",
    keywords: ["frontend developer", "web developer", "UI/UX designer", "React", "Next.js", "portfolio"],
    authors: [{ name: "Enej Polak" }],
    openGraph: {
        title: "Enej Polak - Portfolio",
        description: "Frontend Developer & UI/UX Designer",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                {children}
            </body>
        </html>
    );
}