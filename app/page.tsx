import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Strength from "@/components/Strength";
import Achievements from "@/components/Achievements";
import Hybrid from "@/components/Hybrid";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <NavBar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Strength />
      <Achievements />
      <Hybrid />
      <Contact />
      <Footer />
    </main>
  );
}
