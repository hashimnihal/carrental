import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

// Component imports
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/Services";
import CarList from "./components/CarList/CarList";
import Booking from "./components/Booking/Booking";
import AppStoreBanner from "./components/AppStoreBanner/AppStoreBanner";
import Contact from "./components/Contact/Contact";
import Testimonial from "./components/Testimonial/Testimonial";
import Footer from "./components/Footer/Footer";
import Gallery from "./components/gallery/Gallery";
import UsedPremiumCars from "./components/Usedcars/UsedPremiumCars";

import UsedBook from "./components/Booking/UsedBook";
import CarDetails from "./components/CarDetails/CarDetails";



const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    AOS.init({ offset: 100, duration: 800, easing: "ease-in-sine", delay: 100 });
    AOS.refresh();
  }, []);

  return (
    <Router>
      <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
        <Navbar theme={theme} setTheme={setTheme} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero theme={theme} />
                <About />
                <Services />
                <CarList />
                <Gallery />
                <Testimonial />
                <AppStoreBanner />
                <Contact />
                <Footer />
                
              </>
            }
          />
          <Route path="/usedpremiumcars" element={<UsedPremiumCars />} />
          <Route path="/usedpremiumcars/:id" element={<CarDetails />} />
          <Route path="/booking" element={<Booking />} />
         
          <Route path="/usedbook" element={<UsedBook />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
