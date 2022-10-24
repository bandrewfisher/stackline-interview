import React, { useState, useEffect } from "react";
import "./App.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import stacklineLogo from "./stackline_logo.svg";
import ProductCard from "./components/ProductCard";
import SalesTableCard from "./components/SalesTableCard";
import SalesChartCard from "./components/SalesChartCard";
import store from "./redux/store";
import { Provider } from "react-redux";
import { useAppSelector, useAppDispatch } from "./redux/hooks";
import { setSalesData } from "./redux/salesData/salesDataSlice";
import { Product } from "./types";
import LinearProgress from "@mui/material/LinearProgress";
import productData from "./stackline_frontend_assessment_data_2021";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const products = useAppSelector((state) => state.salesData.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async function () {
      try {
        const data: Product[] = await new Promise((resolve) =>
          setTimeout(() => resolve(productData), 500)
        );
        dispatch(setSalesData(data));
      } catch (error) {
        console.error("Error fetching product data", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            backgroundColor: "#01253f",
          }}
        >
          <img
            src={stacklineLogo}
            alt="Stackline Logo"
            style={{
              maxHeight: 25,
            }}
          />
        </Toolbar>
      </AppBar>
      {loading ? (
        <LinearProgress />
      ) : (
        <Grid container spacing={2} paddingX={2} paddingY={4}>
          <Grid item xs={12} md={4}>
            <ProductCard product={products[0]} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <SalesChartCard
                  retailSales={products[0].sales.map((sale) => ({
                    date: new Date(sale.weekEnding),
                    sales: sale.retailSales,
                  }))}
                  wholesaleSales={products[0].sales.map((sale) => ({
                    date: new Date(sale.weekEnding),
                    sales: sale.wholesaleSales + sale.retailSales,
                  }))}
                />
              </Grid>
              <Grid item>
                <SalesTableCard sales={products[0].sales} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;
