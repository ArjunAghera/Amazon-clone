import { groupBy } from "lodash";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const path = require("path");

export default async (req, res) => {
  const { items, email } = req.body;

  const groupedItems = Object.values(groupBy(items, "id"));

  const transformedItems = groupedItems.map((itemGroup) => ({
    description: itemGroup[0].description,
    quantity: itemGroup.length,
    price_data: {
      currency: "inr",
      unit_amount: itemGroup[0].price * 100 * 75,
      product_data: {
        name: itemGroup[0].title,
        images: [itemGroup[0].image],
      },
    },
  }));

  // Instead of sending an array of multiple similar values, just group them to save space in session
  const groupedImages = Object.values(
    groupBy(items.map((item) => path.basename(item.image)))
  ).map((group) => [group.length, group[0]]);
  /*
    This gives us an array like this (shorter for storing into the session):
    [
        [2, "image_A.jpg"], // means "2 products with that same image"
        [1, "image_B.jpg"], // ...
        [6, "image_C.jpg"], // ...
    ]
*/

  const url = process.env.HOST;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1J7h66SDRgIETPNYriCADm8T"],
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url:
      "https://amazon-clone-e3cv0atku-arjunaghera.vercel.app/checkout-success",
    cancel_url:
      "https://amazon-clone-e3cv0atku-arjunaghera.vercel.app/checkout-cancel",

    metadata: {
      email,
      images: JSON.stringify(groupedImages),
    },
  });

  res.status(200).json({ id: session.id });
};
