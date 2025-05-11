const ProposeIdea = require('../models/proposeIdea.model');

exports.submitForm = async (req, res) => {
  try {
    const { userId, userName, number, budget, size, details } = req.body;
    const images = req.files.map(file => file.path);

    const formData = new ProposeIdea({
      userId,
      userName,
      number,
      budget,
      size,
      details,
      images,
    });

    await formData.save();
    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
