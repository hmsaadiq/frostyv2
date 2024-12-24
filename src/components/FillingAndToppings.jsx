import React from 'react';
import { FormControl, FormLabel, Select, MenuItem, Checkbox, FormControlLabel } from '@mui/material';
import { cakeFillings, cakeToppings } from '../utils/cakeOptions';

const FillingAndToppings = ({ layers, filling, setFilling, toppings, setToppings }) => {
  return (
    <>
      {layers !== "1" && (
        <FormControl fullWidth margin="normal">
          <FormLabel>Filling</FormLabel>
          <Select value={filling} onChange={(e) => setFilling(e.target.value)}>
            <MenuItem value="">Select filling</MenuItem>
            {cakeFillings.map((f) => (
              <MenuItem key={f} value={f}>{f}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <FormControl component="fieldset" fullWidth margin="normal">
        <FormLabel component="legend">Toppings/Add-ons</FormLabel>
        {cakeToppings.map((topping) => (
          <FormControlLabel
            key={topping.name}
            control={
              <Checkbox
                checked={toppings.includes(topping.name)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setToppings([...toppings, topping.name]);
                  } else {
                    setToppings(toppings.filter(t => t !== topping.name));
                  }
                }}
              />
            }
            label={`${topping.name} ${topping.price > 0 ? `(+₦${topping.price.toLocaleString()})` : ''}`}
          />
        ))}
      </FormControl>
    </>
  );
};

export default FillingAndToppings;