const Profiles = require('../models/profiles');

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profiles.find();
    res.status(200).json({ message: 'Successfully fetched profiles', profiles });
  } catch (error) {
    res.status(400).json({ error: { message: 'Error fetching data', error: error.message } });
  }
};

exports.postProfile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(500).json({ error: { message: 'Please add a valid image' } });
    }
    const { name, address, contactNumber, age, sex, birthday, birthplace, sector, occupation, transfer } = req.body;
    const picture = req.file.filename;
    const profile = new Profiles({
      name,
      address,
      contactNumber,
      birthday,
      sex,
      age,
      picture,
      birthplace,
      sector,
      occupation,
      transfer
    });
    const newProfile = await profile.save();
    res.status(201).json({ message: 'Successfully created new profile', profile: newProfile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { message: 'Error creating new profile', error: error.message } });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const id = req.params.profileId;
    await Profiles.findByIdAndDelete(id);
    res.status(201).json({ message: 'Successfully deleted profile' });
  } catch (error) {
    res.status(500).json({ error: { message: 'Error deleting profile', error: error.message } });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const id = req.params.profileId;
    const { name, address, contactNumber } = req.body;
    if (req.file) {
      await Profiles.findByIdAndUpdate(id, { picture: req.file.filename });
    }
    await Profiles.findByIdAndUpdate(id, { name, address, contactNumber });
    res.status(201).json({ message: 'Successfully updated profile' });
  } catch (error) {
    res.status(500).json({ error: { message: 'Error updating profile', error: error.message } });
  }
};

exports.findProfile = async (req, res) => {
  try {
    const id = req.params.profileId;
    const profile = await Profiles.findById(id);
    res.status(200).json({ message: 'Successfully fetched profile', profile });
  } catch (error) {
    res.status(500).json({ error: { message: 'Error fetching profile', error: error.message } });
  }
};
