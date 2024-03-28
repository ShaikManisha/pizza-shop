import { useSelector, useDispatch } from "react-redux";
import { cancelPizzaOrder } from "../actions";

const MainSection = () => {
  const dispatch = useDispatch();
  const ordersInProgress = useSelector((state) =>
    state.orders.filter((order) => order.stage !== "Order Picked")
  );
  const totalDelivered = useSelector(
    (state) =>
      state.orders.filter((order) => order.stage === "Order Picked").length
  );

  const handleCancelOrder = (orderId) => {
    dispatch(cancelPizzaOrder(orderId));
  };

  const getTimeElapsed = (order) => {
    const startTime = new Date(order.startTime);
    const currentTime = new Date();
    const elapsedTime = Math.floor((currentTime - startTime) / 1000); // Time elapsed in seconds
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    return `${minutes} min ${seconds} sec`;
  };

  const sortedOrders = ordersInProgress.sort((a, b) => {
    const aDelay = a.stage === "Order Placed" ? getTimeElapsed(a) : 0;
    const bDelay = b.stage === "Order Placed" ? getTimeElapsed(b) : 0;
    return bDelay - aDelay;
  });

  return (
    <div className="flex flex-col justify-center items-center">
      <h3 className="text-lg font-bold mb-5 items-start">Main Section</h3>
      <table className="table-fixed  w-[80%] h-[70%]">
        <thead>
          <tr>
            <th className="border-2 px-4 py-2">S.No</th>
            <th className=" border-2 px-4 py-2">Order Id</th>
            <th className=" border-2 px-4 py-2">
              Stage Total time spent (time from order placed)
            </th>
            <th className="border-2 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {sortedOrders.map((order, index) => (
            <tr key={order.id}>
              <td className="border-2 px-4 py-2">{index + 1}</td>
              <td className="border-2 px-4 py-2">{order.id}</td>
              <td className="border-2 px-4 py-2">
                {order.stage} - {getTimeElapsed(order)}
              </td>

              <td className="border-2 px-4 py-2">
                <button
                  onClick={() => handleCancelOrder(order.id)}
                  disabled={order.stage === "Order Ready"}
                  className={`py-2 px-4 rounded ${
                    order.stage === "Order Ready"
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-700 text-white font-bold"
                  }`}>
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <td className="border-2 px-4 py-2 text-lg font-bold">
          Total Pizza Delivered Today:
        </td>
        <td className="border-2 px-4 py-2 text-lg font-bold text-center">
          {totalDelivered}
        </td>
        <td className="border-2 px-4 py-2"></td>
        <td className="border-2 px-4 py-2"></td>
      </table>
    </div>
  );
};

export default MainSection;
