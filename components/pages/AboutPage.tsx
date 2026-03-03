'use client';

import React from 'react';

const AboutPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto py-16 px-4">
            <h1 className="text-5xl font-black mb-8 text-stone-primary">Empowering the Future of India’s Stone Industry.</h1>
            <div className="prose prose-lg text-stone-secondary leading-relaxed">
                <p>StoneTrade is a technology platform built to modernize and unify the natural stone ecosystem. We believe in transparency, efficiency, and professionalizing the way architectural stone is specified and traded across India.</p>
                
                <h3 className="text-2xl font-bold text-stone-primary mt-10 mb-4">Our Collaborative Vision</h3>
                <p>We work with manufacturers, local traders, and specialized brokers to create a seamless digital bridge to architects and builders. By providing advanced digital storefronts to traditional businesses, we ensure that every stakeholder—from the quarry owner to the local sourcing partner—has the tools to succeed in a digital-first market.</p>

                <h3 className="text-2xl font-bold text-stone-primary mt-10 mb-4">Quality & Trust</h3>
                <p>Through our proprietary verification clusters, we provide live audits of inventory and production capacities. This high level of trust enables builders to source with confidence, while allowing reputable sellers and agents to highlight their best materials to a national audience.</p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="bg-stone-white p-8 rounded-2xl shadow-sm border border-stone-accent/10">
                    <p className="text-4xl font-black text-stone-accent mb-2">500+</p>
                    <p className="text-sm font-bold uppercase tracking-widest">Partner Entities</p>
                </div>
                <div className="bg-stone-white p-8 rounded-2xl shadow-sm border border-stone-accent/10">
                    <p className="text-4xl font-black text-stone-accent mb-2">10k+</p>
                    <p className="text-sm font-bold uppercase tracking-widest">Live Inventory</p>
                </div>
                <div className="bg-stone-white p-8 rounded-2xl shadow-sm border border-stone-accent/10">
                    <p className="text-4xl font-black text-stone-accent mb-2">Direct</p>
                    <p className="text-sm font-bold uppercase tracking-widest">Communication</p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
