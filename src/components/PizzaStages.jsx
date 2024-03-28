import { useSelector } from "react-redux";
import PizzaCard from "./PizzaCard";

const PizzaStages = () => {
  const orders = useSelector((state) => state.orders);
  const stages = useSelector((state) => state.stages);

  return (
    <div className="mb-10">
      <div className="my-10 flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold mb-10">Pizza Stage Section</h2>
        <div
          className="overflow-auto border border-gray-300 w-[80%] max-h-[400px]"
          style={{ scrollbarWidth: "thin" }}>
          <table className="w-full">
            <thead className="sticky top-0 bg-blue-200">
              {stages.map((stage) => (
                <th
                  key={stage}
                  className="border border-gray-300 p-2 w-40 text-center">
                  {stage}
                </th>
              ))}
            </thead>
            <tbody>
              <tr>
                {stages.map((stage) => (
                  <td
                    key={stage}
                    className="border border-gray-300 p-6 w-40 align-top">
                    <div>
                      {orders
                        .filter((order) => order.stage === stage)
                        .map((order) => (
                          <PizzaCard key={order.id} order={order} />
                        ))}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PizzaStages;
