import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPizzaOrder } from "../actions";

const PizzaOrderForm = () => {
  const [order, setOrder] = useState({
    type: "",
    size: "",
    base: "",
  });
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    const { type, size, base } = order;
    if (type.trim() !== "" && size.trim() !== "" && base.trim() !== "") {
      if (orders?.length <= 9) {
        const newOrder = { ...order, stage: "Order Placed", timeSpent: 0 };
        dispatch(addPizzaOrder(newOrder));
        setOrder({ type: "", size: "", base: "" });
      } else {
        alert("Not taking any order for now");
      }
    } else {
      alert("Please select all options before placing the order.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-bold mb-4">Place Pizza Order</h2>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center mb-4 w-full">
            <label
              htmlFor="type"
              className="block mr-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Type:
            </label>
            <select
              id="type"
              name="type"
              value={order.type}
              onChange={handleChange}
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="">Select Type</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
          </div>
          <div className="flex items-center mb-4 w-full">
            <label
              htmlFor="size"
              className="block mr-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Size:
            </label>
            <select
              id="size"
              name="size"
              value={order.size}
              onChange={handleChange}
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="">Select Size</option>
              <option value="Large">Large</option>
              <option value="Medium">Medium</option>
              <option value="Small">Small</option>
            </select>
          </div>
          <div className="flex items-center mb-4 w-full">
            <label
              htmlFor="base"
              className="block mr-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Base:
            </label>
            <select
              id="base"
              name="base"
              value={order.base}
              onChange={handleChange}
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="">Select Base</option>
              <option value="Thin">Thin</option>
              <option value="Thick">Thick</option>
            </select>
          </div>
          <div className="w-full">
            <button
              type="submit"
              onClick={handleOrder}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaOrderForm;
