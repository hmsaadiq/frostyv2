import React from 'react';
import { Typography, Card, CardContent, Button } from '@mui/material';

const OrderConfirmation = ({ orderDetails, onNewOrder }) => {
  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom color="primary">
          Order Confirmation
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you for your order! We have received your cake order and payment.
        </Typography>
        <Typography variant="body1" paragraph>
          Order Details:
        </Typography>
        <Typography variant="body1">Shape: {orderDetails.shape}</Typography>
        <Typography variant="body1">Size: {orderDetails.size}</Typography>
        {orderDetails.size !== "4 inches (Bento)" && (
          <Typography variant="body1">Layers: {orderDetails.layers}</Typography>
        )}
        <Typography variant="body1">Flavor: {orderDetails.flavor}</Typography>
        {orderDetails.layers !== "1" && (
          <Typography variant="body1">Filling: {orderDetails.filling || "None"}</Typography>
        )}
        <Typography variant="body1">Toppings: {orderDetails.toppings.join(", ") || "None"}</Typography>
        <Typography variant="body1" paragraph>
          Total Price: ₦{orderDetails.totalPrice.toLocaleString()}
        </Typography>
        <Typography variant="body1" paragraph>
          We will contact you shortly to confirm your order and provide further details.
        </Typography>
        <Button variant="contained" color="primary" onClick={onNewOrder}>
          Place Another Order
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderConfirmation;