import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { Product } from "../types";

export interface ProductCardProps {
  product: Product;
}
function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <CardContent>
        <Grid container alignItems="center" direction="column" spacing={2}>
          <Grid item>
            <img
              src={product.image}
              style={{
                maxWidth: "80%",
              }}
              alt="Product"
            />
          </Grid>
          <Grid item>
            <Typography variant="h5" fontWeight="bold">
              {product.title}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color="gray" textAlign="center">
              {product.subtitle}
            </Typography>
          </Grid>
          <Divider />
          <Grid item>
            <Grid container spacing={1}>
              {product.tags.map((tag) => (
                <Grid item key={tag}>
                  <Chip label={tag} variant="outlined" />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Divider />
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
