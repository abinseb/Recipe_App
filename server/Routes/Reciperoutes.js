const router = require('express').Router();
const Cuisine = require('../model/recipemodel');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  }
});

// Create Multer instance with the storage configuration
const upload = multer({ storage: storage });

router.post('/addcuisine', upload.single('image'), async (req, res) => {
  try {
    // Extract the form data and uploaded image file
    const { cuisineName, cuisineType, durationOfCooking, numberOfServings } = req.body;
    const image = req.file;

    // Create a new instance of the Cuisine model
    const newCuisine = new Cuisine({
      cuisineName,
      cuisineType,
      durationOfCooking,
      numberOfServings,
      image: image.filename // Save only the filename in the database
    });

    // Save the new cuisine to the database
    await newCuisine.save();

    res.json({ status: 'Data added' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/viewcuisine', async (req, res) => {
//   try {
//     var data = await Cuisine.find();
//     res.json(data);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });
router.get('/viewcuisine', async (req, res) => {
  try {
    var data = await Cuisine.find();
    // Append the complete image URL for each cuisine object
    const cuisinesWithImageUrl = data.map(cuisine => ({
      ...cuisine._doc,
      image: `http://localhost:3016/uploads/${cuisine.image}`
    }));
    res.json(cuisinesWithImageUrl);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/deletecuisine/:id', async (req, res) => {
  try {
    const cuisineId = req.params.id;
    const cuisine = await Cuisine.findById(cuisineId);

    if (!cuisine) {
      return res.status(404).json({ error: 'Cuisine not found' });
    }

    await Cuisine.findByIdAndDelete(cuisineId);

    fs.unlink(`uploads/${cuisine.image}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted image");
      }
    });

    res.json({ message: 'Cuisine deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/updatecuisine/:id', upload.single('image'), async (req, res) => {
  try {
    const cuisineId = req.params.id;
    const { cuisineName, cuisineType, durationOfCooking, numberOfServings } = req.body;
    const image = req.file;

    const updatedData = {
      cuisineName,
      cuisineType,
      durationOfCooking,
      numberOfServings,
      image: image ? image.filename : undefined, // Update the image only if a new image is provided
    };

    const updatedCuisine = await Cuisine.findByIdAndUpdate(cuisineId, updatedData, { new: true });

    if (!updatedCuisine) {
      return res.status(404).json({ error: 'Cuisine not found' });
    }

    res.json(updatedCuisine);
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
