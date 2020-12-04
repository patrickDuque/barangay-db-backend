const Tricycle = require('../models/tricycle');
const { v4: uuidv4 } = require('uuid');
const s3 = require('../helpers/aws');

exports.getAllTricycles = async (req, res) => {
  try {
    const tricycles = await Tricycle.find();
    res.status(200).json({ message: 'Successfully fetched tricycles', tricycles });
  } catch (error) {
    res.status(400).json({ error: { message: 'Error fetching data', error: error.message } });
  }
};

exports.postTricycles = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(500).json({ error: { message: 'Please add a valid image' } });
    }
    const {
      name,
      address,
      contactNumber,
      brand,
      model,
      plateNumber,
      motorNumber,
      color,
      bodyNumber,
      affiliation
    } = req.body;
    const picture = req.file.buffer;
    let myFile = req.file.originalname.split('.');
    const fileType = myFile[myFile.length - 1];

    const params = {
      Bucket      : 'brgybackend',
      Key         : `${uuidv4()}.${fileType}`,
      Body        : picture,
      ContentType : 'image/jpeg'
    };

    s3.upload(params, async (err, data) => {
      if (err) {
        res.status(500).send(err);
      }
      const tricycle = new Tricycle({
        name,
        address,
        contactNumber,
        brand,
        model,
        plateNumber,
        picture       : data.Location,
        motorNumber,
        color,
        bodyNumber,
        affiliation
      });
      const newTricycle = await tricycle.save();
      res.status(201).json({ message: 'Successfully created new tricycle', tricycle: newTricycle });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { message: 'Error creating new tricycle', error: error.message } });
  }
};

exports.deleteTricycles = async (req, res) => {
  try {
    const id = req.params.tricycleId;
    const tricycle = await Tricycle.findById(id);
    s3.deleteObject(
      {
        Bucket : 'brgybackend',
        Key    : tricycle.picture.split('.com/')[1]
      },
      async (err, data) => {
        if (err) {
          return res.status(500).json({ error: { message: 'Error deleting tricycle', error: error.message } });
        }
        await Tricycle.findByIdAndDelete(id);
        res.status(201).json({ message: 'Successfully deleted tricycle' });
      }
    );
  } catch (error) {
    res.status(500).json({ error: { message: 'Error deleting tricycle', error: error.message } });
  }
};
