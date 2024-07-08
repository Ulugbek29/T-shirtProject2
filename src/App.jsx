import { useEffect } from "react";
import Router from "./router";
import useTelegram from "./hooks/useTelegram";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready()
    tg.expand();
    tg.enableClosingConfirmation();
  }, [tg]);


  return <Router />;
}

export default App;
