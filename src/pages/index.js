import { getSession } from "next-auth/client";
import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductsFeed from "../components/ProductsFeed";

export default function Home({ products }) {
  return (
    <div className=" bg-gray-100 h-auto ">
      <Head>
        <title>Amazon clone</title>
      </Head>
      <Header />
      <div className=" max-w-full mx-auto relative z-10">
        <Banner />
        <ProductsFeed products={products} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      products,
      session,
    },
  };
}
