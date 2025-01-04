const { Groq } = require('groq-sdk');

const defaultPrompt = "you are X-AI created by XGunzzzMC"
const groq = new Groq({
  apiKey: "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", 
});

module.exports = async (req, res) => {
  const text = req.query.text;
  const prompt = req.query.prompt || defaultPrompt;

  if (!text) {
    return res.status(400).json({ 
      creator: "XGunzzzMC",
      status: "400",
      response: "Tidak ada 'text' & 'prompt' parameter pesan",
    });
  }
  
  if (!prompt) {
    return res.status(300).json({
      creator: "XGunzzzMC",
      status: "300",
      response: "Tidak ada 'prompt' parameter pesan"
    });
  }

  try {
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      temperature: 0.5,
      max_tokens: 1024,
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: text },
      ],
    });
    const response = completion.choices[0].message.content;
    
    res.status(200).json({
      succes: "true",
      creator: "XGunzzzMC",
      response: response,
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      succes: "false",
      status: "500",
      creator: "XGunzzzMC",
      response: "Server mengalami error"
    });
  }
};
