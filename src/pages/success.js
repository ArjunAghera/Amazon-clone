import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Header from "../components/Header";

function success() {
  const router = useRouter();
  return (
    <div className=" h-screen bg-gray-100">
      <Header />
      <div className=" mt-8 max-w-screen-md mx-auto bg-white p-5 shadow-sm">
        <div className=" flex mb-5 items-center space-x-4 ">
          <CheckCircleIcon className=" text-green-600 h-10" />
          <h1 className=" text-2xl sm:text-3xl font-medium">
            Thanks, your order is confirmed!
          </h1>
        </div>
        <p className=" text-sm sm:text-base mb-5">
          Your order has been confirmed. You will receive a confirmation mail
          after the order has been shipped.To see your recent order(s) click the
          button below.
        </p>
        <button
          onClick={() => router.push("/orders")}
          className=" button w-full"
        >
          Recent Orders
        </button>
      </div>
    </div>
  );
}

export default success;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
