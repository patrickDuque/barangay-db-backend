const Business = require('../models/businesses');
const { v4: uuidv4 } = require('uuid');
const s3 = require('../helpers/aws');

exports.getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.status(200).json({ message: 'Successfully fetched businesses', businesses });
  } catch (error) {
    res.status(400).json({ error: { message: 'Error fetching data', error: error.message } });
  }
};

exports.postBusiness = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(500).json({ error: { message: 'Please add a valid image' } });
    }
    const { name, address, nature, existence, owner, requestingPerson } = req.body;
    const picture = req.file.buffer;
    let myFile = req.file.originalname.split('.');
    const fileType = myFile[myFile.length - 1];

    const params = {
      Bucket      : 'barangaybackend',
      Key         : `${uuidv4()}.${fileType}`,
      Body        : picture,
      ContentType : 'image/jpeg'
    };

    s3.upload(params, async (err, data) => {
      if (err) {
        res.status(500).send(err);
      }
      const business = new Business({
        name,
        address,
        nature,
        existence,
        owner,
        requestingPerson,
        picture          : data.Location
      });
      const newBusiness = await business.save();
      res.status(201).json({ message: 'Successfully created new business', business: newBusiness });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { message: 'Error creating new profile', error: error.message } });
  }
};

exports.deleteBusiness = async (req, res) => {
  try {
    const id = req.params.businessId;
    const business = await Business.findById(id);
    s3.deleteObject(
      {
        Bucket : 'barangaybackend',
        Key    : business.picture.split('.com/')[1]
      },
      async (err, data) => {
        if (err) {
          return res.status(500).json({ error: { message: 'Error deleting profile', error: error.message } });
        }
        await Business.findByIdAndDelete(id);
        res.status(201).json({ message: 'Successfully deleted business' });
      }
    );
  } catch (error) {
    res.status(500).json({ error: { message: 'Error deleting profile', error: error.message } });
  }
};

exports.findBusiness = async (req, res) => {
  try {
    const id = req.params.businessId;
    const business = await Business.findById(id);
    res.status(200).json({ message: 'Successfully fetched business', business });
  } catch (error) {
    res.status(500).json({ error: { message: 'Error fetching profile', error: error.message } });
  }
};
