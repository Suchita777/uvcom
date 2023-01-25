import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { product } from "types";

const publishable_key = process.env.NEXT_PUBLIC_PUBLISHABLE_KEY;

//@ts-ignore
export const stripePromise = loadStripe(publishable_key);

export async function createCheckoutSession(product: product, size: string) {
  const stripe = await stripePromise;
  const checkoutSession = await axios.post("/api/create-stripe-session", {
    product: product,
    size: size,
  });
  //@ts-expect-error
  const result = await stripe.redirectToCheckout({
    sessionId: checkoutSession.data.id,
  });
  if (result.error) {
    alert(result.error.message);
  }
}
