
const { now } = require('mongoose');
const IdCard = require('./models/IdCards'); 

async function saveToDatabase(data) {

  try {
    const allData = {
        ...data,
        status: 'success',
        timestamp: now()
    };
    const Id = new IdCard(allData);
    const savedInfo = await Id.save();
    console.log('Document saved with ID:', savedInfo._id);
    return { success: true, message: 'Data saved to MongoDB' };
  } catch (err) {
    console.error('Failed to save to MongoDB:', err);
    return { success: false, message: err.code};
  }
}

module.exports = { saveToDatabase };
