import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';

const OrderSummary = ({ shape, size, layers, flavor, filling, toppings, totalPrice }) => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom color="primary">
          Order Summary
        </Typography>
        <Typography variant="body1">Shape: {shape}</Typography>
        <Typography variant="body1">Size: {size}</Typography>
        {size !== "4 inches (Bento)" && <Typography variant="body1">Layers: {layers}</Typography>}
        <Typography variant="body1">Flavor: {flavor}</Typography>
        {layers !== "1" && <Typography variant="body1">Filling: {filling || "None"}</Typography>}
        <Typography variant="body1">Toppings: {toppings.join(", ") || "None"}</Typography>
        <Typography variant="h6" sx={{ mt: 2 }} color="secondary">
          Total: ₦{totalPrice.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;