import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { product } from "types";

export default async function CreateStripSession(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://uvcom.vercel.app";

  //@ts-ignore
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2020-08-27",
  });

  const { product, size }: { product: product; size: string } = await req.body;
  const transformedItem = {
    price_data: {
      currency: "inr",
      product_data: {
        images: [product.productImagesCollection.items[0].url],
        name: product.title,
      },
      unit_amount: product.price * 100,
    },
    description: `Size : ${size}`,
    quantity: 1,
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [transformedItem],
    mode: "payment",
    success_url: redirectURL + "?status=success",
    cancel_url: redirectURL + "?status=cancel",
    metadata: {
      images: product.productImagesCollection.items[0].url,
    },
  });

  res.json({ id: session.id });
}
