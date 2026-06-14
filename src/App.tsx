import Header from './components/Header';
import Hero from './components/Hero';
import Trust from './components/Trust';
import Services from './components/Services';
import WhyChoose from './components/WhyChoose';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <Trust />
        <Services />
        <WhyChoose />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
