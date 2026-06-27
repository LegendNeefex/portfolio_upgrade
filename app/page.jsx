import NavBar from "./Components/navBar";
import Banner from "./Components/banner";
import AboutMe from "./Components/aboutMe";
import Services from "./Components/services";
import FAQ from "./Components/faq";
import Projects from "./Components/projects";
import GetQuote from "./Components/getQuote";
import Footer from "./Components/footer";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <Banner />
      <AboutMe />
      <Services />
      <Projects />
      <FAQ />
      <GetQuote />
      <Footer />
    </>
  );
}