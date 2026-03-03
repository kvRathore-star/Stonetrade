import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = await request.json();

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return NextResponse.json({ error: 'Missing payment details' }, { status: 400 });
        }

        // Verify the signature
        const secret = process.env.RAZORPAY_KEY_SECRET || '';
        const generatedSignature = crypto
            .createHmac('sha256', secret)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
        }

        // TODO: Update order status in Supabase
        // await supabase.from('sample_orders')
        //   .update({
        //     payment_id: razorpay_payment_id,
        //     razorpay_order_id: razorpay_order_id,
        //     payment_status: 'paid',
        //     order_status: 'confirmed',
        //   })
        //   .eq('razorpay_order_id', razorpay_order_id);

        return NextResponse.json({
            success: true,
            paymentId: razorpay_payment_id,
            message: 'Payment verified successfully',
        });
    } catch (error) {
        console.error('Payment verification error:', error);
        return NextResponse.json(
            { error: 'Payment verification failed' },
            { status: 500 }
        );
    }
}
