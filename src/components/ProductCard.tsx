import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
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
          <Grid item>{product.title}</Grid>
          <Grid item>{product.subtitle}</Grid>
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
