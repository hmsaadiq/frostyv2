import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem } from '@mui/material';
import { cakeShapes, cakeSizes, cakeFlavors } from '../utils/cakeOptions';

const CakeCustomization = ({ shape, setShape, size, setSize, layers, setLayers, flavor, setFlavor }) => {
  return (
    <>
      <FormControl component="fieldset" fullWidth margin="normal">
        <FormLabel component="legend">Cake Shape</FormLabel>
        <RadioGroup row value={shape} onChange={(e) => setShape(e.target.value)}>
          {cakeShapes.map((s) => (
            <FormControlLabel key={s} value={s} control={<Radio />} label={s} />
          ))}
        </RadioGroup>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <FormLabel>Cake Size</FormLabel>
        <Select
          value={size}
          onChange={(e) => {
            setSize(e.target.value);
            if (e.target.value === "4 inches (Bento)") setLayers("1");
          }}
        >
          {cakeSizes.map((s) => (
            <MenuItem key={s.name} value={s.name}>{s.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {size !== "4 inches (Bento)" && (
        <FormControl fullWidth margin="normal">
          <FormLabel>Number of Layers</FormLabel>
          <Select value={layers} onChange={(e) => setLayers(e.target.value)}>
            <MenuItem value="1">1 Layer</MenuItem>
            <MenuItem value="2">2 Layers</MenuItem>
            <MenuItem value="3">3 Layers</MenuItem>
          </Select>
        </FormControl>
      )}

      <FormControl fullWidth margin="normal">
        <FormLabel>Cake Flavor</FormLabel>
        <Select value={flavor} onChange={(e) => setFlavor(e.target.value)}>
          {cakeFlavors.map((f) => (
            <MenuItem key={f.name} value={f.name}>
              {f.name} {f.price > 0 && `(+₦${f.price.toLocaleString()})`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default CakeCustomization;