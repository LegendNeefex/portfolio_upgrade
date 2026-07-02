import { Open_Sans, Outfit, Montserrat, Lato, Poppins } from "next/font/google";
import "./globals.css";
import { ApiProvider } from "./Context/stateHandler";
import ScrollToTop from "./Components/scrollToTop";
import PageWrapper from "./Components/pageWrapper";
import StructuredData from "./Components/structuredData";
import script from "next/script";

const openSans = Open_Sans({
  variable: "--font-openSans",
  subsets: ["latin"],
  weight: ["300","400", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["200","400", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["200","400", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
}); 

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
    alternates: {
      canonical: "https://neefex.vercel.app",
    },
    title: {
        default: "Ifeoluwa Oladepo | Full-Stack Developer & UI/UX Designer",
        template: "%s | Ifeoluwa Oladepo"
    },
    description: "Full-Stack Web Developer and UI/UX Designer based in Lagos, Nigeria. Specializing in PERN Stack, React, Next.js, and pixel-perfect digital experiences.",
    keywords: [
        "Full Stack Developer Nigeria",
        "UI/UX Designer Lagos",
        "React Developer Nigeria",
        "Next.js Developer",
        "PERN Stack Developer",
        "Front End Developer",
        "Graphics Designer",
        "Web Developer Portfolio",
        "Ifeoluwa Oladepo",
        "Neefex"
    ],
    metadataBase: new URL("https://neefex.vercel.app"),
    openGraph: {
        title: "Ifeoluwa Oladepo | Full-Stack Developer & UI/UX Designer",
        description: "Full-Stack Web Developer and UI/UX Designer based in Lagos, Nigeria.",
        url: "https://neefex.vercel.app",
        siteName: "Neefex Portfolio",
        images: [{ url: "/Image/og-image.png", width: 1200, height: 630, alt: "Ifeoluwa Oladepo Portfolio" }],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ifeoluwa Oladepo | Full-Stack Developer & UI/UX Designer",
        description: "Full-Stack Web Developer and UI/UX Designer based in Lagos, Nigeria.",
        images: ["/Image/og-image.png"],
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
    authors: [{ name: "Ifeoluwa Oladepo", url: "https://neefex.vercel.app" }],
    creator: "Ifeoluwa Oladepo",
    verification: {
        google: "ZPy-nFsSDHWb4MJh0kg04sRwBbosYhQKCxjVpeC8EKQ",
        other: {
          "msvalidate.01" : "BC4A250AA69FC49D0C91B3E18B4C37F6"
        }
    }
};


export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${openSans.variable} ${montserrat.variable} ${lato.variable} ${poppins.variable} antialiased`}
      >
        <ApiProvider> 
          <PageWrapper>
            <StructuredData />
            <svg width="0" height="0" className="absolute">
              <defs>
                <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1ABC9C" />
                  <stop offset="100%" stopColor="#367BE4" />
                </linearGradient>
              </defs>
            </svg>
            {children}
            <ScrollToTop />
          </PageWrapper>
        </ApiProvider>


        <script 
          async 
          
          src="https://www.googletagmanager.com/gtag/js?id=G-2GFFXNVFHN"
          strategy="afterInteractive"
        />
        <script id="google-analytics" strategy="afterInteractive">
          {
            `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-2GFFXNVFHN');
            `
          } 
        </script>
      </body>
    </html>
  );
}
