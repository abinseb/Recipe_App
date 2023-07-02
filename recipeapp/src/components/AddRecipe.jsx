import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    cuisineName: '',
    cuisineType: '',
    durationOfCooking: '',
    numberOfServings: '',
    image: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObject = new FormData();
    formDataObject.append('cuisineName', formData.cuisineName);
    formDataObject.append('cuisineType', formData.cuisineType);
    formDataObject.append('durationOfCooking', formData.durationOfCooking);
    formDataObject.append('numberOfServings', formData.numberOfServings);
    formDataObject.append('image', formData.image);

    console.log('Clicked');
    axios
      .post('http://localhost:3016/addcuisine', formDataObject)
      .then(() => {
        alert('Cuisine added Successfully');
        setFormData({
          cuisineName: '',
          cuisineType: '',
          durationOfCooking: '',
          numberOfServings: '',
          image: null
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '5px' }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        maxWidth={700}
        alignSelf="center"
        marginLeft="auto"
        marginRight="auto"
        marginTop={8}
        paddingBottom="150px"
      >
        <Typography variant="h3">Add Cuisine</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              margin="normal"
              fullWidth
              variant="outlined"
              name="cuisineName"
              value={formData.cuisineName}
              label="Cuisine Name"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Cuisine Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Cuisine Type"
                name="cuisineType"
                value={formData.cuisineType}
                onChange={handleChange}
              >
                <MenuItem value="American">American</MenuItem>
                <MenuItem value="Indian">Indian</MenuItem>
                <MenuItem value="Italian">Italian</MenuItem>
                <MenuItem value="Chinese">Chinese</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              margin="normal"
              fullWidth
              variant="outlined"
              name="durationOfCooking"
              value={formData.durationOfCooking}
              label="Duration of Cooking in Minutes"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              margin="normal"
              fullWidth
              variant="outlined"
              name="numberOfServings"
              value={formData.numberOfServings}
              label="Number of Servings"
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              margin="normal"
              fullWidth
              name="image"
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handlePhotoChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default AddRecipe;
