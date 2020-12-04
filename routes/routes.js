const express = require('express');
const router = express.Router();

// Helpers
const upload = require('../helpers/multer');
const auth = require('../helpers/auth');

// Controllers
const profilesController = require('../controllers/profilesController');
const userController = require('../controllers/userController');
const businessController = require('../controllers/businessesController');
const tricyclesController = require('../controllers/tricyclesController');

/* ===============================================================
												PROFILES ROUTES
================================================================== */
router.get('/profiles/', profilesController.getAllProfiles);
router.get('/profiles/:profileId', profilesController.findProfile);
router.post('/profiles', upload.single('picture'), profilesController.postProfile);
router.put('/profiles/:profileId', upload.single('picture'), profilesController.editProfile);
router.delete('/profiles/:profileId', profilesController.deleteProfile);

/* ===============================================================
												BUSINESS ROUTES
================================================================== */
router.get('/business', businessController.getAllBusinesses);
router.post('/business', upload.single('picture'), businessController.postBusiness);
router.delete('/business/:businessId', businessController.deleteBusiness);

/* ===============================================================
												TRICYCLES ROUTES
================================================================== */
router.get('/tricycle', tricyclesController.getAllTricycles);
router.post('/tricycle', upload.single('picture'), tricyclesController.postTricycles);
router.delete('/tricycle/:tricycleId', tricyclesController.deleteTricycles);

/* ===============================================================
												AUTH ROUTES
================================================================== */
router.post('/signup', auth, userController.signup);
router.post('/signin', userController.signin);

/* ===============================================================
												GENERAL ROUTES
================================================================== */
router.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
router.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error : {
      message : error.message
    }
  });
});

module.exports = router;
