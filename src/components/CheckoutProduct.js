import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import {
  addToBasket,
  removeFromBasket,
  removeItemGroup,
} from "../slices/basketSlice";
import { useDispatch } from "react-redux";

function CheckoutProduct({
  id,
  title,
  price,
  category,
  description,
  image,
  hasPrime,
  rates,
  quantity,
}) {
  const dispatch = useDispatch();
  const addItemToCart = () => {
    const product = {
      id,
      price,
      category,
      description,
      image,
      hasPrime,
      title,
      rates,
    };

    dispatch(addToBasket(product));
  };

  const removeItemFromCart = () => {
    dispatch(removeFromBasket({ id }));
  };

  const removeGroup = () => {
    dispatch(removeItemGroup({ id }));
  };

  return (
    <div className=" text-xs sm:text-base grid grid-col-6 grid-flow-col space-x-4 space-y-4">
      <Image
        src={image}
        width={400}
        height={400}
        objectFit="contain"
        className="grid-col-2"
      />
      <div className="grid-col-3">
        <div className=" text-amazon_blue-light sm:font-medium flex">
          <p>{title}</p>
          <p className=" font-bold ml-4 sm:ml-12">
            <span>&#8377;</span>
            {price * 75}
          </p>
        </div>
        <div className=" hidden sm:inline">
          <p className=" line-clamp-3">{description}</p>
        </div>
        <div className="flex">
          {Array(rates)
            .fill()
            .map((_, i) => (
              <StarIcon className="h-6 text-yellow-300 " />
            ))}
          {hasPrime && (
            <div className="flex items-center">
              <img src="/primelogo.png" alt="" className="h-6" />
              <p className=" text-xs font-semibold">Free Delivery</p>
            </div>
          )}
        </div>
      </div>
      <div className="grid-col-1 pl-2 sm:px-8 ">
        <div className=" flex items-center space-x-4">
          <span className="button-sm" onClick={removeItemFromCart}>
            -
          </span>{" "}
          <p className=" font-medium text-amazon_blue-light">
            Quantity {quantity}
          </p>{" "}
          <span className=" button-sm" onClick={addItemToCart}>
            +
          </span>
        </div>
        <button className="button2" onClick={removeGroup}>
          Remove Item
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
