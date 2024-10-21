import { Provider } from "react-redux";
import "./App.css";
import HomeStepper from "./templates";
import { store } from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <HomeStepper />
      </Provider>
    </div>
  );
}

export default App;
