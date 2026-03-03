'use client';

import React, { useState } from 'react';
import { XIcon, PhoneIcon, SendIcon, VerifiedIcon, ShieldIcon } from '@/components/IconComponents';
import { useAuth } from '@/contexts/AuthContext';
import { Seller } from '@/types';

interface ContactModalProps {
    seller: Seller;
    isOpen: boolean;
    onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ seller, isOpen, onClose }) => {
    const { user } = useAuth();
    const [showSchedule, setShowSchedule] = useState(false);

    const isPro = user?.buyerTier === 'pro';

    if (!isOpen) return null;

    const handleWhatsApp = () => {
        if (seller.contact?.whatsapp) {
            window.open(`https://wa.me/${seller.contact.whatsapp.replace(/[^0-9]/g, '')}`, '_blank');
        }
    };

    const handleCall = () => {
        if (seller.contact?.phone) {
            window.location.href = `tel:${seller.contact.phone}`;
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-stone-primary/90 backdrop-blur-sm p-4">
            <div className="bg-white rounded-[3rem] w-full max-w-md overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-stone-primary text-white p-8 text-center relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <XIcon className="h-5 w-5" />
                    </button>

                    <div className="w-20 h-20 bg-stone-accent rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-black text-stone-primary">
                        {seller.name.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{seller.name}</h3>
                    <p className="text-stone-accent text-sm">{seller.location}</p>

                    <div className="flex justify-center gap-2 mt-4">
                        {seller.isVerified && (
                            <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                                <ShieldIcon className="h-3 w-3" />
                                {seller.verificationLevel}
                            </span>
                        )}
                    </div>
                </div>

                {/* Contact Options */}
                <div className="p-8">
                    {isPro ? (
                        <div className="space-y-4">
                            <div className="bg-stone-light/50 p-4 rounded-2xl">
                                <p className="text-[10px] text-stone-secondary font-bold uppercase tracking-wider mb-2">Phone Number</p>
                                <p className="text-lg font-bold text-stone-primary">{seller.contact?.phone || '+91 XXXXX XXXXX'}</p>
                            </div>

                            <div className="bg-stone-light/50 p-4 rounded-2xl">
                                <p className="text-[10px] text-stone-secondary font-bold uppercase tracking-wider mb-2">Email</p>
                                <p className="text-lg font-bold text-stone-primary">{seller.contact?.email || 'contact@seller.com'}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <button
                                    onClick={handleCall}
                                    className="bg-stone-primary text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-stone-secondary transition-colors"
                                >
                                    <PhoneIcon className="h-5 w-5" />
                                    Call Now
                                </button>
                                <button
                                    onClick={handleWhatsApp}
                                    className="bg-green-500 text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                                >
                                    <SendIcon className="h-5 w-5" />
                                    WhatsApp
                                </button>
                            </div>

                            <button
                                onClick={() => setShowSchedule(!showSchedule)}
                                className="w-full mt-4 text-stone-accent text-sm font-bold hover:underline"
                            >
                                Schedule a Yard Visit →
                            </button>

                            {showSchedule && (
                                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 animate-fade-in">
                                    <p className="text-sm text-amber-800">
                                        Contact the seller directly to schedule a yard visit. Gold sellers offer priority appointments.
                                    </p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-stone-light rounded-full mx-auto mb-6 flex items-center justify-center">
                                <VerifiedIcon className="h-8 w-8 text-stone-accent" />
                            </div>
                            <h4 className="text-xl font-bold text-stone-primary mb-2">Unlock Seller Contact</h4>
                            <p className="text-stone-secondary text-sm mb-6">
                                Upgrade to Buyer Pro to get direct access to seller phone, email, and WhatsApp.
                            </p>
                            <button className="w-full bg-stone-primary text-white py-4 rounded-2xl font-bold hover:bg-stone-accent hover:text-stone-primary transition-colors">
                                Get Pro @ ₹299/mo
                            </button>
                            <p className="text-[10px] text-stone-secondary mt-4">
                                Includes: Chat + Call support, 5% on orders, Unlimited unlocks
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
        </div>
    );
};

export default ContactModal;

