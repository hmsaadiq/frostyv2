import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Paper, Stepper, Step, StepLabel, Typography, Box, Grid, Button } from '@mui/material';
import theme from './theme/theme';
import CakeCustomization from './components/CakeCustomization';
import FillingAndToppings from './components/FillingAndToppings';
import CustomerDetails from './components/CustomerDetails';
import OrderSummary from './components/OrderSummary';
import PaymentPage from './components/PaymentPage';
import OrderConfirmation from './components/OrderConfirmation';
import { cakeSizes, cakeFlavors, cakeToppings } from './utils/cakeOptions';

const steps = ['Customize Your Cake', 'Fillings & Toppings', 'Your Details', 'Payment'];

export default function CakeOrderFormMailto() {
  const [activeStep, setActiveStep] = useState(0);
  const [shape, setShape] = useState('Circle');
  const [size, setSize] = useState('6 inches');
  const [layers, setLayers] = useState('1');
  const [flavor, setFlavor] = useState('Vanilla');
  const [filling, setFilling] = useState('');
  const [toppings, setToppings] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    calculateTotalPrice();
  }, [shape, size, layers, flavor, filling, toppings]);

  const calculateTotalPrice = () => {
    const sizeObj = cakeSizes.find(s => s.name === size);
    const basePrice = sizeObj ? sizeObj.prices[parseInt(layers) - 1] || sizeObj.prices[0] : 0;
    const flavorPrice = cakeFlavors.find(f => f.name === flavor)?.price || 0;
    const fillingPrice = (layers !== "1" && filling.includes("(+5,000)")) ? 5000 : 0;
    const toppingsPrice = toppings.reduce((sum, topping) => 
      sum + (cakeToppings.find(t => t.name === topping)?.price || 0), 0);
    
    setTotalPrice(basePrice + flavorPrice + fillingPrice + toppingsPrice);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePaymentComplete = () => {
    const orderData = {
      shape,
      size,
      layers,
      flavor,
      filling: layers !== "1" ? filling : null,
      toppings,
      totalPrice,
      customerName,
      customerPhone,
      customerEmail,
      customerNotes,
    };

    setOrderDetails(orderData);
    handleNext();

    // Send email with order details
    const subject = encodeURIComponent('New Cake Order');
    const body = encodeURIComponent(`
      New Cake Order:

      Cake Details:
      Shape: ${shape}
      Size: ${size}
      Layers: ${layers}
      Flavor: ${flavor}
      ${layers !== "1" ? `Filling: ${filling}` : ''}
      Toppings: ${toppings.join(", ") || "None"}

      Total Price: ₦${totalPrice.toLocaleString()}

      Customer Details:
      Name: ${customerName}
      Phone: ${customerPhone}
      Email: ${customerEmail}

      Special Instructions:
      ${customerNotes}

      Payment Status: Confirmed
    `);

    window.location.href = `mailto:orders@frostedcrusts.com?subject=${subject}&body=${body}`;
  };

  const handleNewOrder = () => {
    setActiveStep(0);
    setShape('Circle');
    setSize('6 inches');
    setLayers('1');
    setFlavor('Vanilla');
    setFilling('');
    setToppings([]);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setCustomerNotes('');
    setOrderDetails(null);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <CakeCustomization
            shape={shape}
            setShape={setShape}
            size={size}
            setSize={setSize}
            layers={layers}
            setLayers={setLayers}
            flavor={flavor}
            setFlavor={setFlavor}
          />
        );
      case 1:
        return (
          <FillingAndToppings
            layers={layers}
            filling={filling}
            setFilling={setFilling}
            toppings={toppings}
            setToppings={setToppings}
          />
        );
      case 2:
        return (
          <CustomerDetails
            customerName={customerName}
            setCustomerName={setCustomerName}
            customerPhone={customerPhone}
            setCustomerPhone={setCustomerPhone}
            customerEmail={customerEmail}
            setCustomerEmail={setCustomerEmail}
            customerNotes={customerNotes}
            setCustomerNotes={setCustomerNotes}
          />
        );
      case 3:
        return (
          <PaymentPage
            totalPrice={totalPrice}
            isBackend={false}
            onPaymentComplete={handlePaymentComplete}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
            Frosted Crusts Order Form
          </Typography>
          {activeStep === steps.length ? (
            <OrderConfirmation orderDetails={orderDetails} onNewOrder={handleNewOrder} />
          ) : (
            <>
              <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, overflowX: 'auto', flexWrap: 'nowrap' }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  {getStepContent(activeStep)}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mr: 1 }}>
                        Back
                      </Button>
                    )}
                    {activeStep < steps.length - 1 && (
                      <Button variant="contained" onClick={handleNext}>
                        Next
                      </Button>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <OrderSummary
                    shape={shape}
                    size={size}
                    layers={layers}
                    flavor={flavor}
                    filling={filling}
                    toppings={toppings}
                    totalPrice={totalPrice}
                  />
                </Grid>
              </Grid>
            </>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}