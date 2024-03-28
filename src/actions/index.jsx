import { v4 as uuidv4 } from "uuid";

export const addPizzaOrder = (order) => {
  const orderId = uuidv4(); // Generate UUID
  const formattedOrderId = (
    Array(3).join("0") + orderId.split("-").pop()
  ).slice(-3);

  return {
    type: "ADD_PIZZA_ORDER",
    payload: {
      ...order,
      id: formattedOrderId,
      stage: "Order Placed",
      timeSpent: "0 min",
      isDelayed: false,
      startTime: new Date(),
    },
  };
};
export const updatePizzaStage = (orderId, isPicked = false) => ({
  type: "UPDATE_PIZZA_STAGE",
  payload: {
    orderId,
    isPicked,
  },
});

export const cancelPizzaOrder = (orderId) => ({
  type: "CANCEL_PIZZA_ORDER",
  payload: orderId,
});

export const nextStage = (orderId) => ({
  type: "NEXT_STAGE",
  payload: { orderId },
});
