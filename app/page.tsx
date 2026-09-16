import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Hybrid from "@/components/Hybrid";
import Strength from "@/components/Strength";
import SocialProof from "@/components/SocialProof";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavBar />
      <Hero />
      <Projects />
      <Experience />
      <Hybrid />
      <Strength />
      <About />
      <SocialProof />
      <Contact />
      <Footer />
      <Chatbot />
    </main>
  );
}
