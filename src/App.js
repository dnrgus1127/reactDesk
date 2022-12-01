import "./App.css";
import Sidebar from "./components/sidebar";
import styled from "styled-components";
import Gnb from "./components/Gnb";
import TimeTable from "./components/TimeTable";

const Grid = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(10, 1fr);
`;

const Layout1 = styled.div`
  grid-column: 1/3;
  grid-row: 1/11;
  z-index: 3;
`;

const Layout2 = styled.div`
  grid-column: 3/13;
  grid-row: 1/11;
`;
const Layout3 = styled.div`
  grid-column: 13/16;
  grid-row: 1/11;
  /* background-color: wheat; */
`;

function App() {
  return (
    <Grid className="App">
      <Layout1>
        <Sidebar></Sidebar>
      </Layout1>
      <Layout2>
        <Gnb></Gnb>
        <TimeTable></TimeTable>
      </Layout2>
      <Layout3 />
    </Grid>
  );
}

export default App;
