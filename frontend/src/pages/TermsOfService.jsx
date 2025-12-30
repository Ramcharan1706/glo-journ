import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Gavel, Warning, Handshake, ArrowLeft } from "@phosphor-icons/react";
import "@/pages/LandingPage.css";

const TermsOfService = () => {
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>Terms of Service - GloJourn</title>
                <meta name="description" content="GloJourn Terms of Service and User Agreement" />
            </Helmet>

            <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #0B132B 0%, #1a2a4a 100%)" }}>
                {/* Simple Back Link */}
                <div className="container-custom pt-8">
                    <a
                        onClick={() => navigate("/")}
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white cursor-pointer transition-colors text-sm font-medium"
                    >
                        <ArrowLeft size={18} />
                        Back to Home
                    </a>
                </div>

                {/* Header Section */}
                <div className="container-custom pt-12 pb-16 text-center">
                    <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-teal-300 font-semibold tracking-widest uppercase text-xs mb-6">
                        Legal Framework
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-head)' }}>
                        Terms of Service
                    </h1>
                    <p className="text-lg text-white/60">Last Updated: December 27, 2025</p>
                </div>

                {/* Content Card */}
                <div className="container-custom pb-20">
                    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 md:p-16 space-y-12">
                        <section>
                            <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3" style={{ fontFamily: 'var(--font-head)' }}>
                                <Handshake size={32} className="text-teal-600" /> 1. Acceptance of Terms
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                By accessing and using the GloJourn website ("Site"), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our Site.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3" style={{ fontFamily: 'var(--font-head)' }}>
                                <Warning size={32} className="text-amber-600" /> 2. No Legal Advice
                            </h2>
                            <div className="p-8 bg-red-50 border-l-4 border-red-500 rounded-2xl mb-6">
                                <p className="text-lg leading-relaxed text-slate-800">
                                    <strong className="text-red-900 block mb-2">IMPORTANT NOTICE:</strong>
                                    The information provided on this Site is for general informational purposes only and does <strong className="text-red-900">NOT</strong> constitute legal advice.
                                </p>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                Using this Site or contacting GloJourn via email or forms does not create an attorney-client or consultant-client relationship. Such a relationship is only established upon the signing of a formal engagement letter and payment of agreed fees. Do not act upon any information on this website without seeking professional legal counsel relevant to your specific situation and jurisdiction.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3" style={{ fontFamily: 'var(--font-head)' }}>
                                <Gavel size={32} className="text-teal-600" /> 3. Services & Limitations
                            </h2>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <p className="text-slate-600 leading-relaxed italic">
                                    "GloJourn provides immigration consulting and case management services. We make no guarantees regarding the outcome of any visa application, residency petition, or other immigration matter, as final decisions rest with the respective government authorities."
                                </p>
                            </div>
                        </section>

                        <section className="pt-8 border-t border-slate-100">
                            <h2 className="text-2xl font-semibold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-head)' }}>4. Intellectual Property</h2>
                            <p className="text-slate-600 leading-relaxed">
                                All content, design, and materials on this Site are the property of GloJourn or its licensors and are protected by copyright and intellectual property laws. You may not reproduce or redistribute content without our express written permission.
                            </p>
                        </section>

                        <section className="pt-8 border-t border-slate-100">
                            <h2 className="text-2xl font-semibold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-head)' }}>5. Limitation of Liability</h2>
                            <p className="text-slate-600 leading-relaxed">
                                GloJourn shall not be liable for any direct, indirect, incidental, or consequential damages arising out of the use or inability to use this Site or for any errors or omissions in the content.
                            </p>
                        </section>

                        {/* Footer within card */}
                        <div className="pt-8 border-t border-slate-100 text-center">
                            <p className="text-slate-500 text-sm">
                                © 2025 GloJourn Inc. All Rights Reserved.
                            </p>
                            <div className="mt-4 flex justify-center gap-4 text-sm">
                                <a onClick={() => navigate("/privacy-policy")} className="text-teal-600 hover:text-teal-800 cursor-pointer">Privacy Policy</a>
                                <span className="text-slate-300">|</span>
                                <a onClick={() => navigate("/disclaimer")} className="text-teal-600 hover:text-teal-800 cursor-pointer">Legal Disclaimer</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsOfService;
