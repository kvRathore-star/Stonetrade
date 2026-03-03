import React from 'react';
import { ShieldIcon, StarIcon, CheckIcon, TruckIcon } from '@/components/IconComponents';

const AboutPage: React.FC = () => {
    return (
        <div className="pb-24">
            {/* Hero Section */}
            <section className="bg-stone-primary relative overflow-hidden text-white pt-24 pb-32 mb-16 -mt-8 mx-0 lg:-mx-8 lg:rounded-[3rem] shadow-2xl">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-stone-kesariya rounded-full mix-blend-screen filter blur-[100px] opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>

                <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-stone-kesariya/20 border border-stone-kesariya/30 text-stone-kesariya text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
                        Bharat Native Craftsmanship
                    </span>
                    <h1 className="text-5xl lg:text-7xl font-black mb-8 tracking-tighter leading-tight">
                        Rooted in Heritage.<br />
                        Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-stone-kesariya to-stone-accent">Global Scale.</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed">
                        StoneTrade was founded with a singular mission: to bring transparency, strict quality control, and digital efficiency to India's centuries-old stone trade infrastructure.
                    </p>
                </div>
            </section>

            {/* The Problem & Our Solution */}
            <section className="container mx-auto px-4 lg:px-8 mb-24 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl lg:text-4xl font-black text-stone-primary tracking-tight leading-tight">The Modern Standard<br />for Ancient Stone</h2>
                        <div className="w-20 h-1.5 bg-gradient-to-r from-stone-kesariya to-stone-accent rounded-full mb-8"></div>
                        <p className="text-stone-secondary leading-relaxed text-lg">
                            For generations, procuring high-quality Indian marble like Makrana or authentic Rajasthan Granite meant opaque pricing, endless physical yard visits, and unacceptable quality inconsistencies upon delivery.
                        </p>
                        <p className="text-stone-secondary leading-relaxed text-lg">
                            StoneTrade digitizes this entire supply chain. We connect architects, commercial builders, and global buyers directly to the most reputable, verified quarries and factories across 28 states in India.
                        </p>
                    </div>
                    <div className="bg-stone-light p-10 lg:p-14 rounded-[3rem] border border-stone-accent/10 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5 transform rotate-12">
                            <StarIcon className="w-64 h-64 text-stone-primary" />
                        </div>
                        <h3 className="text-2xl font-black mb-10 text-stone-primary relative z-10">Why the Elite Choose Us</h3>
                        <ul className="space-y-8 relative z-10">
                            {[
                                { title: '100% Quality Inspected', desc: 'Every seller undergoes a rigorous audit of their factory, machinery, and past deliverables before listing.' },
                                { title: 'Quarry-Direct B2B Pricing', desc: 'By connecting you directly to the source, we ensure authentic prices with strict GST invoicing.' },
                                { title: 'End-to-End Escrow & Logistics', desc: 'From sample dispatch to multi-container bulk shipments, your capital is protected until quality is verified.' }
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-5">
                                    <div className="mt-1 bg-white p-3 text-emerald-500 rounded-2xl shadow-sm border border-emerald-500/20 shrink-0">
                                        <CheckIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-stone-primary text-lg mb-2">{item.title}</h4>
                                        <p className="text-sm text-stone-secondary leading-relaxed">{item.desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Our Audit Process */}
            <section className="bg-stone-primary text-white py-24 mx-0 lg:-mx-8 lg:rounded-[3rem] shadow-inner mb-24">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center mb-20">
                        <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-6">The StoneTrade Audit Protocol</h2>
                        <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">How we guarantee the slab you see on your screen matches the stone that arrives at your construction site.</p>
                    </div>

                    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                        {[
                            { icon: ShieldIcon, title: '1. Source Verification', desc: 'Our ground teams physically audit the quarry or factory in Rajasthan, Gujarat, or South India to verify production capacity and raw material authenticity.' },
                            { icon: StarIcon, title: '2. Slab Calibration Check', desc: 'We mandate uniform thickness, strict epoxy standards, and precision polishing. Sellers failing calibration tolerance are instantly delisted.' },
                            { icon: TruckIcon, title: '3. Dispatch Logistics', desc: 'Pre-dispatch video inspections and professional heavy-load packing ensure zero transit breakage across our 28-state Pan-India delivery network.' }
                        ].map((step, i) => (
                            <div key={i} className="bg-white/5 p-10 lg:p-12 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors group">
                                <div className="bg-stone-kesariya/20 inline-block p-4 rounded-2xl mb-8 group-hover:scale-110 transition-transform">
                                    <step.icon className="w-8 h-8 text-stone-kesariya" />
                                </div>
                                <h3 className="text-2xl font-black mb-4">{step.title}</h3>
                                <p className="text-white/60 leading-relaxed text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
