import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { getSession, useSession } from "next-auth/client";
import CheckoutProduct from "../components/CheckoutProduct";
import { groupBy } from "lodash";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const publicKey = process.env.stripe_public_key.toString();
const stripePromise = loadStripe(publicKey);

function checkout() {
  const [session] = useSession();
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);

  const groupedItems = Object.values(groupBy(items, "id"));

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session.user.email,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };

  return (
    <>
      <Header />
      <div className=" bg-gray-100">
        {/* left with items */}
        <p className=" sm:text-sm font-semibold mx-4 text-xs p-4">
          Pay faster for all your shopping needs using{" "}
          <span className=" text-red-700 font-bold">
            Amazon-clone's Payment gateway
          </span>
        </p>
        <div className=" max-w-6xl mx-auto">
          <div className=" mx-4 my-2 p-4 bg-white shadow-sm space-y-4">
            <p className=" text-2xl border-b pb-4">
              {items.length === 0 ? `Your Cart is Empty` : `Your Cart`}
            </p>
            {groupedItems.length !== 0 &&
              groupedItems.map((group, i) => (
                <CheckoutProduct
                  key={group[0].id}
                  id={group[0].id}
                  title={group[0].title}
                  category={group[0].category}
                  description={group[0].description}
                  image={group[0].image}
                  rates={group[0].rates}
                  hasPrime={group[0].hasPrime}
                  price={group[0].price}
                  quantity={group.length}
                />
              ))}
          </div>
          <div className=" bg-white mx-4 my-2 p-4 shadow-sm">
            <p className=" text-xl border-b pb-4">{`Subtotal (${
              items.length
            }): ${total * 75} INR`}</p>
            <button
              role="Link"
              onClick={createCheckoutSession}
              disabled={!session}
              className={
                session
                  ? `button2 w-full`
                  : `button-disabled w-full cursor-not-allowed`
              }
            >
              {`${session ? `Checkout` : `Sign-in to Checkout`}`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default checkout;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
