import Brand from "@/components/Brand";
import Footer from "@/components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import AboutSection from "./section/AboutSection";
import ChatbotSection from "./section/ChatbotSection";
import CountriesSection from "./section/CountriesSection";

const Home = () => {
  // handle smooth scroll
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbar = document.querySelector("header");
      const navbarHeight = navbar ? navbar.offsetHeight : 0;

      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full">
      <Navbar scrollToSection={scrollToSection} />
      <Hero scrollToSection={scrollToSection} />
      <Brand />
      <CountriesSection />
      <ChatbotSection />
      <AboutSection />
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
};

export default Home;
