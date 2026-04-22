import React, { useState } from 'react';

const OnboardingTour = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Sentinel Alpha",
      content: "This operations command center allows you to monitor transaction integrity and AI-driven fraud detection in real-time. Let's take a quick look at your new tools.",
      target: "Overview"
    },
    {
      title: "The Immutable Ledger",
      content: "Every transaction is hashed into a Blockchain. Even if someone hacks the database, the Ledger will detect the 'Drift' and sound the alarm. Check the 'Audit Ledger' tab for the full history.",
      target: "Ledger"
    },
    {
      title: "AI Ensemble Verdict",
      content: "We use two distinct AI models (Isolation Forest and DBSCAN). If they disagree, the system flags the transaction for manual review. You can see the 'Confidence %' for every fraud alert.",
      target: "AI Models"
    },
    {
      title: "Multi-Tenancy Isolation",
      content: "Your dashboard is strictly isolated to your organization. Data from other neobanks or fintechs will never cross into your view.",
      target: "Privacy"
    },
    {
      title: "Ready for Operations",
      content: "You're all set. Use the 'Inbox' to hear from your customers, and 'User Management' to promote investigators to your team.",
      target: "Finish"
    }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#0a0a0b] border border-blue-500/30 rounded-2xl max-w-lg w-full shadow-2xl shadow-blue-500/10 overflow-hidden">
        <div className="h-1 bg-gray-800">
          <div 
            className="h-full bg-blue-600 transition-all duration-300" 
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
        
        <div className="p-8">
          <div className="mb-6">
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2 block">
              Step {step + 1} of {steps.length}: {steps[step].target}
            </span>
            <h2 className="text-2xl font-bold text-white mb-4">{steps[step].title}</h2>
            <p className="text-gray-400 leading-relaxed">{steps[step].content}</p>
          </div>

          <div className="flex justify-between items-center">
            <button 
              onClick={onComplete}
              className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
            >
              Skip Tour
            </button>
            <button 
              onClick={handleNext}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
            >
              {step === steps.length - 1 ? "Get Started" : "Next Step"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;
