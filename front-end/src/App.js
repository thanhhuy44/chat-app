import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {publicRoutes.map((route) => {
            let Layout = route.layout;
            let Component = route.component;
            return (
              <Route
                path={route.path}
                element={
                  <Layout>
                    <Component />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
        <ToastContainer />
      </Router>
    </Provider>
  );
}

export default App;
