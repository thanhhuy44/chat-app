import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routers";

function App() {
  return (
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
    </Router>
  );
}

export default App;
