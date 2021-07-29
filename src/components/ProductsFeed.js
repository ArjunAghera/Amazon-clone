import React from "react";
import Product from "./Product";

function ProductsFeed({ products }) {
  return (
    <div className=" grid grid-flow-row-dense grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-72 mx-auto">
      {products
        .slice(0, 4)
        .map(({ id, title, price, category, description, image }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            category={category}
            description={description}
            image={image}
          />
        ))}
      <img
        src="/ad1.jpg"
        alt=""
        className=" col-span-full mx-auto px-6 my-auto"
      />
      <div className=" col-span-2">
        {products
          .slice(4, 5)
          .map(({ id, title, price, category, description, image }) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              category={category}
              description={description}
              image={image}
            />
          ))}
      </div>
      <div className=" col-span-1">
        {products
          .slice(5, 6)
          .map(({ id, title, price, category, description, image }) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              category={category}
              description={description}
              image={image}
            />
          ))}
      </div>
      <img
        src="/ad2.jpg"
        alt=""
        className=" col-span-2 items-center mx-auto px-6 my-auto"
      />
      {products
        .slice(5, products.length)
        .map(({ id, title, price, category, description, image }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            category={category}
            description={description}
            image={image}
          />
        ))}
    </div>
  );
}

export default ProductsFeed;
