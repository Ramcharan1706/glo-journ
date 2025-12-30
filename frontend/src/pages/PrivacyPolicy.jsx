import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, LockKey, Scroll, ArrowLeft } from "@phosphor-icons/react";
import "@/pages/LandingPage.css";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Privacy Policy - GloJourn</title>
        <meta name="description" content="GloJourn Privacy Policy and Data Protection" />
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
            Compliance
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'var(--font-head)' }}>
            Privacy Policy
          </h1>
          <p className="text-lg text-white/60">Last Updated: December 27, 2025</p>
        </div>

        {/* Content Card */}
        <div className="container-custom pb-20">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-10 md:p-16 space-y-12">
            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3" style={{ fontFamily: 'var(--font-head)' }}>
                <ShieldCheck size={32} className="text-teal-600" /> 1. Overview
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                At GloJourn, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information in compliance with applicable data protection laws. We practice data minimization, collecting only what is strictly necessary to provide our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3" style={{ fontFamily: 'var(--font-head)' }}>
                <Scroll size={32} className="text-teal-600" /> 2. Information We Collect
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-xl">
                  <div className="bg-teal-600 text-white p-2 rounded-lg font-bold text-sm min-w-[40px] text-center">01</div>
                  <p className="text-slate-600 leading-relaxed"><strong className="text-slate-800">Contact Information:</strong> Name, email address, and phone number when you inquire or book a consultation.</p>
                </div>
                <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-xl">
                  <div className="bg-teal-600 text-white p-2 rounded-lg font-bold text-sm min-w-[40px] text-center">02</div>
                  <p className="text-slate-600 leading-relaxed"><strong className="text-slate-800">Case Context:</strong> General information about your immigration goals (e.g., "Student Visa", "Corporate Relocation").</p>
                </div>
                <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-xl">
                  <div className="bg-teal-600 text-white p-2 rounded-lg font-bold text-sm min-w-[40px] text-center">03</div>
                  <p className="text-slate-600 leading-relaxed"><strong className="text-slate-800">Technical Data:</strong> IP address and browser type for security and site optimization purposes.</p>
                </div>
              </div>
              <div className="mt-8 p-6 bg-amber-50 border-l-4 border-amber-500 rounded-xl">
                <p className="text-amber-900">
                  <strong>Important Note:</strong> We do NOT collect sensitive personal data (such as passport numbers, financial details, or medical records) through our public website forms. Such information is only requested through our secure Client Portal after a formal engagement.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center gap-3" style={{ fontFamily: 'var(--font-head)' }}>
                <LockKey size={32} className="text-teal-600" /> 3. How We Use Your Data
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We use your information solely for the following professional purposes:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl text-slate-700 border border-slate-100">
                  <span className="w-2 h-2 bg-teal-600 rounded-full"></span> Responding to inquiries
                </li>
                <li className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl text-slate-700 border border-slate-100">
                  <span className="w-2 h-2 bg-teal-600 rounded-full"></span> Providing requested services
                </li>
                <li className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl text-slate-700 border border-slate-100">
                  <span className="w-2 h-2 bg-teal-600 rounded-full"></span> Administrative updates
                </li>
                <li className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl text-slate-700 border border-slate-100">
                  <span className="w-2 h-2 bg-teal-600 rounded-full"></span> Security maintenance
                </li>
              </ul>
            </section>

            <section className="pt-8 border-t border-slate-100">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-head)' }}>4. Data Sharing & Security</h2>
              <p className="text-slate-600 leading-relaxed">
                We do not sell your personal data. We may share data with trusted third-party service providers (e.g., secure hosting, email services) bound by confidentiality agreements. We implement industry-standard security measures, including SSL encryption, to protect your data.
              </p>
            </section>

            <section className="pt-8 border-t border-slate-100">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4" style={{ fontFamily: 'var(--font-head)' }}>5. Your Rights</h2>
              <p className="text-slate-600 leading-relaxed">
                You have the right to access, correct, or request deletion of your personal data. To exercise these rights, please contact our Data Protection Officer at <span className="text-teal-600 font-semibold">privacy@glojourn.com</span>.
              </p>
            </section>

            {/* Footer within card */}
            <div className="pt-8 border-t border-slate-100 text-center">
              <p className="text-slate-500 text-sm">
                © 2025 GloJourn Inc. All Rights Reserved.
              </p>
              <div className="mt-4 flex justify-center gap-4 text-sm">
                <a onClick={() => navigate("/terms-of-service")} className="text-teal-600 hover:text-teal-800 cursor-pointer">Terms of Service</a>
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

export default PrivacyPolicy;
