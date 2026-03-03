import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Return & Refund Policy | StoneTrade',
    description: 'B2B Return and Refund policies for natural stone bulk and sample orders.',
};

export default function RefundPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-4 bg-stone-light/30">
            <div className="max-w-4xl mx-auto bg-white p-10 lg:p-16 rounded-[3rem] shadow-sm border border-stone-accent/10">
                <h1 className="text-4xl font-black mb-8 text-stone-primary">Refund & Return Policy</h1>
                <p className="text-sm text-stone-secondary mb-12">Applicable for B2B Stone Procurement</p>

                <div className="prose prose-stone max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:text-stone-primary prose-h2:mt-12 prose-h2:mb-4 prose-p:text-stone-secondary prose-p:leading-relaxed">
                    <h2>1. Sample Orders</h2>
                    <p>Sample orders are final sale. Because sample boxes are cut specifically for architectural review and incur heavy courier fees, we do not accept returns or issue refunds for sample boxes once dispatched, unless the sample arrives completely shattered and unusable.</p>

                    <h2>2. Bulk Commercial Orders</h2>
                    <p>For bulk slab or block orders processed through StoneTrade Escrow, buyers have the right to reject the material <strong>before loading</strong> at the seller's factory/quarry, based on the pre-dispatch video/physical inspection.</p>
                    <p>Once material is approved for loading and departs the origin yard, returns are highly restricted. Returns for bulk stone are only accepted if:</p>
                    <ul>
                        <li>The received material is a completely different stone type or color than the approved inspection images.</li>
                        <li>The material fails agreed-upon calibration parameters (e.g., severe thickness variations beyond standard +/- 1.5mm tolerance).</li>
                        <li>Over 15% of the slabs arrive broken (subject to shipping insurance terms).</li>
                    </ul>

                    <h2>3. Natural Characteristics vs. Defects</h2>
                    <p>Natural stone inherently features variations in veining, color, and mineral distribution from block to block. Fissures, dry seams, and standard factory resin/epoxy filling are standard industry practices and do not constitute a "defect" eligible for return.</p>

                    <h2>4. Subscription Refunds</h2>
                    <p>Monthly and Annual SaaS subscriptions (Buyer Pro/Elite, Seller Pro/Enterprise) are non-refundable. You may cancel your renewal at any time through your dashboard.</p>
                </div>
            </div>
        </main>
    );
}
