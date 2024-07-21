import key from "../config/key.js";

async function getApiKey(req, res) {
  try {
    res.status(200).json({ 
        apiKey: key.apiKey
    });
  } catch (error) {
    res.status(500).json({ message: "Ошибка передачи apiKey" });
  }
}

export default getApiKey;