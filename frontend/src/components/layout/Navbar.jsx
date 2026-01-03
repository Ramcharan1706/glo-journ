import React, { useState, useEffect } from "react";
import { List, X } from "@phosphor-icons/react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Initial check for scroll position on mount
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        
        // Check immediately
        handleScroll();
        
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Also force scrolled state if we are NOT on the home page (optional, 
    // but often internal pages look better with the solid opaque header immediately)
    // However, the design requested is consistency, so let's keep the transparent-to-solid behavior 
    // unless the page background differs. For now, we'll stick to scroll behavior.
    
    const handleNavClick = (path, hash) => {
        setMobileMenuOpen(false);
        if (path === "/") {
            if (location.pathname !== "/") {
                navigate("/");
                // After navigation, we might need to scroll to hash. 
                // Simple timeout usually suffices for simple apps
                if (hash) {
                    setTimeout(() => {
                        const el = document.getElementById(hash.replace('#', ''));
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                } else {
                    window.scrollTo(0, 0);
                }
            } else {
                 if (hash) {
                        const el = document.getElementById(hash.replace('#', ''));
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                        window.scrollTo(0, 0);
                    }
            }
        } else {
            navigate(path);
            window.scrollTo(0, 0);
        }
    };

    return (
        <header id="main-header" className={isScrolled ? "scrolled" : ""} role="banner">
            <div className="nav-container">
                <a onClick={() => handleNavClick("/", "")} className="logo cursor-pointer" aria-label="GloJourn Home">
                    Glo<span>Journ</span>
                </a>

                <div
                    className="mobile-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-controls="navLinks"
                    aria-expanded={mobileMenuOpen}
                    aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
                >
                    {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
                </div>

                <nav role="navigation" aria-label="Primary">
                    <ul id="navLinks" className={mobileMenuOpen ? "active" : ""}>
                        <li><a onClick={() => handleNavClick("/services")} className="cursor-pointer">Services</a></li>
                        <li><a onClick={() => handleNavClick("/", "#clients")} className="cursor-pointer">Our Clients</a></li>
                        <li><a onClick={() => handleNavClick("/", "#testimonials")} className="cursor-pointer">Stories</a></li>
                        <li><a onClick={() => handleNavClick("/", "#contact")} className="cursor-pointer">Contact</a></li>
                        <li>
                            <button
                                className="btn-custom btn-outline-custom"
                                onClick={() => navigate("/login")}
                            >
                                Client Portal
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
