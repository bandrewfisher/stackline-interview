import React from "react";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import stacklineLogo from "./stackline_logo.svg";
import productData from "./stackline_frontend_assessment_data_2021";
import ProductCard from "./components/ProductCard";
import SalesTableCard from "./components/SalesTableCard";

function App() {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <img
            src={stacklineLogo}
            alt="Stackline Logo"
            style={{
              maxHeight: 25,
            }}
          />
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} paddingX={2} paddingTop={4}>
        <Grid item xs={4}>
          <ProductCard product={productData[0]} />
        </Grid>
        <Grid item xs={8}>
          <SalesTableCard sales={productData[0].sales} />
        </Grid>
      </Grid>
    </Box>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
