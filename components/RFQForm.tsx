'use client';

import React, { useState } from 'react';
import { useToast } from '@/lib/toast';

const STONE_TYPES = ['Marble', 'Granite', 'Sandstone', 'Limestone', 'Quartzite', 'Onyx', 'Travertine', 'Slate'];
const FINISHES = ['Polished', 'Honed', 'Brushed', 'Leather', 'Natural', 'Flamed'];
const USE_CASES = ['Flooring', 'Countertop', 'Wall Cladding', 'Exterior', 'Staircase', 'Temple / Monument', 'Landscape', 'Other'];
const URGENCY = [
    { value: 'flexible', label: 'Flexible (No Rush)' },
    { value: 'within_month', label: 'Within 1 Month' },
    { value: 'within_week', label: 'Within 1 Week' },
    { value: 'urgent', label: 'Urgent (ASAP)' },
];

interface RFQFormProps {
    onClose?: () => void;
    prefillStoneType?: string;
}

export default function RFQForm({ onClose, prefillStoneType }: RFQFormProps) {
    const { showToast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        stoneType: prefillStoneType || '',
        finish: '',
        colorPreference: '',
        thickness: '',
        sizeDimensions: '',
        quantity: '',
        quantityUnit: 'sq.ft',
        useCase: '',
        deliveryLocation: '',
        deliveryState: '',
        deliveryPincode: '',
        budgetMin: '',
        budgetMax: '',
        urgency: 'within_month',
        notes: '',
        buyerName: '',
        buyerEmail: '',
        buyerPhone: '',
        buyerCompany: '',
    });

    const updateField = (field: string, value: string) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // TODO: Once Supabase is connected, save to rfqs table
        // For now, simulate success
        await new Promise(r => setTimeout(r, 1000));

        showToast('RFQ submitted! You\'ll receive quotes from verified sellers within 24 hours.', 'success');
        setIsSubmitting(false);
        onClose?.();
    };

    const INDIAN_STATES = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
        'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
        'Delhi', 'Chandigarh', 'Puducherry', 'Jammu & Kashmir', 'Ladakh',
    ];

    return (
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl mx-auto overflow-hidden">
            {/* Header */}
            <div className="bg-stone-primary text-white p-6 lg:p-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-black">Get Bulk Quotes</h2>
                        <p className="text-stone-light/60 text-sm mt-1">Tell us what you need — sellers will compete for your order</p>
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="text-white/60 hover:text-white text-2xl" aria-label="Close">✕</button>
                    )}
                </div>
                {/* Step indicator */}
                <div className="flex gap-2 mt-6">
                    {[1, 2, 3].map(s => (
                        <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? 'bg-stone-accent' : 'bg-white/10'}`} />
                    ))}
                </div>
                <p className="text-xs text-stone-light/40 mt-2">Step {step} of 3</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-5">
                {/* Step 1: Stone Requirements */}
                {step === 1 && (
                    <>
                        <div>
                            <label className="block text-sm font-bold text-stone-primary mb-2">Stone Type *</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {STONE_TYPES.map(type => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => updateField('stoneType', type)}
                                        className={`py-2.5 px-3 rounded-xl text-sm font-bold transition-all border ${form.stoneType === type
                                                ? 'bg-stone-primary text-white border-stone-primary'
                                                : 'bg-stone-light/50 text-stone-secondary border-transparent hover:border-stone-accent/30'
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-stone-primary mb-2">Finish</label>
                                <select
                                    value={form.finish}
                                    onChange={e => updateField('finish', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-stone-accent/20 bg-stone-light/30 text-sm focus:ring-2 focus:ring-stone-accent/50 focus:border-stone-accent"
                                >
                                    <option value="">Any finish</option>
                                    {FINISHES.map(f => <option key={f} value={f}>{f}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-stone-primary mb-2">Use Case</label>
                                <select
                                    value={form.useCase}
                                    onChange={e => updateField('useCase', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-stone-accent/20 bg-stone-light/30 text-sm focus:ring-2 focus:ring-stone-accent/50 focus:border-stone-accent"
                                >
                                    <option value="">Select use case</option>
                                    {USE_CASES.map(u => <option key={u} value={u}>{u}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-stone-primary mb-2">Color</label>
                                <input
                                    type="text"
                                    placeholder="e.g. White, Beige"
                                    value={form.colorPreference}
                                    onChange={e => updateField('colorPreference', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-stone-accent/20 bg-stone-light/30 text-sm focus:ring-2 focus:ring-stone-accent/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-stone-primary mb-2">Thickness</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 16mm, 20mm"
                                    value={form.thickness}
                                    onChange={e => updateField('thickness', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-stone-accent/20 bg-stone-light/30 text-sm focus:ring-2 focus:ring-stone-accent/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-stone-primary mb-2">Size</label>
                                <input
                                    type="text"
                                    placeholder="e.g. 2x2 ft"
                                    value={form.sizeDimensions}
                                    onChange={e => updateField('sizeDimensions', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-stone-accent/20 bg-stone-light/30 text-sm focus:ring-2 focus:ring-stone-accent/50"
                                />
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={() => form.stoneType ? setStep(2) : showToast('Please select a stone type', 'warning')}
                            className="w-full bg-stone-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-stone-secondary transition-colors"
                        >
                            Next: Quantity & Budget →
                        </button>
                    </>
                )}

                {/* Step 2: Quantity & Delivery */}
                {step === 2 && (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-stone-primary mb-2">Quantity *</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 500"
                                    value={form.quantity}
                                    onChange={e => updateField('quantity', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-stone-accent/20 bg-stone-light/30 text-sm focus:ring-2 focus:ring-stone-accent/50"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-stone-primary mb-2">Unit</label>
                                <select
                                    value={form.quantityUnit}
                                    onChange={e => updateField('quantityUnit', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-stone-accent/20 bg-stone-light/30 text-sm focus:ring-2 focus:ring-stone-accent/50"
                                >
                                    <option value="sq.ft">Square Feet</option>
                                    <option value="pieces">Pieces</option>
                                    <option value="tons">Metric Tons</option>
                                    <option value="containers">Containers</option>
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-stone-primary mb-2">Budget Min (₹)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 50000"
                                    value={form.budgetMin}
                                    onChange={e => updateField('budgetMin', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-stone-accent/20 bg-stone-light/30 text-sm focus:ring-2 focus:ring-stone-accent/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-stone-primary mb-2">Budget Max (₹)</label>
                                <input
                                    type="number"
                                    placeholder="e.g. 200000"
                                    value={form.budgetMax}
                                    onChange={e => updateField('budgetMax', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-stone-accent/20 bg-stone-light/30 text-sm focus:ring-2 focus:ring-stone-accent/50"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-primary mb-2">Delivery State *</label>
                            <select
                                value={form.deliveryState}
                                onChange={e => updateField('deliveryState', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-stone-accent/20 bg-stone-light/30 text-sm focus:ring-2 focus:ring-stone-accent/50"
                                required
                            >
                                <option value="">Select state</option>
                                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-primary mb-2">City / Area *</label>
                            <input
                                type="text"
                                placeholder="e.g. Andheri, Mumbai"
                                value={form.deliveryLocation}
                                onChange={e => updateField('deliveryLocation', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-stone-accent/20 bg-stone-light/30 text-sm focus:ring-2 focus:ring-stone-accent/50"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-primary mb-2">Timeline</label>
                            <div className="grid grid-cols-2 gap-2">
                                {URGENCY.map(u => (
                                    <button
                                        key={u.value}
                                        type="button"
                                        onClick={() => updateField('urgency', u.value)}
                                        className={`py-2.5 px-3 rounded-xl text-sm font-bold border transition-all ${form.urgency === u.value
                                                ? 'bg-stone-primary text-white border-stone-primary'
                                                : 'bg-stone-light/50 text-stone-secondary border-transparent hover:border-stone-accent/30'
                                            }`}
                                    >
                                        {u.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button type="button" onClick={() => setStep(1)} className="flex-1 bg-stone-light text-stone-primary py-4 rounded-2xl font-bold hover:bg-stone-accent/20 transition-colors">
                                ← Back
                            </button>
                            <button
                                type="button"
                                onClick={() => form.quantity && form.deliveryState ? setStep(3) : showToast('Fill quantity and delivery state', 'warning')}
                                className="flex-1 bg-stone-primary text-white py-4 rounded-2xl font-bold hover:bg-stone-secondary transition-colors"
                            >
                                Next: Your Details →
                            </button>
                        </div>
                    </>
                )}

                {/* Step 3: Contact Details */}
                {step === 3 && (
                    <>
                        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-sm text-emerald-800">
                            <strong>🔒 Your details are shared only with sellers who quote.</strong> We never share your phone number publicly.
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-stone-primary mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    placeholder="Your full name"
                                    value={form.buyerName}
                                    onChange={e => updateField('buyerName', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-stone-accent/20 bg-stone-light/30 text-sm focus:ring-2 focus:ring-stone-accent/50"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-stone-primary mb-2">Company (Optional)</label>
                                <input
                                    type="text"
                                    placeholder="Your company"
                                    value={form.buyerCompany}
                                    onChange={e => updateField('buyerCompany', e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-stone-accent/20 bg-stone-light/30 text-sm focus:ring-2 focus:ring-stone-accent/50"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-primary mb-2">Phone (WhatsApp) *</label>
                            <input
                                type="tel"
                                placeholder="+91 98765 43210"
                                value={form.buyerPhone}
                                onChange={e => updateField('buyerPhone', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-stone-accent/20 bg-stone-light/30 text-sm focus:ring-2 focus:ring-stone-accent/50"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-primary mb-2">Email *</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                value={form.buyerEmail}
                                onChange={e => updateField('buyerEmail', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-stone-accent/20 bg-stone-light/30 text-sm focus:ring-2 focus:ring-stone-accent/50"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-primary mb-2">Additional Notes</label>
                            <textarea
                                placeholder="Any specific requirements, preferred origins, reference images, etc."
                                value={form.notes}
                                onChange={e => updateField('notes', e.target.value)}
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-stone-accent/20 bg-stone-light/30 text-sm focus:ring-2 focus:ring-stone-accent/50 resize-none"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button type="button" onClick={() => setStep(2)} className="flex-1 bg-stone-light text-stone-primary py-4 rounded-2xl font-bold hover:bg-stone-accent/20 transition-colors">
                                ← Back
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit RFQ →'}
                            </button>
                        </div>
                        <p className="text-center text-xs text-stone-secondary">
                            ✓ Free to post &nbsp;•&nbsp; ✓ Get quotes in 24 hrs &nbsp;•&nbsp; ✓ No obligation
                        </p>
                    </>
                )}
            </form>
        </div>
    );
}
