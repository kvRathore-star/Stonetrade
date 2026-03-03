'use client';

import React, { useState } from 'react';
import type { Page } from '@/lib/navigation';

type SellerType = 'Factory' | 'Trader' | 'Quarry' | 'Exporter' | 'Individual Dealer';

const RegistrationPage: React.FC<{ navigateTo: (page: Page) => void }> = ({ navigateTo }) => {
    const [step, setStep] = useState(1);
    const [sellerType, setSellerType] = useState<SellerType>('Trader');
    
    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Create Your Seller Account</h2>
                        <p className="text-stone-secondary mb-6">Join India's leading stone marketplace.</p>
                        <div className="space-y-4">
                             <div>
                                <label className="block text-sm font-medium">Email Address</label>
                                <input type="email" placeholder="you@example.com" className="w-full p-2 border rounded mt-1" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium">Phone / WhatsApp</label>
                                <input type="tel" placeholder="+91 98765 43210" className="w-full p-2 border rounded mt-1" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium">Password</label>
                                <input type="password" className="w-full p-2 border rounded mt-1" />
                            </div>
                        </div>
                        <button onClick={nextStep} className="mt-6 w-full bg-stone-primary text-white py-3 rounded-lg font-semibold">
                            Next: Business Details
                        </button>
                    </div>
                );
            case 2:
                return (
                     <div>
                        <h2 className="text-2xl font-bold mb-6">Tell Us About Your Business</h2>
                        <div className="space-y-4">
                           <div>
                                <label className="block text-sm font-medium">I am a...</label>
                                <select value={sellerType} onChange={(e) => setSellerType(e.target.value as SellerType)} className="w-full p-2 border rounded mt-1">
                                    <option>Factory</option>
                                    <option>Trader</option>
                                    <option>Quarry</option>
                                    <option>Exporter</option>
                                    <option>Individual Dealer</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Business Name</label>
                                <input type="text" className="w-full p-2 border rounded mt-1" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium">Business Location (City, State)</label>
                                <input type="text" className="w-full p-2 border rounded mt-1" />
                            </div>
                            <div>
                               <label className="block text-sm font-medium">GST Number (optional)</label>
                               <input type="text" className="w-full p-2 border rounded mt-1" />
                            </div>
                             <div>
                               <label className="block text-sm font-medium">PAN / Aadhaar</label>
                               <input type="file" className="w-full text-sm mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stone-accent/20 file:text-stone-accent hover:file:bg-stone-accent/30" />
                            </div>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <button onClick={prevStep} className="w-full bg-stone-secondary text-white py-3 rounded-lg font-semibold">Back</button>
                            <button onClick={nextStep} className="w-full bg-stone-primary text-white py-3 rounded-lg font-semibold">Submit for Verification</button>
                        </div>
                    </div>
                );
            case 3:
                 return (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">🚀 Thank You!</h2>
                        <p className="text-stone-secondary mb-6">Your application has been submitted. Our team will review your details and you will be notified via email within 2-3 business days. Welcome to StoneTrade!</p>
                        <button onClick={() => navigateTo('home')} className="bg-stone-primary text-white py-2 px-8 rounded-lg font-semibold">
                            Back to Home
                        </button>
                    </div>
                 )
        }
    }

    return (
         <div className="min-h-[60vh] flex items-center justify-center">
            <div className="max-w-md w-full mx-auto">
                <div className="bg-stone-white p-8 rounded-xl shadow-lg">
                    {/* Progress Bar */}
                    <div className="mb-8">
                      <div className="relative h-2 bg-stone-light rounded-full">
                        <div 
                           className="absolute top-0 left-0 h-2 bg-stone-accent rounded-full transition-all duration-500"
                           style={{width: `${(step-1) / 2 * 100}%`}}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-2 text-stone-secondary">
                          <span>Account Setup</span>
                          <span>Business Details</span>
                          <span>Verification</span>
                      </div>
                    </div>
                    {renderStep()}
                </div>
                 <p className="text-center text-sm text-stone-secondary mt-4">Already have an account? <a href="#" className="text-stone-accent font-semibold">Login</a></p>
            </div>
         </div>
    );
};

export default RegistrationPage;
