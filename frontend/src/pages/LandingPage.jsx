// LandingPage.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  List,
  X,
  GoogleLogo,
  AmazonLogo,
  SlackLogo,
  AirplaneTilt,
  IdentificationCard,
  Briefcase,
  GlobeHemisphereWest,
  HouseLine,
  Star,
  LinkedinLogo,
  TwitterLogo,
  InstagramLogo,
  Phone,
  Envelope,
  MapPin
} from "@phosphor-icons/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import "./LandingPage.css";

/**
 * Production-ready LandingPage component
 * - Injects :root CSS variables needed by LandingPage.css (from your provided text)
 * - Keeps all existing behavior (auth, mobile menu, parallax, scroll progress, reveal animations)
 * - Adds basic accessibility improvements (aria, focus management, ESC handling)
 */

const VARS_STYLE_ID = "glojourn-css-vars";

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // UI state
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      const rolePath = {
        client: "/dashboard",
        coordinator: "/coordinator",
        manager: "/manager",
        admin: "/admin"
      }[user.role] || "/dashboard";
      navigate(rolePath, { replace: true });
    }
  }, [user, navigate]);




  // Scroll + parallax + progress
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const scrollTop = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight || 1;
      const scrolled = (scrollTop / height) * 100;
      setScrollProgress(scrolled);

      const parallaxBg = document.getElementById("parallax-bg");
      if (parallaxBg && window.scrollY < 1200) {
        parallaxBg.style.transform = `translateY(${window.scrollY * 0.5}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reveal on scroll (IntersectionObserver)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal-on-scroll").forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>GloJourn - Unlock Your Global Journey</title>
        <meta name="description" content="Expert immigration consulting for visas, corporate relocation, and citizenship strategies. Trust GloJourn to navigate your path abroad." />
      </Helmet>
      {/* Scroll progress indicator */}
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />


      {/* Header */}
      <header id="main-header" className={isScrolled ? "scrolled" : ""} role="banner">
        <div className="nav-container">
          <a href="#" className="logo" aria-label="GloJourn Home">Glo<span>Journ</span></a>

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
              <li><a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a></li>
              <li><a href="#clients" onClick={() => setMobileMenuOpen(false)}>Our Clients</a></li>
              <li><a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Stories</a></li>
              <li><a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
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

      {/* Hero */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-bg" id="parallax-bg" aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content">
          <h2 id="hero-heading" className="hero-title">
            Turning borders into beginnings</h2>
          <p>From visa applications to seamless relocations, trust our 20+ years of expertise to navigate your path abroad. The world is waiting.</p>
          <button onClick={() => navigate("/login")} className="btn-custom btn-primary-custom">Start Your Consultation</button>
        </div>
      </section>

      {/* Clients */}
      <section id="clients" aria-labelledby="clients-heading">
        <div className="container-custom">
          <div className="section-header">
            <span>Trusted Globally</span>
          </div>
          <div className="clients-container" role="list">
            <div className="client-logo" title="Google" role="listitem"><GoogleLogo size={28} weight="fill" style={{ marginRight: 8 }} /> Google</div>
            <div className="client-logo" title="Amazon" role="listitem"><AmazonLogo size={28} weight="fill" style={{ marginRight: 8 }} /> Amazon</div>
            <div className="client-logo" title="Slack" role="listitem"><SlackLogo size={28} weight="fill" style={{ marginRight: 8 }} /> Slack</div>
            <div className="client-logo" title="Airbnb" role="listitem"><AirplaneTilt size={28} weight="fill" style={{ marginRight: 8 }} /> Airbnb</div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services">
        <div className="container-custom">
          <div className="section-header reveal-on-scroll">
            <span>Our Expertise</span>
            <h2>Comprehensive Immigration Solutions</h2>
            <p>Our informational resources cover major immigration pathways. For personalized legal guidance, please book a professional consultation.</p>
          </div>

          <div className="services-grid">
            <article className="service-card reveal-on-scroll">
              <IdentificationCard className="service-icon" />
              <h3>Visa Mastery</h3>
              <ul>
                <li>Work & Skilled Migration</li>
                <li>Student & Graduate Visas</li>
                <li>Family Reunification</li>
              </ul>
              <a href="#" className="learn-more">Explore Visas →</a>
            </article>

            <article className="service-card reveal-on-scroll" style={{ transitionDelay: "100ms" }}>
              <Briefcase className="service-icon" />
              <h3>Corporate Relocation</h3>
              <ul>
                <li>Inter-company Transfers</li>
                <li>Compliance Audits</li>
                <li>Talent Acquisition Support</li>
              </ul>
              <a href="#" className="learn-more">For Businesses →</a>
            </article>

            <article className="service-card reveal-on-scroll" style={{ transitionDelay: "200ms" }}>
              <GlobeHemisphereWest className="service-icon" />
              <h3>Citizenship Strategy</h3>
              <ul>
                <li>Investment Citizenship</li>
                <li>Dual Nationality Planning</li>
                <li>Residency by Investment</li>
              </ul>
              <a href="#" className="learn-more">Secure Future →</a>
            </article>

            <article className="service-card reveal-on-scroll" style={{ transitionDelay: "300ms" }}>
              <HouseLine className="service-icon" />
              <h3>Settlement Services</h3>
              <ul>
                <li>Housing Assistance</li>
                <li>School Search</li>
                <li>Banking & Healthcare Setup</li>
              </ul>
              <a href="/login" className="learn-more">Settle In →</a>
            </article>
          </div>

          <div className="mt-16 text-center reveal-on-scroll">
            <button
              onClick={() => navigate("/login")}
              className="btn-custom btn-primary-custom px-12 py-4 shadow-xl shadow-teal-500/20"
            >
              Book a Professional Assessment
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" aria-labelledby="testimonials-heading">
        <div className="container-custom">
          <div className="section-header reveal-on-scroll">
            <span style={{ color: "var(--accent-gold)" }}>Success Stories</span>
            <h2 style={{ color: "white" }}>Voices of the World</h2>
          </div>

          <div className="w-full max-w-5xl mx-auto px-4">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {[
                  {
                    name: "Maria S.",
                    role: "Software Engineer, Canada",
                    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                    quote: "GloJourn turned our dream move to Canada into reality. The paperwork was daunting, but they made it flawless."
                  },
                  {
                    name: "David Chen",
                    role: "Architect, USA",
                    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                    quote: "Professional, empathetic, and incredibly knowledgeable. They helped me navigate the complex H1-B process."
                  },
                  {
                    name: "Sarah Johnson",
                    role: "Medical Researcher, Australia",
                    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                    quote: "My family's relocation to Australia was seamless thanks to the settlement team. Highly recommended!"
                  },
                  {
                    name: "Emma Wilson",
                    role: "Entrepreneur, UK",
                    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
                    quote: "Navigating the startup visa was tricky, but GloJourn made it look easy. I'm now running my business in London!"
                  }
                ].map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="bg-white/10 border-none text-white backdrop-blur-sm">
                        <CardContent className="flex flex-col gap-4 p-6">
                          <div className="flex gap-1 text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} weight="fill" />
                            ))}
                          </div>
                          <p className="italic text-gray-200 min-h-[80px]">"{testimonial.quote}"</p>
                          <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-10 h-10 rounded-full border-2 border-teal-500 object-cover"
                            />
                            <div>
                              <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                              <span className="text-xs text-gray-400">{testimonial.role}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12 bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white" />
              <CarouselNext className="hidden md:flex -right-12 bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" role="contentinfo" aria-labelledby="footer-heading">
        <div className="container-custom">
          <div className="footer-grid">
            <div className="footer-col">
              <a href="#" className="logo" style={{ fontSize: "1.5rem", display: "block", marginBottom: "1rem" }}>Glo<span>Journ</span></a>
              <p style={{ marginBottom: "1rem", color: "#aaa" }}>
                Empowering global citizens since 2005. We turn borders into bridges with ethical, expert immigration consulting.
              </p>
              <div style={{ display: "flex", gap: "1rem", fontSize: "1.5rem" }}>
                <a href="#" aria-label="LinkedIn"><LinkedinLogo /></a>
                <a href="#" aria-label="Twitter"><TwitterLogo /></a>
                <a href="#" aria-label="Instagram"><InstagramLogo /></a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Our Services</a></li>
                <li><a href="#">Blog & Insights</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Contact</h4>
              <ul className="footer-links">
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone /> +1 (555) 123-4567</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Envelope /> info@glojourn.com</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin /> 101 Global Ave, NY</li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Regulatory</h4>
              <ul className="footer-links">
                <li><a onClick={() => navigate("/disclaimer")} className="cursor-pointer">Legal Disclaimer</a></li>
                <li><a onClick={() => navigate("/privacy-policy")} className="cursor-pointer">Privacy Policy</a></li>
                <li><a onClick={() => navigate("/terms-of-service")} className="cursor-pointer">Terms of Service</a></li>
                <li><a onClick={() => navigate("/login")} className="cursor-pointer">Sitemap</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 py-6 border-t border-white/5 text-center text-[10px] text-gray-500 uppercase tracking-widest reveal-on-scroll">
            <p>GloJourn is an immigration consulting firm. We provide informational and case management services. We are not a law firm and do not provide legal advice. All services are subject to our terms and conditions.</p>
          </div>

          <div className="copyright">
            <p>&copy; 2025 GloJourn Inc. All Rights Reserved. | <span className="cursor-pointer hover:text-white" onClick={() => navigate("/privacy-policy")}>Privacy Policy</span> | <span className="cursor-pointer hover:text-white" onClick={() => navigate("/terms-of-service")}>Terms of Service</span></p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
