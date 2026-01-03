import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
    CheckCircle,
    Briefcase,
    Globe,
    GraduationCap,
    Users,
    Buildings,
    ArrowRight,
    AirplaneTilt
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import "./ServicesPage.css";

const servicesData = [
    {
        id: "visa-mastery",
        title: "Visa & Immigration",
        badge: "Most booked",
        description: "Work, study, family, and visitor visas with airtight documentation and clear timelines.",
        image: "https://images.unsplash.com/photo-1516383607781-913a19294fd1?auto=format&fit=crop&w=1400&q=80",
        features: ["Skilled Worker Visas", "Family Sponsorship", "Student Visas", "Visitor Visas"],
        icon: Globe
    },
    {
        id: "corporate",
        title: "Corporate Relocation",
        badge: "Teams & leaders",
        description: "Mobility programs for leadership moves, branch launches, and compliant global transfers.",
        image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&w=1400&q=80",
        features: ["Inter-company Transfers", "Work Permits", "Compliance Audits", "Relocation Logistics"],
        icon: Buildings
    },
    {
        id: "citizenship",
        title: "Citizenship by Investment",
        badge: "Private desk",
        description: "Bespoke investment pathways to second citizenships with tax-aware structuring.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
        features: ["Caribbean Programs", "European Golden Visas", "Dual Citizenship", "Tax Planning Advisory"],
        icon: Briefcase
    },
    {
        id: "student",
        title: "Study Abroad",
        badge: "Students first",
        description: "University selection, admissions coaching, and visa compliance to keep you on track.",
        image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1400&q=80",
        features: ["University Admission", "Scholarship Guidance", "Post-Grad Work Permits", "Student Housing"],
        icon: GraduationCap
    },
    {
        id: "settlement",
        title: "Settlement Services",
        badge: "On arrival",
        description: "Housing, schools, banking, and healthcare handled so you feel settled day one.",
        image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
        features: ["Housing Search", "School Registration", "Healthcare Enrollment", "Banking Setup"],
        icon: Users
    },
    {
        id: "business",
        title: "Business Migration",
        badge: "Founders & investors",
        description: "Launch or expand abroad with investor visas, incorporation, and market entry playbooks.",
        image: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?auto=format&fit=crop&w=1400&q=80",
        features: ["Startup Visas", "Investor Visas", "Business Incorporation", "Market Research"],
        icon: Briefcase
    }
];

const highlightStats = [
    { label: "Cases guided", value: "2.8k+" },
    { label: "Countries covered", value: "35+" },
    { label: "Approval rate", value: "97%" }
];

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const ServicesPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[var(--pure-white)] font-body">
            <Helmet>
                <title>Our Services - GloJourn</title>
                <meta name="description" content="Explore GloJourn's comprehensive immigration services, including visas, corporate relocation, citizenship by investment, and settlement support." />
            </Helmet>

            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="relative min-h-[85vh] flex items-center bg-[var(--primary-navy)] text-white overflow-hidden pt-20">
                    {/* Abstract Background Shapes */}
                    <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#1C2541] to-transparent opacity-50 z-0"></div>
                    <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[var(--accent-gold)] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>

                    <div className="container-custom relative z-10 grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="space-y-6"
                        >
                            <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] text-[var(--accent-gold)] font-medium text-sm tracking-wide">
                                Strategic Immigration Partners
                            </motion.span>
                            <motion.h1 variants={fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-head font-bold leading-tight">
                                Services designed for <span className="text-[var(--accent-gold)]">confident moves</span>
                            </motion.h1>
                            <motion.p variants={fadeInUp} className="text-lg text-gray-300 max-w-lg leading-relaxed">
                                Clear guidance, modern workflows, and responsive support so every visa, relocation, or business move feels straightforward.
                            </motion.p>

                            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    onClick={() => navigate("/login")}
                                    className="bg-[var(--accent-gold)] text-[var(--primary-navy)] px-8 py-4 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-[var(--primary-navy)] transition-colors shadow-lg"
                                >
                                    Book Consultation
                                </button>
                                <button
                                    onClick={() => document.getElementById('services-list').scrollIntoView({ behavior: 'smooth' })}
                                    className="border border-white/30 text-white px-8 py-4 rounded-md font-bold text-sm uppercase tracking-wider hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)] transition-colors backdrop-blur-sm"
                                >
                                    Explore Services
                                </button>
                            </motion.div>
                        </motion.div>

                        {/* Hero Visual */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative hidden md:block"
                        >
                            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10">
                                <img
                                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2674&auto=format&fit=crop"
                                    alt="Global travel"
                                    className="w-full h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-navy)]/80 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 right-8 text-white">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="p-2 bg-[var(--accent-gold)] rounded-full text-[var(--primary-navy)]">
                                            <AirplaneTilt size={24} weight="fill" />
                                        </div>
                                        <span className="font-head text-xl italic">Premium Processing</span>
                                    </div>
                                    <p className="text-sm text-gray-200">Our expedited tracks get you there faster.</p>
                                </div>
                            </div>

                            {/* Floating Stats Card in Hero */}
                            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-lg shadow-xl max-w-xs z-20 border-l-4 border-[var(--accent-gold)] hidden lg:block">
                                <p className="text-[var(--primary-navy)] font-bold text-lg mb-2">GloJourn Promise</p>
                                <ul className="space-y-2">
                                    {["Transparent timelines", "Flat-fee pricing", "Dedicated specialist"].map(item => (
                                        <li key={item} className="flex items-center gap-2 text-sm text-[var(--text-dark)]">
                                            <CheckCircle size={16} weight="fill" className="text-[var(--accent-gold-dim)]" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Statistics Strip */}
                <section className="bg-white py-12 border-b border-gray-100">
                    <div className="container-custom">
                        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                            {highlightStats.map((stat, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    key={stat.label}
                                    className="flex flex-col items-center justify-center p-6 text-center"
                                >
                                    <span className="text-4xl md:text-5xl font-head font-bold text-[var(--primary-navy)] mb-2">{stat.value}</span>
                                    <span className="text-gray-500 uppercase tracking-widest text-xs font-semibold">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Grid Section */}
                <section id="services-list" className="py-24 bg-[var(--off-white)]">
                    <div className="container-custom">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="text-center max-w-3xl mx-auto mb-16"
                        >
                            <motion.span variants={fadeInUp} className="text-[var(--accent-gold-dim)] font-bold tracking-wider uppercase text-sm">What we deliver</motion.span>
                            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-head font-bold text-[var(--primary-navy)] mt-3 mb-6">Services for every journey</motion.h2>
                            <motion.p variants={fadeInUp} className="text-lg text-gray-600">Pick the path that fits your goals — we handle documentation, compliance, and updates.</motion.p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {servicesData.map((service) => {
                                const Icon = service.icon;
                                return (
                                    <motion.article
                                        key={service.id}
                                        variants={fadeInUp}
                                        whileHover={{ y: -8 }}
                                        className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col"
                                    >
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary-navy)]/90 via-transparent to-transparent opacity-80" />
                                            <div className="absolute bottom-4 left-4 text-white">
                                                <div className="bg-[var(--accent-gold)] w-10 h-10 rounded-lg flex items-center justify-center text-[var(--primary-navy)] mb-3 shadow-lg">
                                                    <Icon size={24} weight="bold" />
                                                </div>
                                                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-white/20">
                                                    {service.badge}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-8 flex-1 flex flex-col">
                                            <h3 className="text-2xl font-head font-bold text-[var(--primary-navy)] mb-3 group-hover:text-[var(--accent-gold-dim)] transition-colors">
                                                {service.title}
                                            </h3>
                                            <p className="text-gray-600 mb-6 flex-1 text-sm leading-relaxed">
                                                {service.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-8">
                                                {service.features.map((feature) => (
                                                    <span key={feature} className="bg-gray-50 text-gray-600 px-3 py-1 rounded-md text-xs font-medium border border-gray-100 flex items-center gap-1.5">
                                                        <CheckCircle size={12} weight="fill" className="text-green-500" /> {feature}
                                                    </span>
                                                ))}
                                            </div>

                                            <button
                                                onClick={() => navigate("/login")}
                                                className="w-full mt-auto py-3 rounded-lg border border-[var(--primary-navy)] text-[var(--primary-navy)] font-bold text-sm uppercase tracking-wide hover:bg-[var(--primary-navy)] hover:text-white transition-all flex items-center justify-center gap-2 group-hover:bg-[var(--primary-navy)] group-hover:text-white"
                                            >
                                                Start Process <ArrowRight size={16} weight="bold" />
                                            </button>
                                        </div>
                                    </motion.article>
                                );
                            })}
                        </motion.div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="py-24 bg-[var(--primary-navy)] relative overflow-hidden">
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
                    <div className="absolute right-0 bottom-0 w-96 h-96 bg-[var(--accent-gold)] rounded-full mix-blend-overlay filter blur-[100px] opacity-20"></div>

                    <div className="container-custom relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/10"
                        >
                            <span className="text-[var(--accent-gold)] font-bold tracking-widest uppercase text-sm mb-4 block">Ready to move?</span>
                            <h2 className="text-4xl md:text-5xl font-head font-bold text-white mb-6">Plan your next step with us</h2>
                            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                                Book a consultation and get a clear roadmap, document checklist, and timeline tailored to you.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button onClick={() => navigate("/login")} className="bg-[var(--accent-gold)] text-[var(--primary-navy)] px-10 py-4 rounded-md font-bold text-sm uppercase tracking-widest hover:bg-white transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                    Book Consultation
                                </button>
                                <button onClick={() => navigate("/signup")} className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-md font-bold text-sm uppercase tracking-widest hover:bg-white hover:text-[var(--primary-navy)] transition-colors transform hover:-translate-y-1">
                                    Create Account
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ServicesPage;
