import { RecoilRoot } from "recoil";
import GlobalStyle from "./GlobalStyle";
import Router from "./shared/Router";

function App() {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Router />
    </RecoilRoot>
  );
}

export default App;
