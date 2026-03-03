'use client';

import { useCallback, useState } from 'react';
import { useToast } from '@/lib/toast';

interface PaymentOptions {
    amount: number; // in rupees
    productName: string;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    onSuccess?: (paymentId: string) => void;
    onFailure?: (error: string) => void;
}

// Declare Razorpay on window
declare global {
    interface Window {
        Razorpay: new (options: Record<string, unknown>) => {
            open: () => void;
            on: (event: string, callback: () => void) => void;
        };
    }
}

export function useRazorpay() {
    const [isLoading, setIsLoading] = useState(false);
    const { showToast } = useToast();

    const loadRazorpayScript = useCallback((): Promise<boolean> => {
        return new Promise((resolve) => {
            if (typeof window !== 'undefined' && window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    }, []);

    const initiatePayment = useCallback(async (options: PaymentOptions) => {
        setIsLoading(true);

        try {
            // 1. Load Razorpay script
            const loaded = await loadRazorpayScript();
            if (!loaded) {
                showToast('Failed to load payment gateway', 'error');
                setIsLoading(false);
                return;
            }

            // 2. Create order on server
            const res = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: options.amount,
                    receipt: `sample_${Date.now()}`,
                    notes: { product: options.productName },
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                showToast(err.error || 'Failed to create order', 'error');
                setIsLoading(false);
                return;
            }

            const { orderId, key } = await res.json();

            // 3. Open Razorpay checkout
            const rzp = new window.Razorpay({
                key,
                amount: options.amount * 100,
                currency: 'INR',
                name: 'StoneTrade',
                description: `Sample: ${options.productName}`,
                order_id: orderId,
                prefill: {
                    name: options.buyerName,
                    email: options.buyerEmail,
                    contact: options.buyerPhone,
                },
                theme: {
                    color: '#2d2d2d',
                    backdrop_color: 'rgba(0,0,0,0.6)',
                },
                handler: async (response: {
                    razorpay_order_id: string;
                    razorpay_payment_id: string;
                    razorpay_signature: string;
                }) => {
                    // 4. Verify payment on server
                    const verifyRes = await fetch('/api/payment/verify', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(response),
                    });

                    if (verifyRes.ok) {
                        showToast('Payment successful! Your sample order is confirmed.', 'success');
                        options.onSuccess?.(response.razorpay_payment_id);
                    } else {
                        showToast('Payment verification failed. Contact support.', 'error');
                        options.onFailure?.('Verification failed');
                    }
                    setIsLoading(false);
                },
                modal: {
                    ondismiss: () => {
                        showToast('Payment cancelled', 'info');
                        setIsLoading(false);
                    },
                },
            });

            rzp.on('payment.failed', () => {
                showToast('Payment failed. Please try again.', 'error');
                options.onFailure?.('Payment failed');
                setIsLoading(false);
            });

            rzp.open();
        } catch (error) {
            console.error('Payment error:', error);
            showToast('Something went wrong. Please try again.', 'error');
            setIsLoading(false);
        }
    }, [loadRazorpayScript, showToast]);

    return { initiatePayment, isLoading };
}
