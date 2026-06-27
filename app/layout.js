import { Open_Sans, Outfit, Montserrat, Lato, Poppins } from "next/font/google";
import "./globals.css";
import { ApiProvider } from "./Context/stateHandler";
import ScrollToTop from "./Components/scrollToTop";

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
  title: "Ifeoluwa Oladepo || A creative Designer & Full stack developer",
  description: "Website Portfolio for Ifeoluwa Oladepo, a creative designer and full-stack developer. Showcasing skills in UI/UX design, front-end and back-end development, and more.",
};

export default function RootLayout({ children }) {
  return (
    <ApiProvider>
      <html lang="en">
        <body
          className={`${outfit.variable} ${openSans.variable} ${montserrat.variable} ${lato.variable} ${poppins.variable} antialiased`}
        >
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
        </body>
      </html>
    </ApiProvider>
  );
}
