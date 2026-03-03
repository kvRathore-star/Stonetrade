import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | StoneTrade',
    description: 'Privacy Policy regarding B2B data handling on the StoneTrade platform.',
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-4 bg-stone-light/30">
            <div className="max-w-4xl mx-auto bg-white p-10 lg:p-16 rounded-[3rem] shadow-sm border border-stone-accent/10">
                <h1 className="text-4xl font-black mb-8 text-stone-primary">Privacy Policy</h1>
                <p className="text-sm text-stone-secondary mb-12">Last Updated: March 3, 2026</p>

                <div className="prose prose-stone max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:text-stone-primary prose-h2:mt-12 prose-h2:mb-4 prose-p:text-stone-secondary prose-p:leading-relaxed">
                    <h2>1. Data Collection</h2>
                    <p>We collect B2B contact info (GST numbers, company addresses, corporate emails, and mobile numbers for WhatsApp integration) to verify your identity as a legitimate buyer or seller of natural stone.</p>

                    <h2>2. Verification & KYC</h2>
                    <p>Seller profiles undergo rigorous KYC (Know Your Customer) and KYB (Know Your Business) checks before onboarding. This documentation is securely stored and never sold to third parties.</p>

                    <h2>3. Usage of WhatsApp Data</h2>
                    <p>StoneTrade enables direct WhatsApp connections for Pro and Elite tier members. By listing your contact details, you consent to receiving B2B trade inquiries from verified architects and procurement buyers.</p>

                    <h2>4. Financial Information</h2>
                    <p>We do not store complete credit card or net banking details on our servers. All subscription and escrow payments are securely processed by Razorpay, our RBI-compliant payment gateway partner.</p>

                    <h2>5. Lead & RFQ Privacy</h2>
                    <p>Requests for Quote (RFQs) are semi-public to verified sellers on the platform to encourage competitive bidding. However, buyer contact details on RFQs are only visible to Sellers holding active Pro or Enterprise subscriptions.</p>
                </div>
            </div>
        </main>
    );
}
