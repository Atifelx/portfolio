import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import ProofMatrix from "@/components/ProofMatrix";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import HowIWork from "@/components/HowIWork";
import About from "@/components/About";
import Recommendations from "@/components/Recommendations";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <ProofMatrix />
        <Projects />
        <Experience />
        <HowIWork />
        <About />
        <Recommendations />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
