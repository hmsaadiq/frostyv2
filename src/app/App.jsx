import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Paper, Typography, Button, Box } from '@mui/material';
import theme from './theme/theme';
import CakeOrderFormBackend from './CakeOrderFormBackend';
import CakeOrderFormMailto from './CakeOrderFormMailto';

export default function App() {
  const [selectedVersion, setSelectedVersion] = useState(null);

  const handleVersionSelect = (version) => {
    setSelectedVersion(version);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" color="primary">
            Frosted Crusts Cake Order
          </Typography>
          {!selectedVersion ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
              <Button variant="contained" onClick={() => handleVersionSelect('backend')}>
                Use Backend Version
              </Button>
              <Button variant="contained" onClick={() => handleVersionSelect('mailto')}>
                Use Mailto Version
              </Button>
            </Box>
          ) : selectedVersion === 'backend' ? (
            <CakeOrderFormBackend />
          ) : (
            <CakeOrderFormMailto />
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}