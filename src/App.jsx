import { Provider } from "react-redux";
import store from "./store";
import PizzaOrderForm from "./components/PizzaOrderForm";
import PizzaStages from "./components/PizzaStages";
import MainSection from "./components/MainSection";

function App() {
  return (
    <Provider store={store}>
      <div className="container mx-auto p-8">
        <h3 className="text-2xl font-bold text-center">Pizza Shop</h3>
        <PizzaOrderForm />
        <div className="flex-container">
          <PizzaStages />
          <MainSection />
        </div>
      </div>
    </Provider>
  );
}

export default App;
