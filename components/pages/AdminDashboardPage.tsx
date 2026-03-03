'use client';

import React from 'react';
import { useMockData } from '@/hooks/useMockData';
import { ShieldIcon, SearchIcon, UserIcon, StarIcon } from '@/components/IconComponents';

const AdminDashboardPage: React.FC = () => {
    const { sellers } = useMockData();
    const pendingSellers = sellers.filter(s => !s.isVerified);

    const StatCard: React.FC<{title: string, value: string, subtitle: string, icon: React.ReactNode, colorClass: string}> = ({title, value, subtitle, icon, colorClass}) => (
        <div className="bg-stone-white p-6 rounded-2xl shadow-sm border border-stone-accent/5 flex items-start space-x-4">
            <div className={`p-3 rounded-xl ${colorClass}`}>
                {icon}
            </div>
            <div className="flex-grow">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-stone-secondary">{title}</h3>
                <p className="text-2xl font-black text-stone-primary mt-1">{value}</p>
                <p className="text-[10px] text-stone-secondary mt-1">{subtitle}</p>
            </div>
        </div>
    );

    const RupeeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 4h4m-5 4h5M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5z" /></svg>;

    return (
        <div className="space-y-12">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold">Admin Headquarters</h1>
                    <p className="text-stone-secondary">Managing Revenue & Service-Led Trust</p>
                </div>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-xs font-black">SYSTEM STABLE</div>
            </header>

            {/* Service Revenue Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard 
                    title="Audit Subscriptions" 
                    value="₹12.4L" 
                    subtitle="35 New Sellers this month" 
                    icon={<ShieldIcon className="h-6 w-6" />} 
                    colorClass="bg-amber-100 text-amber-600"
                />
                <StatCard 
                    title="Lead Credits" 
                    value="₹8.9L" 
                    subtitle="4.5k credits sold" 
                    icon={<SearchIcon className="h-6 w-6" />} 
                    colorClass="bg-blue-100 text-blue-600"
                />
                <StatCard 
                    title="Inspection Fees" 
                    value="₹4.2L" 
                    subtitle="168 lots verified" 
                    icon={<SearchIcon className="h-6 w-6" />} 
                    colorClass="bg-purple-100 text-purple-600"
                />
                 <StatCard 
                    title="Total Revenue" 
                    value="₹25.5L" 
                    subtitle="Monthly platform earnings" 
                    icon={<RupeeIcon />} 
                    colorClass="bg-stone-primary text-white"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-stone-white p-8 rounded-3xl shadow-sm border border-stone-accent/10">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-black">Audit Verification Queue</h2>
                        <span className="text-xs font-bold text-stone-accent uppercase tracking-widest">Priority: High</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b">
                                <tr className="text-[10px] font-black text-stone-secondary uppercase tracking-widest">
                                    <th className="pb-4">Seller Details</th>
                                    <th className="pb-4">Location</th>
                                    <th className="pb-4">Package</th>
                                    <th className="pb-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {pendingSellers.map(seller => (
                                    <tr key={seller.id} className="hover:bg-stone-light/30 transition-colors">
                                        <td className="py-4 font-bold text-sm">
                                            {seller.name}
                                            <div className="text-[10px] text-stone-secondary font-normal">Registered 2 days ago</div>
                                        </td>
                                        <td className="py-4 text-xs text-stone-secondary">{seller.location}</td>
                                        <td className="py-4">
                                            <span className="bg-stone-accent/10 text-stone-accent text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Gold Audit (₹35k)</span>
                                        </td>
                                        <td className="py-4 text-right space-x-2">
                                            <button className="bg-stone-primary text-white text-[10px] font-black px-4 py-2 rounded-lg uppercase">Schedule Visit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-stone-primary text-white p-8 rounded-3xl shadow-xl">
                        <h3 className="font-black text-lg mb-6">Revenue Outlook</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-xs mb-2"><span>$100k Target Progress</span><span>45%</span></div>
                                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-stone-accent w-[45%]"></div>
                                </div>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                <p className="text-[10px] text-stone-accent font-black uppercase mb-1">Top Revenue Driver</p>
                                <p className="text-sm font-bold">Kishangarh Verification Cluster</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-stone-white p-8 rounded-3xl shadow-sm border border-stone-accent/10">
                        <h3 className="font-bold mb-4">Inspection Experts (Pool: 42)</h3>
                        <div className="space-y-4">
                            {[
                                { name: "Rajesh K.", loc: "Kishangarh", active: 4 },
                                { name: "Vikram S.", loc: "Makrana", active: 2 },
                                { name: "Anil P.", loc: "Udaipur", active: 1 },
                            ].map((exp, i) => (
                                <div key={i} className="flex justify-between items-center p-3 bg-stone-light/50 rounded-xl">
                                    <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 bg-stone-accent/20 rounded-full flex items-center justify-center font-black text-xs">{exp.name[0]}</div>
                                        <div>
                                            <p className="text-xs font-bold">{exp.name}</p>
                                            <p className="text-[10px] text-stone-secondary">{exp.loc}</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{exp.active} Ongoing</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 text-stone-accent text-xs font-black uppercase hover:underline">Manage Network &rarr;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
