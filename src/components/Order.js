import { groupBy, isString } from "lodash";
import path from "path";
import moment from "moment";

function Order({ id, amount, amountShipping, images, timestamp, items }) {
  let groupedImages;

  if (images.every((image) => !image.startsWith("["))) {
    groupedImages = Object.values(
      groupBy(images.map((image) => path.basename(image)))
    ).map((group) => [group.length, group[0]]);
  } else {
    groupedImages = [...images.map((image) => JSON.parse(image))];
  }

  return (
    <div className="relative border rounded-md">
      <div className="block sm:flex items-center sm:space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div className="mb-3 sm:mb-0">
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format("MM/DD/YYYY")}</p>
        </div>

        <div>
          <p className="text-xs font-bold">
            TOTAL:{" "}
            <p className=" font-bold -mt-4 ml-4 sm:ml-12">
              <span>&#8377;</span>
              {amount * 75}
            </p>
          </p>
        </div>

        <p className="absolute top-3 right-3 sm:static text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {items.reduce((total, item) => total + item.quantity, 0)} items
        </p>

        <p className="w-100 sm:absolute top-3 right-2 sm:w-72 truncate text-xs whitespace-nowrap">
          ORDER #{id}
        </p>
      </div>

      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {groupedImages.map((group) => (
            <div className="relative" key={group[1]}>
              <img
                src={`https://fakestoreapi.com/img/${group[1]}`}
                alt=""
                className="h-20 object-contain sm:h-32"
              />
              {group[0] > 1 && (
                <div className="absolute bottom-2 right-2 p-1 rounded shadow font-bold bg-yellow-400 text-black text-2xl text-center">
                  &times; {group[0]}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
