"use server";

import { stripe } from "@/lib/stripe";
import { formatAmountForStripe } from "@/lib/stripe-helpers";
import { headers } from "next/headers";

const CURRENCY = "bdt";

export const createCheckoutSession = async (data) => {
   const ui_mode = "hosted";
   const origin = (await headers()).get("origin");

   const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "auto",
      line_items: [
         {
            quantity: 1,
            price_data: {
               currency: CURRENCY,
               product_data: {
                  name: "JavaScript Masterclass",
               },
               unit_amount: formatAmountForStripe(1000, CURRENCY),
            },
         },
      ],
      ...(ui_mode === "hosted" && {
         success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=12445`,

         cancel_url: `${origin}/courses`,
      }),

      ui_mode,
   });

   return {
      client_secret: checkoutSession.client_secret,
      url: checkoutSession.url,
   };
};

export const createPaymentIntent = async (data) => {
   const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(1000, CURRENCY),
      automatic_payment_methods: {
         enabled: true,
      },
      currency: CURRENCY,
   });

   return {
      client_secret: paymentIntent.client_secret,
   };
};
