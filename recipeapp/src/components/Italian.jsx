import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
const Italian = () => {
    const [italian,setItalian] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    cuisineName: '',
    cuisineType: '',
    durationOfCooking: '',
    numberOfServings: '',
    image: null
  });

    useEffect(()=>{
        axios.get("http://localhost:3016/viewcuisine")
        .then((res)=>{
            console.log(res.data);
            const italianCuisineData = res.data.filter((item)=>item.cuisineType == 'Italian');
            setItalian(italianCuisineData);


        })
        .catch(err=>console.log(err))
    },[])

    const handleDelete = (id, imageName) => {
      const confirmation = window.confirm("Are you sure you want to delete this cuisine?");
      if (!confirmation) {
        return;
      }
  
      axios
        .delete(`http://localhost:3016/deletecuisine/${id}`)
        .then(() => {
          setItalian((prevData) => prevData.filter((item) => item._id !== id));
          removeImage(imageName);
          setTimeout(() => {
            alert("Cuisine Deleted Successfully");
            window.location.reload(false)
          }, 100); // Add a slight delay (e.g., 100 milliseconds) before showing the alert
        })
        .catch((err) => console.log(err));
    };
  
    const removeImage = (imageName) => {
      const updatedData = [...italian];
      const index = updatedData.findIndex((item) => item.image === imageName);
      if (index !== -1) {
        updatedData[index].image = '';
        setItalian(updatedData);
      }
    };

    const handleUpdate = (data) => {
      setFormData({
        id: data._id,
        cuisineName: data.cuisineName,
        cuisineType: data.cuisineType,
        durationOfCooking: data.durationOfCooking,
        numberOfServings: data.numberOfServings,
        image: null
      });
      setOpenDialog(true);
    };
  
    const handleChange = (event) => {
      setFormData((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.value
      }));
    };
  
    const handlePhotoChange = (event) => {
      setFormData((prevData) => ({
        ...prevData,
        image: event.target.files[0]
      }));
    };
  
    const handleDialogClose = () => {
      setOpenDialog(false);
    };
  
    const handleUpdateSubmit = () => {
      const { id, cuisineName, cuisineType, durationOfCooking, numberOfServings, image } = formData;
      const updatedData = new FormData();
      updatedData.append('cuisineName', cuisineName);
      updatedData.append('cuisineType', cuisineType);
      updatedData.append('durationOfCooking', durationOfCooking);
      updatedData.append('numberOfServings', numberOfServings);
      updatedData.append('image', image);
  
      axios
        .put(`http://localhost:3016/updatecuisine/${id}`, updatedData)
        .then((res) => {
          console.log(res.data);
          // Update the updated cuisine in the fdata state
          setItalian((prevData) =>
            prevData.map((item) => (item._id === res.data._id ? res.data : item))
          );
          setOpenDialog(false);
          setTimeout(() => {
            alert("Cuisine Updated Successfully");
            window.location.reload(false)
          }, 100); // Add a slight delay (e.g., 100 milliseconds) before showing the alert
        })
        .catch((err) => console.log(err));
    };

  return (
    <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px', paddingBottom: '60px', paddingTop: '30px' }}>
        {italian.map((val, i) => (
          <Card key={i}>
            <CardMedia>
              <img style={{ height: '350px', width: '300px' }} src={val.image} alt="cuisine image" />
            </CardMedia>
            <CardContent>
              <Typography variant='h5' component="div">
                {val.cuisineName}
              </Typography>
            </CardContent>
            <CardContent><Typography variant='h6'>{val.cuisineType}</Typography></CardContent>
            <CardContent style={{ paddingTop: '3px' }}>Duration of cooking: {val.durationOfCooking} Minutes</CardContent>
            <CardContent>No of Servings: {val.numberOfServings}</CardContent>
            <CardContent>
            <Button variant='contained' onClick={() => handleUpdate(val)}>Update</Button>
            <Button variant='contained' color='error' onClick={() => handleDelete(val._id, val.image)}>Delete</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit the Cuisine</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            fullWidth
            variant="outlined"
            name="cuisineName"
            value={formData.cuisineName}
            label="Cuisine Name"
            onChange={handleChange}
          />

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
          <TextField
            margin="normal"
            fullWidth
            variant="outlined"
            name="durationOfCooking"
            value={formData.durationOfCooking}
            label="Duration of Cooking"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            variant="outlined"
            name="numberOfServings"
            value={formData.numberOfServings}
            label="Number of Servings"
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            name="image"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handlePhotoChange}
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button variant="contained" onClick={handleUpdateSubmit}>Update</Button>
          
        </DialogActions>
        
      </Dialog>
    </>
  )
}

export default Italian
