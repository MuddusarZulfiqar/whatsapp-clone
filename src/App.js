import Layout from "./components/Layout";
import Aside from "./components/Aside";
import Main from "./components/Main";
function App() {
  return (
    <div className="App">
      <Layout>
        <Aside />
        <Main />
      </Layout>
    </div>
  );
}

export default App;
