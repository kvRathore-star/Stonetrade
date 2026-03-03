import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | StoneTrade',
    description: 'Terms and conditions for using the StoneTrade B2B Marketplace.',
};

export default function TermsPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-4 bg-stone-light/30">
            <div className="max-w-4xl mx-auto bg-white p-10 lg:p-16 rounded-[3rem] shadow-sm border border-stone-accent/10">
                <h1 className="text-4xl font-black mb-8 text-stone-primary">Terms of Service</h1>
                <p className="text-sm text-stone-secondary mb-12">Last Updated: March 3, 2026</p>

                <div className="prose prose-stone max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:text-stone-primary prose-h2:mt-12 prose-h2:mb-4 prose-p:text-stone-secondary prose-p:leading-relaxed prose-li:text-stone-secondary">
                    <h2>1. Agreement to Terms</h2>
                    <p>By accessing or using the StoneTrade B2B Marketplace ("Platform"), you agree to be bound by these Terms of Service. StoneTrade operates as a digital intermediary connecting buyers (architects, builders, contractors) with verified sellers (quarries, manufacturers, wholesalers).</p>

                    <h2>2. B2B Trading Nature</h2>
                    <p>StoneTrade is strictly a Business-to-Business (B2B) platform. By registering, you confirm you are acting on behalf of a registered business entity. Consumer protection laws applicable to retail B2C transactions may not apply to bulk stone procurement on this platform.</p>

                    <h2>3. Order Types & Escrow</h2>
                    <ul>
                        <li><strong>Sample Orders:</strong> Dispatched via courier. Platform fees apply as indicated during checkout.</li>
                        <li><strong>Bulk/RFQ Orders:</strong> Handled via digital contracting. Funds may be held in escrow until quality inspections are passed, as per the specific agreed-upon terms between Buyer and Seller.</li>
                        <li><strong>Direct WhatsApp Deals:</strong> StoneTrade takes no responsibility or commission for deals closed completely off-platform via provided WhatsApp contacts.</li>
                    </ul>

                    <h2>4. Quality and Calibration Tolerances</h2>
                    <p>Natural stone (Marble, Granite, Sandstone) inherently contains variations in color, veining, and texture. While StoneTrade mandates strict calibration tolerances (e.g., +/- 1mm on thickness), natural variations from digital photographs do not constitute a "defect." Sellers are responsible for honoring the specific aesthetic tolerances agreed upon in the RFQ.</p>

                    <h2>5. Dispute Resolution</h2>
                    <p>Any disputes arising from transactions conducted purely on-platform will first enter a mandatory 14-day mediation period facilitated by the StoneTrade Audit Team. If unresolved, jurisdiction falls under the courts of Jaipur, Rajasthan, India.</p>

                    <h2>6. Subscription Plans</h2>
                    <p>Buyer Pro, Buyer Elite, Seller Pro, and Seller Enterprise subscriptions are billed on a recurring basis. You may cancel at any time, but no prorated refunds are issued for mid-cycle cancellations.</p>
                </div>
            </div>
        </main>
    );
}
