import Stripe from "stripe";
import { PaymentParams } from "../types/paymentTypes";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
});

export async function createPaymentSession(lineItem: PaymentParams, eventId: number) {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: 'payment',
        line_items: [{
            price_data: {
                currency: 'brl',
                product_data: {
                    name: `${lineItem.name} ticket`
                },
                unit_amount: lineItem.price
            },
            quantity: lineItem.qty,
        }
    ],
        success_url: `${process.env.APP_URL}/order/success?session_id={CHECKOUT_SESSION_ID}&qty=${lineItem.qty}&event_id=${eventId}&user_id=${lineItem.userId}`,
        cancel_url: `${process.env.APP_URL}/cancel`,
    });

    return session.url;
}