const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

export const submitOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to submit order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
};

export const getOrderStatus = async (orderId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}/status`);

    if (!response.ok) {
      throw new Error('Failed to get order status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting order status:', error);
    throw error;
  }
};