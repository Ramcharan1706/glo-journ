import React from "react";
import { LinkedinLogo, TwitterLogo, InstagramLogo, Phone, Envelope, MapPin } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer id="contact" role="contentinfo" aria-labelledby="footer-heading">
            <div className="container-custom">
                <div className="footer-grid">
                    <div className="footer-col">
                        <a onClick={() => navigate("/")} className="logo cursor-pointer" style={{ fontSize: "1.5rem", display: "block", marginBottom: "1rem" }}>
                            Glo<span>Journ</span>
                        </a>
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
                            <li><a onClick={() => navigate("/services")}>Our Services</a></li>
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

                <div className="mt-12 py-6 border-t border-white/5 text-center text-[10px] text-gray-500 uppercase tracking-widest">
                    <p>GloJourn is an immigration consulting firm. We provide informational and case management services. We are not a law firm and do not provide legal advice. All services are subject to our terms and conditions.</p>
                </div>

                <div className="copyright">
                    <p>&copy; 2025 GloJourn Inc. All Rights Reserved. | <span className="cursor-pointer hover:text-white" onClick={() => navigate("/privacy-policy")}>Privacy Policy</span> | <span className="cursor-pointer hover:text-white" onClick={() => navigate("/terms-of-service")}>Terms of Service</span></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
