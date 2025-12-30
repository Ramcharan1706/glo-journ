import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Info, Siren, Scales, ArrowLeft } from "@phosphor-icons/react";
import "@/pages/LandingPage.css";

const DisclaimerPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>Legal Disclaimer - GloJourn</title>
                <meta name="description" content="GloJourn Legal Disclaimer and Regulatory Information" />
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
                    <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-amber-300 font-semibold tracking-widest uppercase text-xs mb-6">
                        Important Notice
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-head)' }}>
                        Legal Disclaimer
                    </h1>
                    <p className="text-lg text-white/60">Important Regulatory Information</p>
                </div>

                {/* Content Card */}
                <div className="container-custom pb-20">
                    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 md:p-16 space-y-12">
                        <section>
                            <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3" style={{ fontFamily: 'var(--font-head)' }}>
                                <Siren size={32} className="text-red-500" /> Not Legal Advice
                            </h2>
                            <div className="p-6 bg-red-50 border-l-4 border-red-500 rounded-xl mb-6">
                                <p className="text-slate-700 leading-relaxed">
                                    The content on this website is provided for general information purposes only. <strong className="text-red-900">It does not constitute legal advice or professional immigration advice.</strong>
                                </p>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                Immigration laws and regulations are complex and subject to frequent change. You should not rely on any information contained on this website without seeking the advice of a qualified immigration professional or legal counsel regarding your specific circumstances.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3" style={{ fontFamily: 'var(--font-head)' }}>
                                <Scales size={32} className="text-teal-600" /> No Guarantee of Outcome
                            </h2>
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                                <p className="text-slate-600 leading-relaxed">
                                    Past results described on this site do not guarantee future outcomes. Every immigration case is unique. GloJourn cannot and does not guarantee the approval of any visa, permit, or application. Decisions are made solely by the relevant government immigration authorities.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3" style={{ fontFamily: 'var(--font-head)' }}>
                                <Info size={32} className="text-teal-600" /> Third-Party Links
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                This website may contain links to third-party websites (e.g., government immigration portals). GloJourn is not responsible for the content, accuracy, or privacy practices of these external sites.
                            </p>
                        </section>

                        {/* CTA */}
                        <div className="p-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl text-center border border-teal-100">
                            <p className="text-slate-700 font-medium text-lg mb-4">
                                For specific legal advice concerning your case, consult with our licensed experts.
                            </p>
                            <button
                                onClick={() => navigate("/login")}
                                className="btn-custom btn-primary-custom"
                            >
                                Book a Consultation
                            </button>
                        </div>

                        {/* Footer within card */}
                        <div className="pt-8 border-t border-slate-100 text-center">
                            <p className="text-slate-500 text-sm">
                                © 2025 GloJourn Inc. All Rights Reserved.
                            </p>
                            <div className="mt-4 flex justify-center gap-4 text-sm">
                                <a onClick={() => navigate("/privacy-policy")} className="text-teal-600 hover:text-teal-800 cursor-pointer">Privacy Policy</a>
                                <span className="text-slate-300">|</span>
                                <a onClick={() => navigate("/terms-of-service")} className="text-teal-600 hover:text-teal-800 cursor-pointer">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DisclaimerPage;
