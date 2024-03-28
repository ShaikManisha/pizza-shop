/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePizzaStage } from "../actions";

const PizzaCard = ({ order }) => {
  const dispatch = useDispatch();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimeLimitReached, setIsTimeLimitReached] = useState(false);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const timerId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000);
      setElapsedTime(elapsedTimeInSeconds);
    }, 1000);

    // Clear the interval if the order stage is "Order Picked"
    if (order.stage === "Order Picked") {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [startTime, order.stage]);

  useEffect(() => {
    const timeLimit = getTimeLimit(order.size);
    if (elapsedTime >= timeLimit && order.stage !== "Order Picked") {
      setIsTimeLimitReached(true);
    }
  }, [elapsedTime, order.size, order.stage]);

  const handleNextStage = () => {
    if (order.stage !== "Order Picked") {
      dispatch(updatePizzaStage(order.id, order.stage === "Order Ready"));
    }
  };

  const getTimeLimit = (size) => {
    switch (size) {
      case "Small":
        return 3 * 60; // 3 minutes for small pizza
      case "Medium":
        return 4 * 60; // 4 minutes for medium pizza
      case "Large":
        return 5 * 60; // 5 minutes for large pizza
      default:
        return 0;
    }
  };

  return (
    <div
      className={`card border border-gray-300 mb-5 p-4 rounded-xl flex flex-col justify-center items-center align-center gap-3${
        isTimeLimitReached && order.stage !== "Order Picked"
          ? " bg-red-300"
          : ""
      }`}>
      <p>Order {order.id}</p>
      <p>
        {Math.floor(elapsedTime / 60)} min {elapsedTime % 60} sec
      </p>
      <button
        onClick={handleNextStage}
        disabled={order.stage === "Order Picked"}
        className={`bg-white hover:bg-slate-300 text-black font-bold py-2 px-4 rounded border border-black ${
          order.stage === "Order Picked" ? "opacity-50 cursor-not-allowed" : ""
        }`}>
        {order.stage === "Order Picked" ? "Picked" : "Next"}
      </button>
    </div>
  );
};

export default PizzaCard;
