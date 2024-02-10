const Visits = require('../models/visits');

const visitsCounter = async (req, res) => {
  try {
    let visit = await Visits.findOne(); 

    if (!visit) {
      visit = new Visits(); 
    }

    visit.count++;
    await visit.save();

    res.json(visit.count); // Devolver solo el recuento de visitas
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  visitsCounter,
};