import "./App.css";
import Navbar from "./Navbar";
import Hero from "./components/LandingPage/Hero";
import Stats from "./components/LandingPage/Stats";
import Marquee from "./components/LandingPage/Marquee";
import Problems from "./components/LandingPage/Problems"
import "./Footer"
import Footer from "./Footer";

function App(){
    return(
        <>
        <Navbar />
        <main className="content">
        <Hero />
        <hr className="section-divider" />
        <Stats />
        <Marquee />
        <Problems />
        </main>
        <Footer />
        </>
    );
}
export default App;