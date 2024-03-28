const initialState = {
  orders: [],
  stages: ["Order Placed", "Order in Making", "Order Ready", "Order Picked"],
};

const nextStageMap = {
  "Order Placed": "Order in Making",
  "Order in Making": "Order Ready",
  "Order Ready": "Order Picked",
};

const PizzaShopReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PIZZA_ORDER":
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case "UPDATE_PIZZA_STAGE":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId
            ? {
                ...order,
                stage: action.payload.isPicked
                  ? "Order Picked"
                  : nextStageMap[order.stage],
                // Calculate time spent from order placed onwards
                timeSpent:
                  Math.floor((new Date() - order.startTime) / 60000) + " min",
              }
            : order
        ),
      };
    case "CANCEL_PIZZA_ORDER":
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };
    case "PLACE_ORDER":
      return {
        ...state,
        orders: [
          ...state.orders,
          {
            ...action.payload,
            stage: "Order Placed",
            timeSpent: "0 min",
            startTime: new Date(),
          },
        ],
      };
    case "NEXT_STAGE":
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId
            ? {
                ...order,
                stage: nextStage(order.stage),
                timeSpent: "0 min",
                startTime: new Date(),
              }
            : order
        ),
      };
    default:
      return state;
  }
};

const nextStage = (currentStage) => {
  // Define the logic to determine the next stage based on the current stage
  switch (currentStage) {
    case "Order Placed":
      return "Order in Making";
    case "Order in Making":
      return "Order Ready";
    case "Order Ready":
      return "Order Picked";
    default:
      return currentStage;
  }
};

export default PizzaShopReducer;
