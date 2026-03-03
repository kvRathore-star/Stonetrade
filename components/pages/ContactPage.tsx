'use client';

import React from 'react';
import { SendIcon } from '@/components/IconComponents';

const ContactPage: React.FC = () => {
    return (
        <div className="max-w-6xl mx-auto py-16 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                    <h1 className="text-5xl font-black mb-6">Let's Talk Stone.</h1>
                    <p className="text-xl text-stone-secondary mb-12">Whether you're a builder looking for bulk supply or a seller wanting to join the network, we're here to help.</p>
                    
                    <div className="space-y-8">
                        <div>
                            <h4 className="font-bold text-stone-accent uppercase text-xs tracking-widest mb-2">Headquarters</h4>
                            <p className="text-lg">Jaipur, Rajasthan, India</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-stone-accent uppercase text-xs tracking-widest mb-2">Sales Email</h4>
                            <p className="text-lg">hello@stonetrade.in</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-stone-accent uppercase text-xs tracking-widest mb-2">Support Phone</h4>
                            <p className="text-lg">+91 141-XXXXXXX</p>
                        </div>
                    </div>
                </div>

                <div className="bg-stone-white p-10 rounded-[3rem] shadow-2xl border border-stone-accent/10">
                    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Message Sent!"); }}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-black uppercase mb-2">Name</label>
                                <input type="text" className="w-full bg-stone-light p-4 rounded-xl border-none focus:ring-2 focus:ring-stone-accent" required />
                            </div>
                            <div>
                                <label className="block text-xs font-black uppercase mb-2">Email</label>
                                <input type="email" className="w-full bg-stone-light p-4 rounded-xl border-none focus:ring-2 focus:ring-stone-accent" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase mb-2">Subject</label>
                            <select className="w-full bg-stone-light p-4 rounded-xl border-none focus:ring-2 focus:ring-stone-accent">
                                <option>General Inquiry</option>
                                <option>Seller Registration</option>
                                <option>Bulk Project Inquiry</option>
                                <option>Partnership</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase mb-2">Message</label>
                            <textarea rows={4} className="w-full bg-stone-light p-4 rounded-xl border-none focus:ring-2 focus:ring-stone-accent" required></textarea>
                        </div>
                        <button type="submit" className="w-full bg-stone-primary text-white py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-stone-accent transition-colors">
                            Send Message <SendIcon className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
