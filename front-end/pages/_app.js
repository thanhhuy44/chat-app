import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { initSocket, getSocket } from "../utils/socket";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initSocket();

    return () => {
      const socket = getSocket();
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
