'use client';

import { AvatarHeader } from '@/components/dashboard/AvatarHeader';
import { BottomNavigation } from '@/components/dashboard/BottomNavigation';
import { MobileHeader } from '@/components/dashboard/MobileHeader';
import { Sidebar } from '@/components/dashboard/Sidebar';
import React, { useState } from 'react';

export default function SetupBusinessPage() {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(1);
  const [businessData, setBusinessData] = useState({
    name: '',
    industry: '',
    email: '',
    website: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBusinessData({
      ...businessData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Here you could send data to your backend
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Business Name</h3>
            <input
              className="input input-bordered w-full mb-4"
              type="text"
              name="name"
              placeholder="Enter your business name"
              value={businessData.name}
              onChange={handleChange}
              required
            />
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Industry</h3>
            <select
              className="select select-bordered w-full mb-4"
              name="industry"
              value={businessData.industry}
              onChange={handleChange}
              required
            >
              <option value="">Select industry</option>
              <option value="Technology">Technology</option>
              <option value="Retail">Retail</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Other">Other</option>
            </select>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
            <input
              className="input input-bordered w-full mb-4"
              type="email"
              name="email"
              placeholder="Business email"
              value={businessData.email}
              onChange={handleChange}
              required
            />
            <input
              className="input input-bordered w-full"
              type="text"
              name="website"
              placeholder="Business website (optional)"
              value={businessData.website}
              onChange={handleChange}
            />
          </div>
        );
      case 4:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Review & Confirm</h3>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {businessData.name || 'Not provided'}</p>
              <p><strong>Industry:</strong> {businessData.industry || 'Not provided'}</p>
              <p><strong>Email:</strong> {businessData.email || 'Not provided'}</p>
              <p><strong>Website:</strong> {businessData.website || 'Not provided'}</p>
            </div>
            {submitted && (
              <div className="alert alert-success mt-4">
                Business setup complete!
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-base-100 relative">
      {/* Desktop Header */}
      <div className="relative z-40">
        <AvatarHeader />
      </div>
      {/* Mobile Header */}
      <div className="relative z-40">
        <MobileHeader />
      </div>
      {/* Main Content */}
      <div className="flex-1 flex relative">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        {/* Setup Form Area */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
          <div className="w-full max-w-xl bg-base-200 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-2">Set Up Your Business</h2>
            <p className="mb-6 text-base-content/70">Let&apos;s get your business ready to use the dashboard.</p>
            {/* Stepper */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex-1 flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep === step ? 'bg-primary text-primary-content' : 'bg-base-300 text-base-content/60'}`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`h-1 w-full ${currentStep > step ? 'bg-primary' : 'bg-base-300'}`}></div>
                  )}
                </div>
              ))}
            </div>
            {/* Step Content */}
            {renderStep()}
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                className="btn btn-outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                type="button"
              >
                Back
              </button>
              {currentStep < totalSteps ? (
                <button
                  className="btn btn-primary"
                  onClick={nextStep}
                  type="button"
                  disabled={
                    (currentStep === 1 && !businessData.name) ||
                    (currentStep === 2 && !businessData.industry) ||
                    (currentStep === 3 && !businessData.email)
                  }
                >
                  Next
                </button>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={handleSubmit}
                  type="button"
                  disabled={submitted}
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}