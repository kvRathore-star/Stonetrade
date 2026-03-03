import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Shipping & Logistics | StoneTrade',
    description: 'Information regarding B2B shipping, packing, and dispatch from Indian quarries to global sites.',
};

export default function ShippingPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-4 bg-stone-light/30">
            <div className="max-w-4xl mx-auto bg-white p-10 lg:p-16 rounded-[3rem] shadow-sm border border-stone-accent/10">
                <h1 className="text-4xl font-black mb-8 text-stone-primary">Shipping & Logistics</h1>
                <p className="text-sm text-stone-secondary mb-12">Logistics for B2B Stone Procurement</p>

                <div className="prose prose-stone max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:text-stone-primary prose-h2:mt-12 prose-h2:mb-4 prose-p:text-stone-secondary prose-p:leading-relaxed">
                    <h2>1. Sample Dispersion</h2>
                    <p>Stone samples (typically 4x4 inches or 6x6 inches) are dispatched from the seller's factory via expedited courier partners (e.g., BlueDart, Delhivery) directly to the buyer's architectural firm or site office.</p>
                    <ul>
                        <li><strong>Dispatch Time:</strong> 1-3 Business Days post-payment confirmation.</li>
                        <li><strong>Delivery ETA:</strong> 2-5 Business Days Pan-India.</li>
                    </ul>

                    <h2>2. Bulk & Container Shipping</h2>
                    <p>Logistics for commercial slab or block orders are a massive undertaking requiring specialized heavy transport (Flatbed trailers, A-Frame trucks) or marine containers.</p>
                    <p>StoneTrade facilitates the introduction to logistics partners, or buyers may arrange their own transport Ex-Works (EXW) from the seller's factory in Rajasthan, Gujarat, or South India.</p>

                    <h2>3. Packing Protocols</h2>
                    <p>To minimize transit breakage, all StoneTrade verified bulk sellers are required to pack slabs vertically on sturdy wooden A-Frames or in fumigated wooden crates suitable for heavy crane loading, strictly adhering to container weight limits.</p>

                    <h2>4. Breakage and Transport Insurance</h2>
                    <p>Natural stone is heavy and brittle. Transporting multi-ton slabs across India carries inherent risks. <strong>StoneTrade strongly mandates that buyers secure transit insurance.</strong> Our trusted logistics partners can provide premium insurance coverage for the total invoice value of the load before the truck leaves the origin weighing bridge.</p>
                </div>
            </div>
        </main>
    );
}
