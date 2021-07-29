import Image from "next/image";
import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, category, description, image }) {
  const [rates] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );

  const dispatch = useDispatch();

  const addItemToCart = () => {
    const product = {
      id,
      title,
      price,
      category,
      description,
      image,
      hasPrime,
      rates,
    };

    dispatch(addToBasket(product));
  };

  const [hasPrime] = useState(Math.random() < 0.5);
  return (
    <div className="relative flex flex-col bg-white m-5 p-10 z-30">
      <p className=" absolute text-gray-400 right-3 top-2">{category}</p>
      <Image
        src={image}
        width={200}
        height={200}
        objectFit="contain"
        className="link"
      />
      <h4 className=" my-4 link">{title}</h4>
      <div className="flex">
        {Array(rates)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-6 text-yellow-300 " />
          ))}
      </div>
      <p>
        <span>&#8377;</span>
        {price * 75}
      </p>
      {hasPrime && (
        <div className="flex items-center">
          <img src="/primelogo.png" alt="" className="h-6" />
          <p className=" text-xs font-semibold">Free Delivery</p>
        </div>
      )}
      <button onClick={addItemToCart} className=" button">
        Add to Cart
      </button>
      <button className=" button2">Buy Now!</button>
    </div>
  );
}

export default Product;
