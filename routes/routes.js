const express = require('express');
const router = express.Router();

// Helpers
const upload = require('../helpers/multer');
const auth = require('../helpers/auth');

// Controllers
const profilesController = require('../controllers/profilesController');
const userController = require('../controllers/userController');
const businessController = require('../controllers/businessesController');

/* ===============================================================
												PROFILES ROUTES
================================================================== */
router.get('/profiles/', profilesController.getAllProfiles);
router.get('/profiles/:profileId', profilesController.findProfile);
router.post('/profiles', upload.single('picture'), profilesController.postProfile);
router.put('/profiles/:profileId', auth, upload.single('picture'), profilesController.editProfile);
router.delete('/profiles/:profileId', auth, profilesController.deleteProfile);

/* ===============================================================
												BUSINESS ROUTES
================================================================== */
router.get('/business', businessController.getAllBusinesses);
router.post('/business', auth, upload.single('picture'), businessController.postBusiness);
router.delete('/business/:businessId', auth, businessController.deleteBusiness);

/* ===============================================================
												PROFILES ROUTES
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
