import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Grid, CircularProgress } from '@mui/material';

const PaymentPage = ({ totalPrice, isBackend, onPaymentComplete }) => {
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (isBackend) {
      try {
        // Simulating a Paystack API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock successful payment
        const mockTransactionId = 'PAYSTACK_' + Math.random().toString(36).substr(2, 9);
        onPaymentComplete(mockTransactionId);
        setPaymentStatus('Payment completed successfully!');
      } catch (error) {
        setPaymentStatus('Payment failed. Please try again.');
      }
    } else {
      // For mailto version, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      onPaymentComplete();
      setPaymentStatus('Payment confirmed successfully!');
    }
    setIsLoading(false);
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Payment Details
            </Typography>
          </Grid>
          
          {!isBackend && (
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" gutterBottom>
                  Please make a transfer to:
                </Typography>
                <Typography variant="body1">Account Number: 6173682815</Typography>
                <Typography variant="body1">Bank: Fidelity Bank</Typography>
                <Typography variant="body1">Account Name: Saadiq Hamza</Typography>
                <Typography variant="body1" sx={{ mt: 2, fontWeight: 'bold' }}>
                  Amount: ₦{totalPrice.toLocaleString()}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                After making the transfer, please click the 'Confirm Payment' button below.
              </Typography>
            </Grid>
          )}

          {isBackend && (
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                You will be redirected to Paystack to complete your payment of ₦{totalPrice.toLocaleString()}.
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSubmit} 
              disabled={isLoading}
              fullWidth
              sx={{ mt: { xs: 2, md: 3 } }}
            >
              {isLoading ? (
                <CircularProgress size={24} sx={{ color: 'common.white' }} />
              ) : (
                isBackend ? 'Proceed to Payment' : 'Confirm Payment'
              )}
            </Button>
            
            {paymentStatus && (
              <Typography 
                color={paymentStatus.includes('successfully') ? 'success.main' : 'error.main'} 
                sx={{ mt: 2, textAlign: 'center' }}
              >
                {paymentStatus}
              </Typography>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PaymentPage;