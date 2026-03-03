import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

let _razorpay: InstanceType<typeof Razorpay> | null = null;

function getRazorpay() {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
        return null;
    }
    if (!_razorpay) {
        _razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    }
    return _razorpay;
}

export async function POST(request: Request) {
    try {
        const razorpay = getRazorpay();
        if (!razorpay) {
            return NextResponse.json(
                { error: 'Payment gateway not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.' },
                { status: 503 }
            );
        }

        const { amount, currency = 'INR', receipt, notes } = await request.json();

        if (!amount || amount <= 0) {
            return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
        }

        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100), // Razorpay expects paise
            currency,
            receipt: receipt || `order_${Date.now()}`,
            notes: notes || {},
        });

        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error('Razorpay order creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create payment order' },
            { status: 500 }
        );
    }
}
