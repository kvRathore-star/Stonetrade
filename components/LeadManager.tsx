'use client';

import React, { useState } from 'react';
import { PhoneIcon, ChatIcon, ClockIcon, CheckIcon, XIcon } from '@/components/IconComponents';

export interface Lead {
    id: string;
    buyerName: string;
    buyerPhone: string;
    buyerEmail?: string;
    productName: string;
    productId: number;
    type: 'sample' | 'bulk' | 'inquiry';
    status: 'new' | 'contacted' | 'converted' | 'lost';
    createdAt: Date;
    notes?: string;
    isPro: boolean;
}

interface LeadManagerProps {
    leads: Lead[];
    onUpdateStatus: (leadId: string, status: Lead['status']) => void;
    onAddNote: (leadId: string, note: string) => void;
}

const LeadManager: React.FC<LeadManagerProps> = ({ leads, onUpdateStatus, onAddNote }) => {
    const [filter, setFilter] = useState<'all' | Lead['status']>('all');
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [noteInput, setNoteInput] = useState('');

    const filteredLeads = filter === 'all' ? leads : leads.filter(l => l.status === filter);

    const getStatusColor = (status: Lead['status']) => {
        switch (status) {
            case 'new': return 'bg-blue-100 text-blue-700';
            case 'contacted': return 'bg-amber-100 text-amber-700';
            case 'converted': return 'bg-green-100 text-green-700';
            case 'lost': return 'bg-red-100 text-red-700';
        }
    };

    const getTypeIcon = (type: Lead['type']) => {
        switch (type) {
            case 'sample': return '📦';
            case 'bulk': return '🏗️';
            case 'inquiry': return '💬';
        }
    };

    const handleWhatsApp = (phone: string, productName: string) => {
        const message = encodeURIComponent(`Hi! Thank you for your interest in ${productName} on StoneTrade. How can I help you?`);
        window.open(`https://wa.me/91${phone}?text=${message}`, '_blank');
    };

    const handleCall = (phone: string) => {
        window.open(`tel:+91${phone}`, '_blank');
    };

    return (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-stone-accent/10 overflow-hidden">
            {/* Header */}
            <div className="bg-stone-primary text-white p-6">
                <h2 className="text-xl font-black mb-2">Lead Management</h2>
                <p className="text-white/60 text-sm">Track and convert your inquiries</p>
            </div>

            {/* Filters */}
            <div className="p-4 border-b border-stone-accent/10 flex gap-2 overflow-x-auto">
                {['all', 'new', 'contacted', 'converted', 'lost'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${filter === f ? 'bg-stone-primary text-white' : 'bg-stone-light text-stone-secondary hover:bg-stone-accent/20'
                            }`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                        {f !== 'all' && <span className="ml-1 opacity-60">({leads.filter(l => l.status === f).length})</span>}
                    </button>
                ))}
            </div>

            {/* Lead List */}
            <div className="max-h-[500px] overflow-y-auto">
                {filteredLeads.length === 0 ? (
                    <div className="p-12 text-center text-stone-secondary">
                        <p className="text-lg font-bold mb-2">No leads yet</p>
                        <p className="text-sm">Inquiries will appear here when buyers contact you</p>
                    </div>
                ) : (
                    <div className="divide-y divide-stone-accent/10">
                        {filteredLeads.map(lead => (
                            <div key={lead.id} className="p-4 hover:bg-stone-light/30 transition-colors">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-lg">{getTypeIcon(lead.type)}</span>
                                            <p className="font-bold text-stone-primary">{lead.buyerName}</p>
                                            {lead.isPro && (
                                                <span className="text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">PRO</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-stone-secondary mb-2">{lead.productName}</p>
                                        <div className="flex items-center gap-3 text-xs text-stone-secondary">
                                            <span className="flex items-center gap-1">
                                                <ClockIcon className="h-3 w-3" />
                                                {new Date(lead.createdAt).toLocaleDateString()}
                                            </span>
                                            <span className={`px-2 py-0.5 rounded-full font-bold ${getStatusColor(lead.status)}`}>
                                                {lead.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleWhatsApp(lead.buyerPhone, lead.productName)}
                                            className="p-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
                                            title="WhatsApp"
                                        >
                                            <ChatIcon className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleCall(lead.buyerPhone)}
                                            className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
                                            title="Call"
                                        >
                                            <PhoneIcon className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Status Update Buttons */}
                                {lead.status !== 'converted' && lead.status !== 'lost' && (
                                    <div className="flex gap-2 mt-3">
                                        {lead.status === 'new' && (
                                            <button
                                                onClick={() => onUpdateStatus(lead.id, 'contacted')}
                                                className="text-xs px-3 py-1 bg-amber-100 text-amber-700 rounded-lg font-bold hover:bg-amber-200"
                                            >
                                                Mark Contacted
                                            </button>
                                        )}
                                        <button
                                            onClick={() => onUpdateStatus(lead.id, 'converted')}
                                            className="text-xs px-3 py-1 bg-green-100 text-green-700 rounded-lg font-bold hover:bg-green-200 flex items-center gap-1"
                                        >
                                            <CheckIcon className="h-3 w-3" /> Converted
                                        </button>
                                        <button
                                            onClick={() => onUpdateStatus(lead.id, 'lost')}
                                            className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded-lg font-bold hover:bg-red-200 flex items-center gap-1"
                                        >
                                            <XIcon className="h-3 w-3" /> Lost
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Stats Footer */}
            <div className="p-4 bg-stone-light/50 border-t border-stone-accent/10 grid grid-cols-4 gap-4 text-center">
                <div>
                    <p className="text-2xl font-black text-stone-primary">{leads.length}</p>
                    <p className="text-[10px] text-stone-secondary font-bold uppercase">Total</p>
                </div>
                <div>
                    <p className="text-2xl font-black text-blue-600">{leads.filter(l => l.status === 'new').length}</p>
                    <p className="text-[10px] text-stone-secondary font-bold uppercase">New</p>
                </div>
                <div>
                    <p className="text-2xl font-black text-green-600">{leads.filter(l => l.status === 'converted').length}</p>
                    <p className="text-[10px] text-stone-secondary font-bold uppercase">Converted</p>
                </div>
                <div>
                    <p className="text-2xl font-black text-amber-600">
                        {leads.length > 0 ? Math.round((leads.filter(l => l.status === 'converted').length / leads.length) * 100) : 0}%
                    </p>
                    <p className="text-[10px] text-stone-secondary font-bold uppercase">Rate</p>
                </div>
            </div>
        </div>
    );
};

export default LeadManager;
