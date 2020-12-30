const getVoices = require("./getVoices");

module.exports = async (req, res) => {
  try {
    const voices = await getVoices();
    res.status(200).json(voices);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: JSON.stringify(err, null, 2),
    });
  }
};
