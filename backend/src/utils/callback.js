const axios = require("axios");
const jwt = require("jsonwebtoken");

module.exports = async function sendCallback(url, payload, secret) {
  const token = jwt.sign(payload, secret, { expiresIn: "5m" });

  await axios.post(url, {
    payload,
    signature: token,
  });
};
